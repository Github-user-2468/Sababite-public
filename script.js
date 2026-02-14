// site redirect for bad sites in list, can be added to as needed
REDIRECT_SITES = [
    "recipezaar.com"
];
    // Mock recipe data
        const mockRecipes = [
            {
                id: 1,
                title: "Meaty Vegan BBQ Ribs",
                cook_time: "50 min",
                image: "https://www.myplantifulcooking.com/wp-content/uploads/2021/10/vegan-bbq-ribs-chopping-board.jpg",
                link: "https://www.myplantifulcooking.com/vegan-seitan-ribs/",
                ingredients: ["BBQ sauce", "vital wheat gluten", "liquid smoke", "tahini", "soy sauce", "nutritional yeast", "spices"],
                summary: "Packed with flavor and has a succulent, meaty texture. Easy to prepare, these seitan ribs are also packed with protein and incredibly satisfying.",
                calories: 1560,
                servings: 6,    
                favoriteOf: "Heather",
                isHardcoded: true
            },
            {
                id: 2,
                title: "Copycat Panera Broccoli Cheddar Soup",
                cook_time: "45 min",
                image: "https://www.allrecipes.com/thmb/d21PJ-fW1EAyM_HYklhGy3XFx5U=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/AR-235874-copycat-panera-broccoli-cheddar-soup-ddmfs-beauty-4x3-f787b66d927d44f18633a4499559611c.jpg",
                link: "https://www.allrecipes.com/recipe/235874/copycat-panera-broccoli-cheddar-soup/",
                ingredients: ["butter", "onion", "flour", "milk", "chicken stock", "broccoli", "cheddar cheese", "cellery", "carrots"],
                summary: "Enjoy classic flavors of fresh broccoli, carrots, and celery in this homemade soup.",
                calories: 3528,
                servings: 8,
                favoriteOf: "Gabby",
                isHardcoded: true
            },
            {
                id: 3,
                title: "Chicken Paprikash",
                cook_time: "55 min",
                image: "https://www.allrecipes.com/thmb/zd1u3MFZdIjSygE03lQe2BXNokg=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/AR-140555-chicken-paprikash-4x3-11785588966a4fb798c3ecb7e2e67134.jpg",
                link: "https://www.allrecipes.com/recipe/140555/chicken-paprikash/",
                ingredients: ["chicken", "onion", "paprika", "sour cream", "butter", "flour", "eggs"],
                summary: "This authentic chicken paprikash recipe features a rich paprika-sour cream sauce and tender chicken.",
                calories: 3844,
                servings: 4,
                favoriteOf: "Gabby",        
                isHardcoded: true
            },
            {
                id: 4,
                title: "Instant Pot Vegetarian Southern Greens",
                cook_time: "45 min",
                image: "https://meikoandthedish.com/wp-content/uploads/2021/11/vegetarian-greens-2.jpg",
                link: "https://meikoandthedish.com/vegetarian-southern-greens",
                ingredients: ["collard greens", "mustard greens", "onion", "picante salsa", " apple cider vinegar", "vegetable stock"],
                summary: "A combination of collard greens, mustard greens, and turnip greens for that classic Southern flavor without any of the meat. You’ll love this dish whether you’re a vegetarian or not!",
                calories: 1036,
                servings: 10,
                favoriteOf: "Heather",
                isHardcoded: true
            },
            {
                id: 5,
                title: "Wendy’s Chili Recipe",
                cook_time: "90 min",
                image: "https://copykat.com/wp-content/uploads/2023/05/Wendys-Chili-Pin-22.jpg",
                link: "https://copykat.com/wendys-chili-2/",
                ingredients: ["ground beef", "tomato puree", "red kidney beans", "pinto beans", "onion", "celery", "chili powder", "green bell pepper", "chili powder", "garlic powder", "sugar"],
                summary: "Who doesn’t love the iconic Wendy’s Chili? You can recreate this copycat Wendy’s chili at home, like the restaurant.",
                calories: 2570,
                servings: 10,
                favoriteOf: "Karigan",
                isHardcoded: true
            },
            {
                id: 6,
                title: "Cracker Barrel Grilled Chicken Tenders",
                cook_time: "15 min",
                image: "https://insanelygoodrecipes.com/wp-content/uploads/2021/08/Tender-and-Juicy-Cracker-Barrel-Chicken-Tenders.jpg",
                link: "https://insanelygoodrecipes.com/cracker-barrel-chicken-tenders/",
                ingredients: ["chicken tenders", "Italian dressing", "lime juice", "honey"],
                summary: "Looking for a fool-proof way to add nutrition to your family’s diet? These Cracker Barrel chicken tenders are all you need.",
                calories: 892,
                servings: 2,
                favoriteOf: "Karigan",
                isHardcoded: true
            },
                                    {
                id: 9,
                title: "Spaghetti & Meatballs",
                cook_time: "20 min",
                image: "https://hips.hearstapps.com/hmg-prod/images/spaghetti-and-meatballs-lead-66bcb984da2f8.jpg",
                link: "https://www.delish.com/cooking/recipe-ideas/a55764/best-spaghetti-and-meatballs-recipe/",
                ingredients: ["spaghetti", "ground beef", "bread crumbs", "Parmesan cheese", "egg", "garlic", "onion", "canned tomatoes"],
                summary: "In the world of pasta dinners, spaghetti and meatballs can be overlooked for more exciting options. I'm here to tell you that this classic Italian pasta deserves a spot back on your weeknight dinner rotation.",
                calories: 3752,
                servings: 4,
                favoriteOf: "Garrett",
                isHardcoded: true   
            },
                        {
                id: 10,
                title: "Philly Cheese Steak",
                cook_time: "150 min",
                image: "https://assets.epicurious.com/photos/57d0394f7d2e71cf344f18a8/1:1/w_1280,c_limit/philly-cheese-steak.jpg",
                link: "https://www.epicurious.com/recipes/food/views/philly-cheese-steak-230291",
                ingredients: ["beef tenderloin", "onion", "mozzarella cheese", "bell pepper", "olive oil", "salt", "black pepper", "Italian rolls"],
                summary: "Wish you were here in Philadelphia, eating a cheese steak. No doubt about it, cheese steak is the quintessential Philly food.",
                calories: 3180,
                servings: 6,
                favoriteOf: "Garrett",
                isHardcoded: true   
            }
        ];

        // User favorites (loaded from db) 
        let userFavorites = [];

        // Boolean for potato mode
        let isPotatoMode = false;
        // Hard coded potato ingredient
        const POTATO_INGREDIENT = 'potato'; 

        // Currently displayed recipes (either API results or mock)
        let displayedRecipes = [...mockRecipes];

        // Check if user is logged in
        function isUserLoggedIn() {
            // Check if there's a user profile element visible
            const userProfile = document.querySelector('.user-profile');
            return userProfile !== null;
        }

        // Load favorites from database
        async function loadUserFavorites() {
            if (!isUserLoggedIn()) {
                userFavorites = [];
                return;
            }

            try {
                    const response = await fetch('/saved_recipes');
                    
                    if (response.ok) {
                        userFavorites = await response.json();
                        console.log(`Loaded ${userFavorites.length} favorites from server`);
                    } else if (response.status === 401) {
                        // Session expired
                        console.warn('Session expired, redirecting to login');
                        window.location.href = '/userlogin';
                    } else {
                        console.error('Failed to load favorites:', response.status);
                        userFavorites = [];
                    }
                } catch (error) {
                    console.error('Error loading favorites:', error);
                    userFavorites = [];
                }

            }
        // Initialize the page  load user favorites from the server first 
        document.addEventListener('DOMContentLoaded', async function(){
            // Ensure we pull saved recipes for the currently logged-in user
            try {
                await loadUserFavorites();
            } catch (err) {
                console.error('Failed to load user favorites on init:', err);
            }

            displayHomeFavorites();
            displayFavorites();
            attachEventListeners();
            loadDailyJoke();
            attachJokeListeners();
    const shuffled = [...mockRecipes].sort(() => Math.random() - 0.5);
    resetLoadMore(shuffled, false);
    showNextRecipes(true);
        });

    //pagination logic
        let currentIndex = 0;
        let RECIPES_PER_PAGE = 3;

        function displayRecipes(recipes) {
        const recipesGrid = document.getElementById('recipes-grid');
        const loadMoreBtn = document.getElementById('load-more-btn');
        recipesGrid.innerHTML = '';

        if (recipes.length === 0) {
            recipesGrid.innerHTML = '<div class="no-results">No recipes found with those ingredients. Try different search terms.</div>';
            if (loadMoreBtn) loadMoreBtn.style.display = 'none';
            return;
        }

        displayedRecipes = recipes; 
        currentIndex = 0;
        showNextRecipes(true); // show first page 
        }

        function showNextRecipes(reset = false) {
        const recipesGrid = document.getElementById('recipes-grid');
        const loadMoreBtn = document.getElementById('load-more-btn');

        // Reset index if starting fresh
        if (reset) currentIndex = 0;

        // Compute which slice to show
        const nextRecipes = displayedRecipes.slice(currentIndex, currentIndex + RECIPES_PER_PAGE);

        // Replace existing cards instead of appending
        recipesGrid.innerHTML = '';

        nextRecipes.forEach(recipe => {
            const isFavorite = userFavorites.some(fav => String(fav.id) === String(recipe.id));
            const recipeCard = createRecipeCard(recipe, isFavorite);
            recipesGrid.appendChild(recipeCard);
        });

        attachFavoriteListeners();
        attachRemoveFavoriteListeners();

        currentIndex += RECIPES_PER_PAGE;

        // Reset to first page if we reach the end (cycle behavior)
        if (currentIndex >= displayedRecipes.length) {
            currentIndex = 0;
        }

        // Always show button (since it cycles)
        if (loadMoreBtn) loadMoreBtn.style.display = 'block';
        }

        //---reset load more state---

        function resetLoadMore(recipes, autoDisplay = true) {
        console.log("resetLoadMore called:", recipes.length, "recipes"); //testing
        displayedRecipes = recipes;
        currentIndex = 0;

        // only draw if told to
        if (autoDisplay) {
            showNextRecipes(true);
        }

        const oldBtn = document.getElementById('load-more-btn');
        if (oldBtn) {
            const newBtn = oldBtn.cloneNode(true);
            oldBtn.replaceWith(newBtn);
            newBtn.style.display = 'block';
            newBtn.addEventListener('click', () => showNextRecipes());
        }
        }

        // Display the favorites in home Section
        function displayHomeFavorites(){
            const homeFavoritesContainer = document.getElementById('home-favorites-container');
            homeFavoritesContainer.innerHTML = '';

            if (userFavorites.length === 0 ){
                homeFavoritesContainer.innerHTML='<div class="no-favorites">You haven\'t added any favorites yet. Browse recipes and favorite them.</div>';
                return;
            }

            // Show up to the current per-page favorites 
            const favoritesToShow = userFavorites.slice(0, RECIPES_PER_PAGE);

            favoritesToShow.forEach(recipe => {
                const recipeCard = createRecipeCard(recipe, true);
            //remove cook time and calories if in favorites (db restriction)
                recipeCard.querySelectorAll('.cook-time, .calories').forEach(el => el.remove());

                homeFavoritesContainer.appendChild(recipeCard);
            });
            attachRemoveFavoriteListeners();
        }

        // Display favorites in favorites section 
        function displayFavorites() {
            const favoritesContainer = document.getElementById('favorites-container');
            favoritesContainer.innerHTML = '';
            
            if (userFavorites.length === 0) {
                favoritesContainer.innerHTML = '<div class="no-favorites">You haven\'t added any favorites yet. Browse recipes and click the heart to save them!</div>';
                return;
            }
            
            userFavorites.forEach(recipe => {
                const recipeCard = createRecipeCard(recipe, true);
                favoritesContainer.appendChild(recipeCard);
            });
            
            attachRemoveFavoriteListeners();
        }

        // Create a recipe card element
        function createRecipeCard(recipe, isFavorite) {
            const flipCard = document.createElement('div');
            flipCard.className = 'flip-card';
            if (recipe && recipe.id !== undefined) {
                flipCard.setAttribute('data-id', recipe.id);
            }

            // Determine the image source: use the blob endpoint for saved recipes, otherwise use the original URL
            const imageUrl = recipe.saved_id ? `/recipe_image/${recipe.saved_id}` : recipe.image;

            // truncate summary for display to ~30 words
            const displaySummary = truncateWords(recipe.summary || '', 30);

            let favoriteButton = "";

                if (!recipe.isHardcoded) {
                    favoriteButton = isFavorite
                        ? `<button class="remove-favorite-btn" data-id="${recipe.id}">
                            <span class="heart-icon"><i class="fas fa-heart"></i></span> Remove from Favorites
                        </button>`
                        : `<button class="favorite-btn" data-id="${recipe.id}">
                            <span class="heart-icon"><i class="far fa-heart"></i></span> Add to Favorites
                        </button>`;
                }


            // Create the card HTML
            flipCard.innerHTML = `
                <div class="flip-card-inner">
                    <div class="flip-card-front">
                        <div class="recipe-image">
                            <img src="${imageUrl}" alt="${recipe.title}">
                        </div>

                        <div class="recipe-info">

                        ${recipe.favoriteOf ? `<p class="mock-owner">❤️ ${recipe.favoriteOf}'s Favorite</p>` : ''}

                            <h3 class="recipe-title">${recipe.title}</h3>
                            <div class="recipe-meta" id="meta-${recipe.id}">
                                ${recipe.calories
                                    ? `<p class="calories"><i class="fas fa-fire"></i> ${recipe.calories} cal${recipe.servings ? ' • ' + Math.round(recipe.calories / recipe.servings) + ' per serving' : ''}</p>`
                                    : ''}
                                ${recipe.cook_time && recipe.cook_time !== 'Cook time not available'
                                    ? `<p class="cook-time"><i class="far fa-clock"></i> ${recipe.cook_time}</p>`
                                    : ''}
                            </div>
                        </div>
                        <br>
                        <div class="flip-hint">Hover to see details</div>
                    </div>

                    <div class="flip-card-back">
                        <h3 class="recipe-title">${recipe.title}</h3>
                        ${recipe.cook_time
                            ? `<p class="cook-time"><i class="far fa-clock"></i> ${recipe.cook_time}</p>`
                            : ''}
                        <div class="recipe-summary">
                            <p>${displaySummary}</p>
                        </div>
                        <a href="${recipe.link}" class="recipe-link" target="_blank">
                            <i class="fas fa-external-link-alt"></i> View Full Recipe
                        </a>
                        ${favoriteButton}
                    </div>
                </div>
            `;
            //if in favorites section, remove cook time and calories
            const observer = new MutationObserver(() => {
                const parent = flipCard.parentElement;
                if (parent && parent.id === 'favorites-container') {
                    flipCard.querySelectorAll('.cook-time, .calories').forEach(el => el.remove());
                }
            });

            observer.observe(document.body, { childList: true, subtree: true });

            return flipCard;
        }


        // Attach Event Listeners
        function attachEventListeners(){
            // Navigation Functionality 
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', function(e){
                    const section = this.getAttribute('data-section');
                    const sectionId = section ? section + '-section' : null;
                    const targetSection = sectionId ? document.getElementById(sectionId) : null;

                    // If the target section exists, perform single-page navigation. Otherwise allow normal navigation.
                    if (targetSection) {
                        e.preventDefault();

                        // Update nav link active state
                        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                        this.classList.add('active');

                        // Show corresponding section
                        document.querySelectorAll('.content-section').forEach(sectionEl => {
                            sectionEl.classList.remove('active');
                        });
                        targetSection.classList.add('active');
                        // Optionally scroll to top of the content
                        window.scrollTo({ top: 0, behavior: 'smooth' });

                    if (section === 'home') {
                        const shuffled = [...mockRecipes].sort(() => Math.random() - 0.5);
                        resetLoadMore(shuffled);

                        //---home tab removes ingredients from searchbar and chips(resets)---
                        const ingredientInput = document.getElementById('ingredient-input');
                        const selectedIngredientsContainer = document.getElementById('selected-ingredients-container');
                        if (ingredientInput) ingredientInput.value = '';
                        if (selectedIngredientsContainer) selectedIngredientsContainer.innerHTML = '';
                        if (typeof selectedIngredients !== 'undefined') selectedIngredients.clear();
                        }
                    }
                });
            });

            //During search, deactivate nav highlights
            const searchForm = document.getElementById('search-form');
            if (searchForm) {
                searchForm.addEventListener('submit', function() {
            //Remove highlight from all nav links when showing search results
                    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
                });
            }

//filters

    const dropdowns = document.querySelectorAll(".multi-dropdown");

    dropdowns.forEach(dropdown => {
        const btn = dropdown.querySelector(".multi-dropdown-btn");
        const menu = dropdown.querySelector(".multi-dropdown-menu");

        btn.addEventListener("click", function (e) {
            e.stopPropagation();

            // close other dropdowns
            dropdowns.forEach(d => {
                if (d !== dropdown) d.classList.remove("open");
            });

            // toggle current dropdown
            dropdown.classList.toggle("open");
        });

        // click inside menu should NOT close it
        menu.addEventListener("click", (e) => {
            e.stopPropagation();
        });
    });

    // clicking outside closes all dropdowns
    document.addEventListener("click", function () {
        dropdowns.forEach(d => d.classList.remove("open"));
    });

            const clearFiltersBtn = document.getElementById('clear-filters');


            const applyFiltersBtn = document.getElementById('apply-filters-btn');
            if (applyFiltersBtn) {
                applyFiltersBtn.addEventListener('click', function () {
                    document.getElementById('search-form').dispatchEvent(new Event('submit'));
                });
            }

// Clear filters button
if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener('click', function (e) {
        e.preventDefault();

        // uncheck all 
        document.querySelectorAll(
            '#diet-filters input[type="checkbox"], ' +
            '#allergy-filters input[type="checkbox"], ' +
            '#cuisine-filters input[type="checkbox"]'
        ).forEach(cb => {
            cb.checked = false;
        });
        
        const cuisineSelect = document.getElementById('cuisine-filter');
        if (cuisineSelect) cuisineSelect.value = "";

        // hide/clear active filters UI
        const activeContainer = document.getElementById('active-filters');
        const filtersList = document.getElementById('filters-list');
        if (filtersList) filtersList.innerHTML = '';
        if (activeContainer) activeContainer.style.display = 'none';

        // if there are ingredients, re-search without filters
        const ingredients = document.getElementById('ingredient-input').value.trim();
        if (ingredients) {
            document.getElementById('search-form').dispatchEvent(new Event('submit'));
        }
    });
}


            // Search functionality 
            document.getElementById('search-form').addEventListener('submit', function(e){
                e.preventDefault();
                const ingredients = document.getElementById('ingredient-input').value.trim();

            // --- Always switch to the Home section when searching ---
            const homeSection = document.getElementById('home-section');
            if (homeSection) {
            // Hide all other sections
            document.querySelectorAll('.content-section').forEach(sectionEl => {
                sectionEl.classList.remove('active');
            });
            homeSection.classList.add('active');

            // Update nav button highlight
            document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
            // document.querySelector('.nav-link[data-section="home"]')?.classList.add('active');
            }


// Build query and call Flask backend

        // Diets
        const selectedDiets = Array.from(
            document.querySelectorAll('#diet-filters input[type="checkbox"]:checked')
        )
        .map(cb => cb.value)
        .filter(v => v !== ""); // ignore empty "All Diets"

        // Allergies
        const selectedAllergies = Array.from(
            document.querySelectorAll('#allergy-filters input[type="checkbox"]:checked')
        ).map(cb => cb.value);

        // Cuisines
        const selectedCuisines = Array.from(
            document.querySelectorAll('#cuisine-filters input[type="checkbox"]:checked')
        ).map(cb => cb.value);

        // Build params
        const params = new URLSearchParams({ ingredients });

        // Diet params
        // selectedDiets.forEach(d => params.append('diet', d));
        selectedDiets
            .filter(d => d.trim() !== "")   // FILTER OUT EMPTY VALUES
            .forEach(d => params.append('diet', d));

        // Allergy params
        selectedAllergies.forEach(a => params.append('allergy', a));

        // Cuisine params
        const cuisine = document.getElementById('cuisine-filter').value;
        if (cuisine) params.append('cuisine', cuisine);

        const url = `/search_recipes?${params.toString()}`;

        const recipesGrid = document.getElementById('recipes-grid');
        recipesGrid.innerHTML = '<div class="loading">Searching recipes...</div>';

            fetch(url)
            .then(res => {
                if (!res.ok) {
                    // Handle non-2xx responses by trying to parse the error message
                    return res.json().then(err => { throw new Error(err.error || `Request failed with status ${res.status}`) });
                }
                return res.json();
            })
            .then(data => {
                // Edamam returns the recipes in an array
                const results = Array.isArray(data) ? data : [];
                
        // NEW MAPPING FOR EDAMAM API
        displayedRecipes = results.map(r => {
        // works whether backend returns {recipe: {...}} or a flat {...}
        const recipe = r?.recipe ?? r;

        // extract Edamam id
        const getRecipeId = (uri) => {
            if (!uri) return null;
            const parts = uri.split('#recipe_');
            return parts.length > 1 ? parts[1] : null;
        };

        const recipeId = getRecipeId(recipe?.uri);

        return {
            id: recipeId,
            title: recipe?.label || recipe?.title || 'Untitled Recipe',

            calories: typeof recipe?.calories === 'number' ? Math.round(recipe.calories) : null,
            servings: recipe?.yield || null,

            cook_time:
                recipe?.totalTime && recipe.totalTime !== 0
                ? `${recipe.totalTime} min`
                : (recipe?.cookTime || recipe?.total_time || ''),
            image: recipe?.image || 'https://via.placeholder.com/400x300.png?text=No+Image',
        link: recipe?.url || recipe?.url || recipe?.uri,
            ingredients: recipe?.ingredientLines || recipe?.ingredients || [],
            summary: recipe?.ingredientLines
            ? recipe.ingredientLines.slice(0, 4).join(', ')
            : (recipe?.summary || 'No summary available.'),
            dietLabels: recipe?.dietLabels || [],
            healthLabels: recipe?.healthLabels || []
        };
        }).filter(r => r.id);


                if (displayedRecipes.length === 0) {
                    recipesGrid.innerHTML = '<div class="no-results">No recipes found. Try different ingredients!</div>';
                    return;
                }

                displayRecipes(displayedRecipes);
            })
            .catch(err => {
                recipesGrid.innerHTML = `<div class="no-results">An error occurred: ${err.message}</div>`;
                console.error("Search failed:", err);
            });
        });
    }

        // Add to favorites function
        function attachFavoriteListeners(){
            document.querySelectorAll('.favorite-btn').forEach(button => {
                button.addEventListener('click', async function(e){
                    e.stopPropagation();  // Prevents card flip

                    // Prevent duplicate clicks
                    if (this.disabled) return;

                    // checks if user is logged in (since we arent using local storage anymore)
                    if (!isUserLoggedIn()) {
                        alert('Please create an account or log in to save recipes!');
                        return;
                    }
                    const recipeId = this.getAttribute('data-id');
                    // Look up in currently displayed recipes first, then fallback to mock or favorites
                     let recipe = displayedRecipes.find(r => String(r.id) === recipeId) || 
                         mockRecipes.find(r => String(r.id) === recipeId) || 
                         userFavorites.find(r => String(r.id) === recipeId);

                    if(recipe && !userFavorites.some(fav => String(fav.id) === recipeId)){
                     try {

                        //Disables button to prevent duplication
                        this.disabled = true;
                        this.innerHTML = '<span class="heart-icon"><i class="fas fa-spinner fa-spin"></i></span> Saving...';
                        const response = await fetch('/save_recipe', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(recipe)
                        });

                        if (response.ok) {
                        // Reload favorites from server to ensure sync
                        await loadUserFavorites();
                        
                        // Update UI
                        displayHomeFavorites();
                        displayFavorites();

                        if (document.getElementById('favorites-section').classList.contains('active')){
                            displayFavorites();
                        }
                        
                        // Update all cards with this recipe ID
                        document.querySelectorAll(`.flip-card[data-id="${recipeId}"]`).forEach(card => {
                            const btn = card.querySelector('.favorite-btn, .remove-favorite-btn');
                            if (btn) {
                                btn.innerHTML = '<span class="heart-icon"><i class="fas fa-heart"></i></span> Remove from Favorites';
                                btn.className = 'remove-favorite-btn';
                                btn.disabled = false;
                            }
                        });
                        
                        
                         attachRemoveFavoriteListeners();
                   } else if (response.status === 409) {
                        // Recipe already exists
                        const errorData = await response.json();
                        alert(errorData.error || 'Recipe is already saved');
                        this.disabled = false;
                        this.innerHTML = '<span class="heart-icon"><i class="far fa-heart"></i></span> Add to Favorites';
                    } else {
                        // Other error
                        const errorData = await response.json();
                        alert('Error saving recipe: ' + (errorData.error || 'Unknown error'));
                        this.disabled = false;
                        this.innerHTML = '<span class="heart-icon"><i class="far fa-heart"></i></span> Add to Favorites';
                    }

                        } catch (error) {
                            console.error('Error saving recipe:', error);
                            alert('Error saving recipe. Please try again.');
                            this.disabled = false;
                            this.innerHTML = '<span class="heart-icon"><i class="far fa-heart"></i></span> Add to Favorites';
                        }
                    }
                });
            });
        }

        // Remove from favorites functionality 
        function attachRemoveFavoriteListeners(){
            document.querySelectorAll('.remove-favorite-btn').forEach(button => {
                button.addEventListener('click', async function(e){
                    e.stopPropagation();  // Prevent card flip

                    // Prevent duplicate clicks
                    if (this.disabled) return;

                     if (!isUserLoggedIn()) {
                        alert('Please create an account or log in to manage favorites!');
                        return;
                    }

                    const recipeId = this.getAttribute('data-id');

                     try {

                    this.disabled = true;
                    this.innerHTML = '<span class="heart-icon"><i class="fas fa-spinner fa-spin"></i></span> Removing...';

                    // Call database API
                    const response = await fetch('/delete_saved_recipe', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ id: recipeId })
                    });

                    if (response.ok) {
                        await loadUserFavorites();

                        // Update favorites on home page
                        displayHomeFavorites();

                        //Update favorites on favorites page
                        displayFavorites();

                    // If we are on favorites page, remove the card
                         if(document.getElementById('favorites-section').classList.contains('active')){
                            displayFavorites();
                        }

                        // Update ALL cards with this recipe ID across the page
                        document.querySelectorAll(`.flip-card[data-id="${recipeId}"]`).forEach(card => {
                            const btn = card.querySelector('.favorite-btn, .remove-favorite-btn');
                            if (btn) {
                                btn.innerHTML = '<span class="heart-icon"><i class="far fa-heart"></i></span> Add to Favorites';
                                btn.className = 'favorite-btn';
                                btn.disabled = false;
                            }
                        });

                        // Re-attach listeners
                        attachFavoriteListeners();
                
                    }else{
                        const errorData = await response.json();
                        alert('Error removing recipe: ' + (errorData.error || 'Unknown error'));
                        this.disabled = false;
                        this.innerHTML = '<span class="heart-icon"><i class="fas fa-heart"></i></span> Remove from Favorites';

                    }
                    } catch (error) {
                        console.error('Error removing recipe:', error);
                        alert('Error removing recipe. Please try again.');
                        this.disabled = false;
                        this.innerHTML = '<span class="heart-icon"><i class="fas fa-heart"></i></span> Remove from Favorites';

                    }
                });
            });
        }

        // Helper to strip HTML tags
        function stripHtml(html){
            const tmp = document.createElement('div');
            tmp.innerHTML = html || '';
            return tmp.textContent || tmp.innerText || '';
        }

        // Helper to truncate text to a number of words
        function truncateWords(text, wordLimit){
            if(!text) return '';
            const words = text.split(/\s+/).filter(Boolean);
            if(words.length <= wordLimit) return words.join(' ');
            return words.slice(0, wordLimit).join(' ') + '...';
        }

//ingredient autocomplete and chip selection 

const ingredientInput = document.getElementById("ingredient-input");
const suggestionBox = document.createElement("ul");
suggestionBox.className = "autocomplete-list";
ingredientInput.parentNode.appendChild(suggestionBox);

const selectedIngredientsContainer = document.getElementById("selected-ingredients-container");
const selectedIngredients = new Set();

let activeIndex = -1;

//autocomplete
ingredientInput.addEventListener("input", async () => {
  const query = ingredientInput.value.trim();
  suggestionBox.innerHTML = "";
  suggestionBox.classList.remove("show");
  activeIndex = -1;

  if (query.length < 2) return;

  try {
    const res = await fetch(`/autocomplete?query=${encodeURIComponent(query)}`);
    const data = await res.json();

    if (!Array.isArray(data) || data.length === 0) return;

    suggestionBox.classList.add("show");
    suggestionBox.innerHTML = "";

    data.slice(0, 5).forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item.name;


    li.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();  

    handleIngredientSelection(item.name); // this already opens the sidebar when first ingredient is added

    // ensure it opens even if it's not the first chip
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sideMenu = document.getElementById('side-menu');

    if (!document.body.classList.contains('sidebar-open')) {
        document.body.classList.add('sidebar-open');         // same mechanism the button uses
        if (sidebarToggle) sidebarToggle.setAttribute('aria-expanded', 'true');
        if (sideMenu) sideMenu.setAttribute('aria-hidden', 'false');
    }
    });
        
      suggestionBox.appendChild(li);
    });

    const rect = ingredientInput.getBoundingClientRect();
    suggestionBox.style.width = rect.width + "px";
  } catch (err) {
    console.error("Autocomplete error:", err);
  }
});

//keyboard nav, select w enter or comma
ingredientInput.addEventListener("keydown", (e) => {
  const items = suggestionBox.querySelectorAll("li");

  switch (e.key) {
    case "ArrowDown":
      e.preventDefault();
      if (items.length) {
        activeIndex = (activeIndex + 1) % items.length;
        updateActive(items);
      }
      break;

    case "ArrowUp":
      e.preventDefault();
      if (items.length) {
        activeIndex = (activeIndex - 1 + items.length) % items.length;
        updateActive(items);
      }
      break;

    case "Enter":
    case ",":
      e.preventDefault();

      //dropdown select
      if (activeIndex >= 0 && activeIndex < items.length) {
        handleIngredientSelection(items[activeIndex].textContent);
      } 
      //allows manual entry if not in autocomplete 
      else {
        const manual = ingredientInput.value.trim().replace(/,$/, "");
        if (manual) handleIngredientSelection(manual);
      }
      break;

    case "Escape":
      suggestionBox.innerHTML = "";
      suggestionBox.classList.remove("show");
      activeIndex = -1;
      break;
  }
});

function updateActive(items) {
  items.forEach((item, i) => {
    item.classList.toggle("active", i === activeIndex);
  });
}

//POTATO mode logic
function handleIngredientSelection(ingredient) {
  const name = ingredient.trim();
  const lowerName = name.toLowerCase();

  if (!name) return;


  //if in potato mode, dont remove potato ingredient 
  if(isPotatoMode && lowerName == POTATO_INGREDIENT){
    // Flash message
    const chips = document.querySelectorAll('potato-chip');
    chips.forEach(chip => {
        chip.classList.add('flash');
        setTimeout(() => chip.classList.remove('flash', 600))
    });
    ingredientInput.value = ""
    suggestionBox.innerHTML = "";
    suggestionBox.classList.remove("show");
    ingredientInput.focus();
    return;
  }
  //if it's already selected, flash the existing chip instead of doing nothing
  if (selectedIngredients.has(lowerName)) {
    const chips = document.querySelectorAll('.chip');
    chips.forEach(chip => {
      if (chip.textContent.toLowerCase().includes(lowerName)) {
        chip.classList.add('flash');
        setTimeout(() => chip.classList.remove('flash'), 600);
      }
    });

    ingredientInput.value = "";
    suggestionBox.innerHTML = "";
    suggestionBox.classList.remove("show");
    ingredientInput.focus();
    return;
  }

  selectedIngredients.add(lowerName);
  addIngredientChip(name);
  ingredientInput.value = "";
  suggestionBox.innerHTML = "";
  suggestionBox.classList.remove("show");
  ingredientInput.focus();

   //auto open sidebar when adding first ingredient
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const sideMenu = document.getElementById('side-menu');
  if (sidebarToggle && sideMenu && !document.body.classList.contains('sidebar-open')) {
    document.body.classList.add('sidebar-open');
    sidebarToggle.setAttribute('aria-expanded', 'true');
    sideMenu.setAttribute('aria-hidden', 'false');
}
}


function addIngredientChip(ingredient) {
  const chip = document.createElement("div");
  chip.className = "chip";
  chip.innerHTML = `
    ${ingredient}
    <span class="remove-chip" data-ingredient="${ingredient}">&times;</span>
  `;
  selectedIngredientsContainer.appendChild(chip);

  chip.querySelector(".remove-chip").addEventListener("click", () => {
    selectedIngredients.delete(ingredient.toLowerCase());
    chip.remove();
    const ingredientArray = Array.from(selectedIngredients);
    document.getElementById("ingredient-input").value = ingredientArray.join(", ");
    toggleClearIngredientsButton();
  });
  toggleClearIngredientsButton();
}

function toggleClearIngredientsButton() {
  const btn = document.getElementById('clear-ingredients');
  if (!btn) return;

  // Always show and keep active
  btn.style.display = 'block';
}

document.addEventListener("click", (e) => {
  if (!suggestionBox.contains(e.target) && e.target !== ingredientInput) {
    suggestionBox.innerHTML = "";
    suggestionBox.classList.remove("show");
  }
});

//chip selection into form search list 
document.getElementById("search-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const currentValue = ingredientInput.value.trim().replace(/,$/, "");

if (currentValue) {
  const manualEntries = currentValue.split(",").map(v => v.trim()).filter(Boolean);

  manualEntries.forEach(entry => {
    const lower = entry.toLowerCase();
    if (!selectedIngredients.has(lower)) {
      selectedIngredients.add(lower);
      addIngredientChip(entry);
    }
  });

  //clear input
  ingredientInput.value = "";
}

  //combine chips into string w comma sep 
  // JUST FOR BEN:
    //   const ingredientArray = Array.from(selectedIngredients);
    //   document.getElementById("ingredient-input").value = ingredientArray.join(", ");
const ingredientArray = Array.from(selectedIngredients);
document.getElementById("ingredient-input").value = ingredientArray.join(", ");
setTimeout(() => {
    document.getElementById("ingredient-input").value = "";
}, 50);
});

// Sidebar toggle 
document.addEventListener('DOMContentLoaded', function() {
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sideMenu = document.getElementById('side-menu');
    if (!sidebarToggle || !sideMenu) return;

    sidebarToggle.addEventListener('click', function(e) {
        e.preventDefault();
        const opened = document.body.classList.toggle('sidebar-open');
        sidebarToggle.setAttribute('aria-expanded', opened);
        sideMenu.setAttribute('aria-hidden', !opened);
    });

    // Close sidebar when clicking outside
    document.addEventListener('click', function(e) {
        const isClickInsideSidebar = sideMenu.contains(e.target);
        const isClickOnToggle = sidebarToggle.contains(e.target);

        //prevent closing sidebar when chips removed
        const isChipRemove = e.target.classList.contains("remove-chip") ||
                        e.target.closest(".chip");

    if (isChipRemove) return;

        // if open, and click is NOT inside the sidebar OR on the toggle button then close it
        if (
            document.body.classList.contains('sidebar-open') &&
            !isClickInsideSidebar &&
            !isClickOnToggle
        ) {
            document.body.classList.remove('sidebar-open');
            sidebarToggle.setAttribute('aria-expanded', 'false');
            sideMenu.setAttribute('aria-hidden', 'true');
        }
    });

    // Close sidebar when search is submitted
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function() {
            if (document.body.classList.contains('sidebar-open')) {
                document.body.classList.remove('sidebar-open');
                sidebarToggle.setAttribute('aria-expanded', 'false');
                sideMenu.setAttribute('aria-hidden', 'true');
            }
        });
    }
//clear ingredients
const clearIngredientsBtn = document.getElementById('clear-ingredients');
if (clearIngredientsBtn) {
    clearIngredientsBtn.addEventListener('click', function() {
        if(isPotatoMode){
            // Removes all BUT potato
            const chips = document.querySelectorAll('.chip:not(.potato-chip)');
            chips.forEach(chip => {
                const ingredient = chip.textContext.trim().toLowerCase();
                selectedIngredients.delete(ingredient);
                chip.remove;
            });
        }else{
        selectedIngredients.clear();
        selectedIngredientsContainer.innerHTML = '';
        ingredientInput.value = '';
        }
        toggleClearIngredientsButton(); //hide clear ingredients button after clearing choices
    });
}
  toggleClearIngredientsButton();

  //GABBY mode
 const gabbyBtn = document.getElementById('gabby-btn');
    if (gabbyBtn) {
        gabbyBtn.addEventListener('click', function() {
            // Toggle between 3 and 4 recipes per page
            const isActive = this.getAttribute('aria-pressed') === 'true';
            if (isActive) {
                // Switch back to 3 recipes
                setRecipesPerPage(3, true);
                this.classList.remove('active');
                this.setAttribute('aria-pressed', 'false');
                this.innerHTML = 'Gabby Mode';
                document.body.classList.remove('gabby-mode');
            } else {
                //  4 recipes
                setRecipesPerPage(4, true);
                this.classList.add('active');
                this.setAttribute('aria-pressed', 'true');
                this.innerHTML = 'Normal Mode';
                document.body.classList.add('gabby-mode');
            }
        });
    }

    const potatoBtn = document.getElementById('potato-btn');
    if (potatoBtn) {
        potatoBtn.addEventListener('click', togglePotatoMode);
    }
});

async function loadDailyJoke() {
    const jokeContent = document.getElementById('joke-content');
    
    try {
        jokeContent.innerHTML = `
            <div class="joke-loading">
                Cooking up a joke...
            </div>
        `;

        const response = await fetch('/random_joke');
        const joke = await response.text();

        if (joke) {
        jokeContent.innerHTML = `
            <div class="joke-text">
                "${joke}"
            </div>
        `;
        } else {
            throw new Error('No joke received');
        }
                } catch (error) {
                        console.error('Error loading joke:', error);
                        jokeContent.innerHTML = `
                            <div class="joke-error">
                                ERROR: Couldn't fetch a joke
                            </div>
                        `;
                    }
                }

//  joke listener
function attachJokeListeners() {
    const refreshBtn = document.getElementById('refresh-joke');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', loadDailyJoke);
    }
}

// Potato Mode 
function togglePotatoMode() {
    const potatoBtn = document.getElementById('potato-btn');
    const body = document.body;

    const cuisineFilter = document.getElementById("cuisine-filter");
    if (cuisineFilter) {
        cuisineFilter.value = "";
    }

    isPotatoMode = !isPotatoMode

    if (isPotatoMode){
        // Enables ppotato mode
        body.classList.add("potato-mode");
        potatoBtn.classList.add('active');
        potatoBtn.setAttribute('aria-pressed', 'true');
        if (potatoBtn) potatoBtn.innerHTML = '🥔 Potato Mode ON';

        // Adds hardcoded potato ingredient 
        if (!selectedIngredients.has(POTATO_INGREDIENT)){
            selectedIngredients.add(POTATO_INGREDIENT)
            addPotatoChip()
        }

        const sidebarToggle = document.getElementById('sidebar-toggle');
        const sideMenu = document.getElementById('side-menu');
        if (!document.body.classList.contains('sidebar-open')){
            document.body.classList.add('sidebar-open');
            if (sidebarToggle) sidebarToggle.setAttribute('aria-expanded', 'true');
            if (sideMenu) sideMenu.setAttribute('aria-hidden', 'false');
        }

    } else {
          // Turns off Potato Mode
          body.classList.remove('potato-mode');
          potatoBtn.classList.remove('active');
          potatoBtn.setAttribute('aria-pressed', 'false');  
          potatoBtn.innerHTML = '🥔 Potato Mode';

                    // When turning off potato mode, remove only the potato ingredient and its chip
                    if (selectedIngredients.has(POTATO_INGREDIENT)) {
                        selectedIngredients.delete(POTATO_INGREDIENT);
                        removePotatoChip();
                        // Update the ingredient input to reflect remaining selected ingredients
                        const ingredientArray = Array.from(selectedIngredients);
                        document.getElementById('ingredient-input').value = ingredientArray.join(', ');
                    }
        }
}

// Adds Hardcoded potato ingredients
function addPotatoChip(){
    // Avoid creating duplicate potato chips
    if (document.querySelector('.potato-chip')) return;

    const chip = document.createElement('div');
    chip.className = 'chip potato-chip';
    chip.innerHTML = `
        ${POTATO_INGREDIENT}
        <span class="remove-chip" data-ingredient="${POTATO_INGREDIENT}" style="display: none;">&times;</span>
    `;

    selectedIngredientsContainer.appendChild(chip);
    toggleClearIngredientsButton();
}

//Removes potato ingredient
function removePotatoChip(){
    const potatoChips = document.querySelectorAll('.potato-chip');
    potatoChips.forEach(chip => chip.remove());

    // Ensure the ingredient input matches the selectedIngredients set
    const ingredientArray = Array.from(selectedIngredients);
    const input = document.getElementById('ingredient-input');
    if (input) input.value = ingredientArray.join(', ');

    toggleClearIngredientsButton();
}


// Initialize dark mode from localStorage
function initDarkMode() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
    
    // Update checkbox state
    const checkbox = document.getElementById('checkbox');
    if (checkbox) {
        checkbox.checked = isDarkMode;
    }
}

// Setup toggle functionality
function setupDarkModeToggle() {
    const checkbox = document.getElementById('checkbox');
    if (!checkbox) return;
    
    checkbox.addEventListener('change', function() {
        const isDarkMode = this.checked;
        
        // Toggle dark mode class on body
        document.body.classList.toggle('dark-mode', isDarkMode);
        
        // Save preference
        localStorage.setItem('darkMode', isDarkMode.toString());
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    initDarkMode();
    setupDarkModeToggle();
});

function setRecipesPerPage(n, resetDisplay = true) {
    RECIPES_PER_PAGE = Number(n) || 3;
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.textContent = `Load More Recipes`;
    }
    if (resetDisplay) {
        resetLoadMore(displayedRecipes, true);
    }
    // Reloads the Home favorites to show four recipes
    try {
        if (typeof displayHomeFavorites === 'function') displayHomeFavorites();
    } catch (e) {
        console.warn('Could not refresh home favorites:', e);
    }
}

// IM HUNGRY BUTTON functionality
const hungryBtn = document.getElementById("hungry-btn");
if (hungryBtn) {
    hungryBtn.addEventListener("click", function (e) {
        e.preventDefault();

        const cuisines = [
            "american", "asian", "british", "caribbean", "central europe", "chinese",
            "eastern europe", "french", "greek", "indian", "italian", "japanese",
            "korean", "kosher", "mediterranean", "mexican", "middle eastern",
            "nordic", "south american", "south east asian", "world"
        ];

        const randomCuisine =
            cuisines[Math.floor(Math.random() * cuisines.length)];

        const cuisineSelect = document.getElementById("cuisine-filter");
        if (cuisineSelect) cuisineSelect.value = randomCuisine;

        document.querySelectorAll("#diet-filters input, #allergy-filters input")
            .forEach(cb => cb.checked = false);

        //bc FIREFOX IS DUMB
        const form = document.getElementById("search-form");
        if (form) {
            const submitEvent = new Event("submit", {
                bubbles: true,
                cancelable: true
            });
            form.dispatchEvent(submitEvent);
        }
    });
}

// site redirect for bad sites in list REDIRECT_SITES 

document.addEventListener("click", function (e) {
    const link = e.target.closest(".recipe-link");
    if (!link) return;

    const url = link.getAttribute("href");

    let hostname;
    try {
        hostname = new URL(url).hostname.replace(/^www\./, "");
    } catch (err) {
        console.warn("[redirect] invalid URL", url, err); //testing
        return;
    }

    const shouldRedirect = REDIRECT_SITES.some(site => hostname.includes(site));
    if (!shouldRedirect) return;

    e.preventDefault();
    e.stopPropagation();

    alert("This link is bad, so we’re giving you a Google search instead.");

    //get the title for the search
    const titleEl = link.closest(".flip-card").querySelector(".recipe-title");
    const title = titleEl
        ? titleEl.textContent.trim()
        : (link.dataset.title || link.textContent || "").trim();

    const googleSearch = `https://www.google.com/search?q=${encodeURIComponent(title)}`;

    console.log("[redirect] redirecting to:", googleSearch);
    window.open(googleSearch, "_blank");
});

