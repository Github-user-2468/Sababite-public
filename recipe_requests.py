import requests
import concurrent.futures
import asyncio
import aiohttp
import random
from dotenv import load_dotenv
import os

load_dotenv()

API_KEY = os.getenv("API_KEY")
API_HOST = "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
API_URL = f"https://{API_HOST}"
SEARCH_URL = f"https://{API_HOST}/recipes/complexSearch"
RECIPE_INFO_URL = f"https://{API_HOST}/recipes/{{id}}/information"
JOKE_URL = f"https://{API_HOST}/food/jokes/random"

NUM_RESULTS = random.randint(50, 100)
NUM_SKIP = random.randint(1, 10)

headers = {
    "x-rapidapi-key": API_KEY,
    "x-rapidapi-host": API_HOST
}
# search for the recipe with the given ingredients
# return the list of recipes for future info search
def search_recipes(ingredients, cuisine, diet, allergies):
    
    params = {'number': NUM_RESULTS,
            'includeIngredients': ','.join(ingredients), 
            'cuisine': ','.join(cuisine),
            'diet': diet, 
            'intolerances': allergies,
            'addRecipeInformation': True, 
            'ignorePantry': False,
            'addRecipeInstructions': True,
            'addRecipeNutrition': True,
            'ranking': 2,
            'sort': 'min-missing-ingredients',
            'offset': NUM_SKIP }
  
    try: 
        response = requests.get(SEARCH_URL, headers=headers, params=params)
        response.raise_for_status()
        return response.json().get('results',[])
    except requests.exceptions.RequestException as e:
        print(f'An error occured: {e}')
        return None
    
# Get recipe info with ID for saved recipes    
def get_recipe_info(recipe_id):
    params = {'includeNutrition': 'true'}
    try:

        response = requests.get(RECIPE_INFO_URL.format(id=recipe_id), headers=headers, params=params)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f'Error fetching details for recipe ID {recipe_id}: {e}')
        return None
    
# Display recipes 
def display_recipes(recipes):
    for recipe_summary in recipes[:10]:
            
        recipe_id = recipe_summary.get('id')
        if not recipe_id:
            continue
        # Fetch full recipe details
        full_recipe = get_recipe_info(recipe_id)
        if not full_recipe:
            continue
            
        title = full_recipe.get('title','N/A')
        cook_time = full_recipe.get('readyInMinutes','N/A')
        source_url = full_recipe.get('sourceUrl', 'N/A')
        instructions = full_recipe.get('analyzedInstructions', 'N/A')
        ingredients = full_recipe.get('extendedIngredients', [])  # Now this will be populated
        nutrition = full_recipe.get('nutrition', {})
        # ... rest of your display code
        print(f"Title: {title}")
        print(f"Cook Time: {cook_time} minutes")
        print(f"Source URL: {source_url}")
        print("Nutrition Information:")
        # display only calories
        nutrients = nutrition.get('nutrients', [])
        for nutrient in nutrients:
            if nutrient.get('name') == 'Calories':
                amount = nutrient.get('amount', 'N/A')
                unit = nutrient.get('unit', 'N/A')
                print(f" - Calories: {amount} {unit}")
        
        print("Ingredients:")
        for ingredient in ingredients:
            name = ingredient.get('original', 'N/A')
            print(f" - {name}")
        print("Instructions:")
        if instructions and len(instructions) > 0:
            for step in instructions[0].get('steps', []):
                number = step.get('number', 'N/A')
                step_desc = step.get('step', 'N/A')
                print(f"  Step {number}: {step_desc}")
        print("\n" + "-"*40 + "\n")
                
# Random joke 
def get_random_joke():
    try:
       
        response = requests.get(JOKE_URL, headers=headers)
        response.raise_for_status()
        joke = response.json()
        if len(joke.get('text','N/A')) > 200:
            joke = {'text': 'Why did the tomato turn red? Because it saw the salad dressing!'}

        return joke.get('text','N/A')
    except requests.exceptions.RequestException as e:
        print(f"Error occured while fetching joke {e}")
        return None

# def is_valid_link(url, timeout=1):
#     if not url:
#         return False
#     try:
#         response = requests.head(url, timeout=timeout, allow_redirects=True)
#         if response.status_code < 400:
#             return True
#         else:
#             return False
#     except requests.exceptions.RequestException as e:
#         return False

# def filter_valid_links(recipes):
#     valid_recipes = []
    
#     with concurrent.futures.ThreadPoolExecutor(max_workers=35) as executor:
#         future_to_recipe = {executor.submit(is_valid_link, r.get("sourceUrl")): r for r in recipes}

#         for future in future_to_recipe:
#             recipe = future_to_recipe[future]
#             try:
#                 if future.result():
#                     valid_recipes.append(recipe)
#             except Exception:
#                 pass
    
#     return valid_recipes

async def is_valid_link(session, url, timeout=1):
    if not url:
        return False
    try:
        # Use aiohttp's timeout object
        client_timeout = aiohttp.ClientTimeout(total=timeout)
        async with session.head(url, timeout=client_timeout, allow_redirects=True) as response:
             if response.status < 400:
                 return True
             else: 
                 return False
    # This line is for catching any network errors connecting to a link
    except (aiohttp.ClientError, asyncio.TimeoutError):
        return False
    

async def filter_links(recipes):
    valid_recipes = []
    async with aiohttp.ClientSession() as session:
        # Create a list of tasks, checking the links of each recipe returned from the API
        tasks = []
        for recipe in recipes:
            task = asyncio.create_task(is_valid_link(session, recipe.get("sourceUrl")))
            tasks.append((task, recipe))
        
        # Waits for all the tasks to complete
        for task, recipe in tasks:
            is_valid = await task
            if is_valid:
                valid_recipes.append(recipe)
    
    return valid_recipes
    

def main():
    
    ingredients_str = input('Enter ingredients separated by commas: ').strip()
    ingredients = [ n.strip() for n in ingredients_str.split(',')] if ingredients_str else []
    cuisine_str = input('Enter the cuisine you\'re craving: ').strip()
    cuisine = [n.strip() for n in cuisine_str.split(',')] if cuisine_str else []
    diet = input('Enter dietary preferences: ').strip()
    allergies = input('Allergies? Enter them here separated by a comma: ')

    recipes_found = search_recipes(ingredients,cuisine, diet, allergies)
    

    if not recipes_found:
        print('Sorry none found')
        return
    else:

       #Display recipe information
       joke = get_random_joke()
       print(joke, '\n \n')
       
       print("Checking valid recipe links...")
       valid_recipes = asyncio.run(filter_links(recipes_found))
       
       if not valid_recipes:
           print("No results with valid recipes found...")
       
       display_recipes(valid_recipes)

        
            

main()