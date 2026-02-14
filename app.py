from flask import Flask, render_template, redirect, request, url_for, session, flash, jsonify, Response
from flask_login import LoginManager, login_user, logout_user, current_user, login_required
from flask_bcrypt import Bcrypt
from database.connection import init_connection_engine, db
from database.models import ManualUser, Oauth_User, SavedRecipe
from sqlalchemy import select
from datetime import datetime, date, timedelta, timezone
import os
import requests
import random
import pathlib
import aiohttp
import asyncio
from dotenv import load_dotenv
from google_auth_oauthlib.flow import Flow
from google.oauth2 import id_token
import google.auth.transport.requests
import uuid
from mailer import send_reset_email
import csv
from rapidfuzz import process, fuzz
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_limiter.errors import RateLimitExceeded
import re
from functools import wraps
from database.models import ApiToken


# ---------------- APP SETUP ----------------
app = Flask(__name__)
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {'pool_recycle': 280}

limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=[],
    storage_uri="memory://"
)

load_dotenv()  # Load environment variables

app.secret_key = os.getenv("SECRET_KEY") or "supersecretkey"
init_connection_engine(app)


# ---------------- GOOGLE OAUTH SETUP ----------------
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
client_secrets_file = os.path.join(pathlib.Path(__file__).parent, "client_secret.json")
os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"

# ---------------- Flask Login Setup ----------------
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "userlogin"

@login_manager.user_loader
def load_user(user_id_str):
    # Handles both manual and oauth using flask_login
    try:
        user_type, user_id = user_id_str.split('_')
        user_id = int(user_id)
    except (ValueError, AttributeError):
        return None
    
    if user_type == "manual":
        return db.session.get(ManualUser, user_id)
    elif user_type == "oauth":
        return db.session.get(Oauth_User, user_id)
    
    return None

@app.errorhandler(RateLimitExceeded)
def ratelimit_handler(error):
    if request.accept_mimetypes.accept_json and not request.accept_mimetypes.accept_html:
        return jsonify(error="ratelimit exceeded", description=str(error.description)), 429
    
    # flash("Too many requests. Please wait a moment and try again.", "danger")
    
    template = "index"
    if request.endpoint == "userlogin":
        template = "userlogin"
    elif request.endpoint == "register":
        template = "register"
    elif request.endpoint == "reset_password":
        template = "reset_password"
    
    return redirect(url_for(template))

# ---------------- Bcrypt Password Hashing ----------------
bcrypt = Bcrypt()
bcrypt.init_app(app)

# ---------------- HOME PAGE ----------------
@app.route("/")
def index():
    return render_template("index.html")

# ---------------- GOOGLE LOGIN ----------------
@app.route("/google_login")
def google_login():
    flow = Flow.from_client_secrets_file(
        client_secrets_file,
        scopes=[
            "openid",
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
        ],
        redirect_uri=url_for("google_callback", _external=True),
    )
    auth_url, state = flow.authorization_url(prompt="consent")
    session["state"] = state
    return redirect(auth_url)

# ---------------- GOOGLE CALLBACK ----------------
@app.route("/login/callback")
def google_callback():
    if session.get("state") != request.args.get("state"):
        return "Invalid state parameter", 400

    flow = Flow.from_client_secrets_file(
        client_secrets_file,
        scopes=[
            "openid",
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
        ],
        redirect_uri=url_for("google_callback", _external=True),
    )

    flow.fetch_token(authorization_response=request.url)
    credentials = flow.credentials

    request_session = google.auth.transport.requests.Request()
    user_info = id_token.verify_oauth2_token(
        credentials.id_token,
        request_session,
        GOOGLE_CLIENT_ID,
    )
    
    oauth_id = user_info.get("sub")
    
    user = db.session.execute(select(Oauth_User).where(Oauth_User.oauth_id == oauth_id)).scalar()
    
    if user:
        user.name = user_info.get("name")
        user.picture_url = user_info.get("picture")
    else:
        user = Oauth_User(
            oauth_id=oauth_id,
            name=user_info.get("name"),
            email=user_info.get("email"),
            picture_url=user_info.get("picture")
        )
        db.session.add(user)
        db.session.commit()


    login_user(user)

    # flash("Welcome my potato!", "success")
    return redirect(url_for("index"))

# ---------------- LOGOUT ----------------
@app.route("/logout")
def logout():
    logout_user()
    # flash("I love potatoes", "success")
    return redirect(url_for("index"))

# ---------------- CHECK LOGIN STATUS (ADD THIS HERE) ----------------
@app.route("/check_login")
def check_login():
    """API endpoint to check if user is logged in"""
    if "user" in session:
        return jsonify({
            "logged_in": True,
            "user": session["user"]
        })
    else:
        return jsonify({
            "logged_in": False,
            "user": None
        })

# ---------------- RESET PASSWORD ----------------
#generate the token and send the email
@app.route("/reset_password", methods=["GET", "POST"])
@limiter.limit("5 per minute")
def reset_password():
    if request.method == "POST":
        email = request.form["email"]
        user = db.session.execute(select(ManualUser).where(ManualUser.email == email)).scalar()
        if user:
            token = str(uuid.uuid4())
            user.reset_token = token
            user.reset_token_expires = datetime.now(timezone.utc) + timedelta(hours=1)
            db.session.commit()
            
            # Enhanced email sending with better error handling
            try:
                email_sent = send_reset_email(user.email, token)
                if email_sent:
                    flash("Password reset email sent! Check your inbox.", "success")
                    app.logger.info(f"Reset email sent to {user.email}")
                else:
                    flash("Failed to send reset email. Please try again later.", "error")
                    app.logger.error(f"Failed to send reset email to {user.email}")
            except Exception as e:
                flash("Error sending reset email. Please contact support.", "error")
                app.logger.error(f"Exception in send_reset_email: {e}")
        else:
            # Don't reveal whether email exists for security
            flash("If that email exists in our system, a reset link has been sent.", "info")
            
    return render_template("reset_password.html")

# ---------------- RESET WITH TOKEN ----------------
@app.route('/reset/<token>', methods=["GET", "POST"])
def reset_with_token(token):
    user = db.session.execute(select(ManualUser).where(ManualUser.reset_token == token)).scalar()
    if not user:
        flash("Invalid or expired token")
        return redirect(url_for("reset_password"))
    current_time = datetime.now(timezone.utc)
    if user.reset_token_expires is None or user.reset_token_expires.replace(tzinfo=timezone.utc) < current_time:
        flash("This reset link has expired. Please request a new one.", "error")
        user.reset_token = None
        user.reset_token_expires = None
        db.session.commit()
        return redirect(url_for('reset_password'))
        
    if request.method == "POST":
        new_password = request.form["password"]
        hashed_password = bcrypt.generate_password_hash(new_password).decode("utf-8")
        user.password = hashed_password
        user.reset_token = None
        db.session.commit()
        flash("Password has been reset", "success")
        return redirect(url_for("userlogin"))

    return render_template("reset_with_token.html", token=token) # subject to change based on frontend

# ---------------- MANUAL LOGIN ----------------
@app.route("/userlogin", methods=["GET", "POST"])
@limiter.limit("10 per minute", methods=["POST"])
def userlogin():
    # Get the login info from the user
    if request.method == "POST":
        email = request.form["email"]
        password = request.form["password"]
        
        # If username or password not entered, redirect
        if not email or not password:
            flash("You must enter both username and password", "danger")
            return redirect(url_for("userlogin"))
        
        # Retrieve the user from the database
        user = db.session.execute(select(ManualUser).where(ManualUser.email == email)).scalar()
        
        # Check for correct username and password, login user if both correct
        if user and bcrypt.check_password_hash(user.password, password):
            login_user(user)
            flash(f"Welcome back, {email}", "success")
            return redirect(url_for("index"))
        else:
            flash("Incorrect username or password. Please try again.", "danger")
            return redirect(url_for("userlogin"))

    return render_template("login.html")

def check_password(password):
    reg = r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#%()])[A-Za-z\d@$#%()]{6,20}$"
    
    pattern = re.compile(reg)
    
    is_valid = re.search(pattern, password)
    
    if is_valid:
        return True
    else:
        return False

# ---------------- REGISTER ----------------
@app.route("/register", methods=["GET", "POST"])
@limiter.limit("10 per hour")
def register():
    # Get username and password
    if request.method == "POST":
        email = request.form["email"]
        name = request.form["name"]
        password = request.form["password"]
        
        # if not check_password(password):
        #     flash("""Password must contain one uppercase letter, one lowercase
        #           letter, one special character ($, @, #, %) and between 6 and 20 characters""", "error")
        #     return redirect(url_for("register"))
        
        # Find whether a user with that username already exists
        if db.session.execute(select(ManualUser).where(ManualUser.email == email)).scalar():
            flash("That email is already registered", "error")
            return redirect(url_for("register"))
        
        # Hash password with bcrypt
        hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")
        
        # Create a user with that entry
        user = ManualUser(
            email=email,
            name=name,
            password=hashed_password
        )
        
        # Commit it to the database
        db.session.add(user)
        db.session.commit()
        
        # Login with login_user function and redirect to index page
        login_user(user)

        flash("User has been registered", "success")
        return redirect(url_for("index"))

    return render_template("register.html")

# Edamam API setup
EDAMAM_APP_ID = os.getenv("EDAMAM_APP_ID")
EDAMAM_APP_KEY = os.getenv("EDAMAM_APP_KEY")

EDAMAM_BY_URI_URL = "https://api.edamam.com/api/recipes/v2/by-uri"
EDAMAM_API_URL = "https://api.edamam.com/api/recipes/v2"

# async to filter out bad links
async def is_valid_link(session, url, timeout=1):
    if not url:
        return False
    try:
        # Use aiohttp's timeout object
        client_timeout = aiohttp.ClientTimeout(total=timeout)
        async with session.get(url, timeout=client_timeout, allow_redirects=True, headers={"Range": "bytes=0-0"}) as response:
             if response.status < 400:
                 return True
             else: 
                 return False
    # This line is for catching any network errors connecting to a link
    except (aiohttp.ClientError, asyncio.TimeoutError):
        return False
    

async def filter_links(hits):
    valid_recipes = []
    async with aiohttp.ClientSession() as session:
        # Create a list of tasks, checking the links of each recipe returned from the API
        tasks = []
        for hit in hits:
            recipe_data = hit.get("recipe", {})
            source_url = recipe_data.get("url")
            task = asyncio.create_task(is_valid_link(session, source_url))
            tasks.append((task, recipe_data))
        
        # Waits for all the tasks to complete
        for task, recipe in tasks:
            is_valid = await task
            if is_valid:
                valid_recipes.append(recipe)
    
    return valid_recipes


#---------autocomplete---------
INGREDIENTS = []
csv_path = os.path.join(os.path.dirname(__file__), "ingredients-with-possible-units.csv")

try:
    with open(csv_path, newline='', encoding="utf-8") as f:
        reader = csv.reader(f)
        for row in reader:
            if not row:
                continue
            raw_name = row[0].strip().lower()
            name = re.split(r"[;,:]", raw_name)[0].strip()
            units = ", ".join([cell.strip() for cell in row[1:] if cell.strip()])
            if name:
                INGREDIENTS.append({"name": name, "unit": units})
    print(f"Loaded {len(INGREDIENTS)} ingredients from CSV.")
except Exception as e:
    print("Error loading ingredients CSV:", e)

@app.route("/autocomplete")
def autocomplete():
    query = request.args.get("query", "").strip().lower()
    if not query:
        return {"error": "Missing query parameter"}, 400

    names = [item["name"] for item in INGREDIENTS]

    results = process.extract(query, names, limit=5, scorer=fuzz.WRatio)

    matches = []
    for name, score, _ in results:
        for item in INGREDIENTS:
            if item["name"] == name:
                matches.append({
                    "name": item["name"],
                    "unit": item["unit"]
                })
                break

    return matches


# -------API Search------------------

@app.route("/search_recipes")
def search_recipes():
    ingredients = request.args.get("ingredients", "")
    # cuisine = request.args.get("cuisine", "")
    # diet = request.args.get("diet", "")
    # allergies = request.args.get("allergies", "")
    cuisine = request.args.get("cuisine", "")

    # MULTI DIET + MULTI ALLERGY SUPPORT
    diets = [d for d in request.args.getlist("diet") if d.strip()]
    allergies = [a for a in request.args.getlist("allergy") if a.strip()]


    # Fail fast if API key missing
    if not EDAMAM_APP_ID or not EDAMAM_APP_KEY:
        return {"error": "Server misconfiguration: API_KEY is not set."}, 500

   # Params for Edamam
    params = {
        'type': 'public',
        'q': ingredients,
        'app_id': EDAMAM_APP_ID,
        'app_key': EDAMAM_APP_KEY,
        }
    # if diet:
    #     params['diet'] = diet
    # if allergies:
    #     params['health'] = allergies

    # MULTI DIET SUPPORT
    if diets:
        params['diet'] = diets   # Edamam accepts repeated diet params

    # MULTI ALLERGY / HEALTH SUPPORT
    if allergies:
        params['health'] = allergies

    if cuisine:
        params['cuisineType'] = cuisine

    try:
        response = requests.get(EDAMAM_API_URL, params={k: v for k, v in params.items() if v})
        response.raise_for_status()
        initial_hits = response.json().get("hits", [])

        # Uses aiohttp to filter out the API results with bad links, ensures users always get ones that are working
        
        # valid_recipes = asyncio.run(filter_links(initial_hits))
        # random.shuffle(valid_recipes)

#COMMENTED OUT THE ABOVE TWO LINES AND REPLACED WITH THE BELOW LINES TO WORK ON PYTHONANYWHERE
        valid_recipes = []
        for hit in initial_hits:
            recipe = hit.get("recipe", {})
            if recipe.get("url", "").startswith("http"):
                valid_recipes.append(recipe)

        random.shuffle(valid_recipes)

#END COMMENT
        unique_recipes = []
        seen_uris = set()
        for recipe in valid_recipes:
            uri = recipe.get("uri")
            if uri not in seen_uris:
                seen_uris.add(uri)
                unique_recipes.append(recipe)

        return unique_recipes
        #return valid_recipes
    except requests.exceptions.Timeout:
        # Upstream timed out
        app.logger.warning("Timeout when calling Edamam API for search_recipes")
        return {"error": "Upstream API request timed out."}, 504
    except requests.exceptions.HTTPError as e:
        # Return the upstream status code & message as a 502-level error
        status = getattr(e.response, 'status_code', 502)
        app.logger.warning(f"HTTP error from Edamam: {status} - {e}")
        return {"error": f"Too many API calls. Please wait 60 seconds before searching again."}, 502
    except requests.exceptions.RequestException as e:
        app.logger.warning(f"Error calling Spoonacular: {e}")
        return {"error": str(e)}, 502
    

    
# ---------------- Saved Recipes ----------------
@app.route("/saved_recipes", methods=["GET"])
@login_required
def saved_recipe():
    saved_recipes = current_user.saved_recipes
    
    recipe_data = []
    for recipe in saved_recipes:
        recipe_data.append({
            "saved_id": recipe.saved_id, # Add the saved_id
            "id": recipe.recipe_id,
            "title": recipe.title,
            "image": recipe.image,
            "link": recipe.link,
            "calories": recipe.calories,
            "servings": recipe.servings,
            "cook_time": recipe.cook_time,
            "summary": recipe.summary,
            "date_saved": recipe.date_saved.isoformat()
        })
        
    return jsonify(recipe_data)

@app.route("/save_recipe", methods=["POST"])
@login_required
def save_recipe():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Saved recipe not found"}), 400
    
    recipe_id = data.get("id")
    if not recipe_id:
        return jsonify({"error": "Recipe id not found"}), 400
    

    query = select(SavedRecipe).where(SavedRecipe.recipe_id == recipe_id)
    if isinstance(current_user, ManualUser):
        query = query.where(SavedRecipe.manual_id == current_user.manual_id)
    elif isinstance(current_user, Oauth_User):
        query = query.where(SavedRecipe.user_id == current_user.user_id)
    
    
    is_saved = db.session.execute(query).scalar_one_or_none() is not None
    # is_saved = db.session.execute(query).first() is not None
    
    if is_saved:
        return jsonify({"error": "Recipe is already saved."}), 409
    
    image_url = data.get("image")
    image_blob = None
    image_mime = None
    if image_url:
        try:
            response = requests.get(image_url, timeout=5)
            response.raise_for_status() 
            image_blob = response.content
            image_mime = response.headers.get("Content-Type")
        except requests.exceptions.RequestException as e:
            app.logger.warning(f"Could not download image from {image_url}: {e}")

    new_recipe = SavedRecipe(
        recipe_id = recipe_id,
        title = data.get("title"),
        image=image_url, 
        link = data.get("link"),
        calories = data.get("calories"),
        servings = data.get("servings"),
        cook_time = data.get("cook_time"),
        summary = data.get("summary"),
        image_blob=image_blob,
        image_mime=image_mime
    )
    
    current_user.saved_recipes.append(new_recipe)
    
    try:
        db.session.commit()
        return jsonify({"message": "Recipe saved successfully"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "database error"}), 500

@app.route("/delete_saved_recipe", methods=["POST"])
@login_required
def delete_saved_recipe():
    data = request.get_json()
    recipe_id = data.get("id")
    
    if not recipe_id:
        return jsonify({"error": "Missing recipe ID"}), 400

    query = select(SavedRecipe).where(SavedRecipe.recipe_id == str(recipe_id))
    if isinstance(current_user, ManualUser):
        query = query.where(SavedRecipe.manual_id == current_user.manual_id)
    elif isinstance(current_user, Oauth_User):
        query = query.where(SavedRecipe.user_id == current_user.user_id)
    
    recipe_to_delete = db.session.execute(query).scalar_one_or_none()

    if recipe_to_delete:
        try:
            db.session.delete(recipe_to_delete)
            db.session.commit()
            return jsonify({"message": "Recipe removed successfully"}), 200
        except Exception as e:
            db.session.rollback()
            app.logger.error(f"Error deleting recipe: {e}")
            return jsonify({"error": "Database error while deleting recipe"}), 500
    else:
        return jsonify({"error": "Recipe not found or you don't have permission to delete it"}), 404


@app.route("/recipe_image/<int:saved_id>")
@login_required
def recipe_image(saved_id):
    # Find the recipe ensuring it belongs to the current user
    recipe = next((r for r in current_user.saved_recipes if r.saved_id == saved_id), None)

    if not recipe:
        return "Not Found", 404

    if recipe.image_blob and recipe.image_mime:
        return Response(recipe.image_blob, mimetype=recipe.image_mime)
    
    if recipe.image:
        return redirect(recipe.image)

    return "Image not found", 404

@app.route("/random_joke")
def random_joke():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    jokes_path = os.path.join(base_dir, "food_jokes.txt")

    try:
        with open(jokes_path, "r", encoding="utf-8") as f:
            jokes = [line.strip() for line in f if line.strip()]
        return random.choice(jokes)
    except Exception as e:
        print("Error loading jokes:", e)
        return "No food jokes available at the moment"


if __name__ == "__main__":
    app.run(debug=True, use_reloader=False)

    # ------- API FOR FLUTTER -------
def api_auth_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        auth = request.headers.get("Authorization", "")
        if not auth.startswith("Bearer "):
            return jsonify({"error": "missing bearer token"}), 401

        token_value = auth.split(" ", 1)[1].strip()

        tok = db.session.execute(
            select(ApiToken).where(ApiToken.token == token_value)
        ).scalar_one_or_none()

        if not tok:
            return jsonify({"error": "invalid token"}), 401

        now = datetime.now(timezone.utc)
        exp = tok.expires_at
        if exp.tzinfo is None:
            exp = exp.replace(tzinfo=timezone.utc)

        if exp < now:
            return jsonify({"error": "token expired"}), 401

        user = None
        if tok.manual_id:
            user = db.session.get(ManualUser, tok.manual_id)
        elif tok.user_id:
            user = db.session.get(Oauth_User, tok.user_id)

        if not user:
            return jsonify({"error": "user not found"}), 401

        request.api_user = user
        return fn(*args, **kwargs)
    return wrapper


@app.post("/api/login")
@limiter.limit("10 per minute")
def api_login():
    data = request.get_json(force=True) or {}
    email = (data.get("email") or "").strip().lower()
    password = data.get("password") or ""

    if not email or not password:
        return jsonify({"error": "email and password required"}), 400

    user = db.session.execute(
        select(ManualUser).where(ManualUser.email == email)
    ).scalar_one_or_none()

    if not user or not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "invalid credentials"}), 401

    tok = ApiToken.mint_for_manual(user.manual_id, days=30)
    db.session.add(tok)
    db.session.commit()

    return jsonify({
        "token": tok.token,
        "expires_at": tok.expires_at.isoformat(),
        "user": {
            "type": "manual",
            "id": user.manual_id,
            "email": user.email,
            "name": user.name
        }
    }), 200

@app.post("/api/register")
@limiter.limit("10 per hour")
def api_register():
    data = request.get_json(force=True) or {}
    email = (data.get("email") or "").strip().lower()
    name = (data.get("name") or "").strip()
    password = data.get("password") or ""

    if not email or not name or not password:
        return jsonify({"error": "email, name, password required"}), 400

    existing = db.session.execute(
        select(ManualUser).where(ManualUser.email == email)
    ).scalar_one_or_none()
    if existing:
        return jsonify({"error": "email already exists"}), 409

    hashed = bcrypt.generate_password_hash(password).decode("utf-8")
    user = ManualUser(email=email, name=name, password=hashed)
    db.session.add(user)
    db.session.commit()

    tok = ApiToken.mint_for_manual(user.manual_id, days=30)
    db.session.add(tok)
    db.session.commit()

    return jsonify({
        "token": tok.token,
        "expires_at": tok.expires_at.isoformat(),
        "user": {
            "type": "manual",
            "id": user.manual_id,
            "email": user.email,
            "name": user.name
        }
    }), 201


@app.get("/api/saved_recipes")
@api_auth_required
def api_saved_recipes():
    user = request.api_user
    return jsonify([{
        "saved_id": r.saved_id,
        "id": r.recipe_id,
        "title": r.title,
        "image": r.image,
        "link": r.link,
        "calories": r.calories,
        "servings": r.servings,
        "cook_time": r.cook_time,
        "summary": r.summary,
        "date_saved": r.date_saved.isoformat() if r.date_saved else None
    } for r in user.saved_recipes])

@app.post("/api/save_recipe")
@api_auth_required
def api_save_recipe():
    user = request.api_user
    data = request.get_json(force=True) or {}

    recipe_id = data.get("id")
    if not recipe_id:
        return jsonify({"error": "Recipe id not found"}), 400

    query = select(SavedRecipe).where(SavedRecipe.recipe_id == recipe_id)
    if isinstance(user, ManualUser):
        query = query.where(SavedRecipe.manual_id == user.manual_id)
    else:
        query = query.where(SavedRecipe.user_id == user.user_id)

    if db.session.execute(query).scalar_one_or_none():
        return jsonify({"error": "Recipe already saved"}), 409

    new_recipe = SavedRecipe(
        recipe_id=recipe_id,
        title=data.get("title"),
        image=data.get("image"),
        link=data.get("link"),
        calories=data.get("calories"),
        servings=data.get("servings"),
        cook_time=data.get("cook_time"),
        summary=data.get("summary"),
    )

    user.saved_recipes.append(new_recipe)
    db.session.commit()
    return jsonify({"message": "saved"}), 201

@app.post("/api/delete_saved_recipe")
@api_auth_required
def api_delete_saved_recipe():
    user = request.api_user
    data = request.get_json(force=True) or {}
    recipe_id = data.get("id")

    if not recipe_id:
        return jsonify({"error": "Missing recipe ID"}), 400

    query = select(SavedRecipe).where(SavedRecipe.recipe_id == str(recipe_id))
    if isinstance(user, ManualUser):
        query = query.where(SavedRecipe.manual_id == user.manual_id)
    else:
        query = query.where(SavedRecipe.user_id == user.user_id)

    recipe = db.session.execute(query).scalar_one_or_none()
    if not recipe:
        return jsonify({"error": "not found"}), 404

    db.session.delete(recipe)
    db.session.commit()
    return jsonify({"message": "deleted"}), 200

from google.oauth2 import id_token
import google.auth.transport.requests
from sqlalchemy import select

@app.post("/api/google_login")
@limiter.limit("10 per minute")
def api_google_login():
    data = request.get_json(force=True) or {}
    idtok = data.get("id_token")

    if not idtok:
        return jsonify({"error": "id_token required"}), 400

    try:
        req = google.auth.transport.requests.Request()
        info = id_token.verify_oauth2_token(idtok, req, GOOGLE_CLIENT_ID)

        oauth_id = info.get("sub")
        email = (info.get("email") or "").strip().lower()
        name = info.get("name") or ""
        picture = info.get("picture") or ""

        if not oauth_id:
            return jsonify({"error": "invalid google token"}), 401

        # Find or create user
        user = db.session.execute(
            select(Oauth_User).where(Oauth_User.oauth_id == oauth_id)
        ).scalar_one_or_none()

        if user:
            user.email = email or user.email
            user.name = name or user.name
            user.picture_url = picture or user.picture_url
        else:
            user = Oauth_User(
                oauth_id=oauth_id,
                email=email,
                name=name,
                picture_url=picture
            )
            db.session.add(user)

        db.session.commit()

        # Mint API token using your existing model method
        tok = ApiToken.mint_for_oauth(user.user_id, days=30)
        db.session.add(tok)
        db.session.commit()

        return jsonify({
            "token": tok.token,
            "expires_at": tok.expires_at.isoformat(),
            "user": {
                "type": "oauth",
                "id": user.user_id,
                "email": user.email,
                "name": user.name,
                "picture_url": user.picture_url
            }
        }), 200

    except ValueError as e:
        # invalid/expired/wrong audience token
        return jsonify({"error": "invalid google token", "detail": str(e)}), 401
    except Exception as e:
        app.logger.exception("api_google_login failed")
        return jsonify({"error": "server error"}), 500
