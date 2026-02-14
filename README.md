# Python Pantry – Smart Recipe Finder

**TRY IT OUT! [Python Pantry](https://pythonpantry.pythonanywhere.com)**

A personalized recipe discovery app built with **Flask**, **JavaScript**, and the **Edamam Recipe API**, helping users find recipes based on ingredients, dietary needs, allergies, or pure laziness (via the *I'm Hangry* randomizer).  
Users can save recipes, manage favorites, and enjoy a clean, responsive experience across devices.

## Features

### Smart Recipe Search
- Search recipes by entering ingredients you already have.
- Filter by **diet types** (vegan, keto, vegetarian, etc.).
- Filter by **allergies** (gluten-free, dairy-free, peanut-free, etc.).
- Filter by **cuisine** (Italian, Japanese, Mediterranean, etc.).
- Auto-generated ingredient chips and autocomplete behavior.

### “I’m Hangry” Randomizer
- Picks a random cuisine.
- Automatically runs a real search with cleared filters.
- Fully Firefox-compatible after fixing event issues.

### Favorites System
- Users can log in and save recipes.
- Recipes stored in MySQL with downloaded image caching.
- Displays the **3 most recently added favorites** on the home page.
- Duplicate protection prevents saving the same recipe twice.
- Delete favorites from anywhere in the app with auto-refreshing UI.

### Hardcoded Featured Recipes
- Showcased on the home page.

### Dark Mode
- Persistent theme toggle (light/dark).
- Oauth user avatar remains unchanged in dark mode.
- Manual profile icon swaps to dark-friendly chef icon.

### Fully Responsive UI
- Mobile sidebar menu with sliding animation.
- Desktop layout adjusts based on viewport sizes.
- Recipe cards feature image flip animation + hover details.
- Smooth transitions and polished visual design.

## How It Works

### Backend (Flask)
- Handles user authentication (Flask-Login).
- Communicates with the Edamam API for recipe search.
- Normalizes API response for consistent frontend usage.
- Stores favorites in MySQL with a downloaded thumbnail.
- Prevents duplicate favorites using SQL queries.
- Serves cached recipe images via `/recipe_image/<id>` route.

### Frontend (HTML/CSS/JS)
- Event-driven JavaScript controls searching, saving, deleting, filtering.
- Dynamic rendering of recipe cards with flip animations.
- Firefox-specific compatibility fixes.
- Redirects unsafe/broken URLs to Google with an explanation popup.
- Clean, modern UI styled in CSS with responsive layout and transitions.

## Tech Stack

### Frontend
- JavaScript ES6 / Fetch API  
- HTML5  
- CSS3

### Backend
- Python 3.13  
- Flask  
- Flask-Login  
- SQLAlchemy  
- Requests  

### Database
- MySQL  

### External APIs
- Edamam Recipe Search API

## Installation & Setup for Local Instance

### 1. Clone the repository
```bash
git clone <https://github.com/Gabberz320/Python_pantry>
cd Python_pantry
```

### 2. Create a virtual environment
```bash
python3 -m venv venv
source venv/bin/activate
# or Windows:
venv\Scripts\activate
```

### 3. Install dependencies
```bash
pip install -r requirements.txt
```

### 4. Set environment variables  
Create a `.env` file:

```
SECRET_KEY=your-secret-key
EDAMAM_APP_ID=your-app-id
EDAMAM_APP_KEY=your-app-key
MYSQL_USER=...
MYSQL_PASS=...
MYSQL_DB=...
MYSQL_HOST=...
```
**Free Edamam tier is available for testing; visit edamam.com to get your API key**
Secret key can be generated with:
```python
import secrets
secrets.token_hex(32)
```
**You must have a MYSQL database server running, like MySQLWorkbench.**

### 5. Run the app
```bash
python3 app.py
```

Then open:

```
http://127.0.0.1:5000
```

## 🗄️ Database Schema

### `users`
| id | username | email | password_hash | avatar |

### `saved_recipes`
| saved_id | user_id | recipe_id | title | image_path | calories | cook_time | url |

## Recent Fixes & Improvements
- Fixed Firefox `NS_BINDING_ABORTED` issue.
- Randomizer now triggers via `requestSubmit()`, not synthetic submit.
- Unified link mapping to always use `recipe.shareAs`.
- Prevented hardcoded recipes from being saved to DB.
- Improved SQL duplicate checking.

## Future Enhancements
- Add meal planning + shopping list generator.
- Add calorie counter and fitness tracker.
- Instagram style downloads of recipes.

### Demo
https://www.youtube.com/watch?v=TsLiJOUZvXI