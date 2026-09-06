// Pre-encoded Filipino recipe dataset (DA Bantay Presyo estimated averages)
const recipes = [
  {
    title: "Ginisang Sayote with Egg",
    totalCost: 75,
    servings: 3,
    ingredients: [
      { name: "Sayote (2 pcs)", cost: 25 },
      { name: "Eggs (2 pcs)", cost: 18 },
      { name: "Aromatics & Cooking Oil", cost: 12 },
      { name: "Cooked Rice (3 cups)", cost: 20 }
    ],
    guideUrl: "https://www.youtube.com/results?search_query=ginisang+sayote+with+egg+recipe"
  },
  {
    title: "Adobong Sitaw with Tofu",
    totalCost: 100,
    servings: 4,
    ingredients: [
      { name: "Sitaw / String Beans (1 bundle)", cost: 30 },
      { name: "Tofu / Tokwa (3 pcs)", cost: 25 },
      { name: "Soy Sauce, Vinegar, Garlic", cost: 15 },
      { name: "Cooked Rice (4 cups)", cost: 30 }
    ],
    guideUrl: "https://www.youtube.com/results?search_query=adobong+sitaw+with+tofu+recipe"
  },
  {
    title: "Ginisang Munggo with Tinapa & Malunggay",
    totalCost: 120,
    servings: 4,
    ingredients: [
      { name: "Munggo Beans (200g)", cost: 25 },
      { name: "Tinapa Flakes (100g)", cost: 35 },
      { name: "Malunggay / Dahon ng Sili", cost: 10 },
      { name: "Aromatics & Oil", cost: 15 },
      { name: "Cooked Rice (4 cups)", cost: 35 }
    ],
    guideUrl: "https://www.youtube.com/results?search_query=ginisang+munggo+recipe"
  },
  {
    title: "Pinakbet (Vegetable Stew)",
    totalCost: 160,
    servings: 4,
    ingredients: [
      { name: "Mixed Veggies (Kalabasa, Sitaw, Talong, Okra)", cost: 70 },
      { name: "Pork bits / Bagoong", cost: 45 },
      { name: "Aromatics & Oil", cost: 15 },
      { name: "Cooked Rice (4 cups)", cost: 30 }
    ],
    guideUrl: "https://www.youtube.com/results?search_query=pinakbet+tagalog+recipe"
  },
  {
    title: "Chicken Tinola",
    totalCost: 220,
    servings: 4,
    ingredients: [
      { name: "Chicken (500g)", cost: 110 },
      { name: "Sayote / Green Papaya", cost: 25 },
      { name: "Dahon ng Sili / Malunggay", cost: 10 },
      { name: "Ginger, Onion, Garlic, Patis", cost: 20 },
      { name: "Cooked Rice (4 cups)", cost: 55 }
    ],
    guideUrl: "https://www.youtube.com/results?search_query=chicken+tinola+recipe"
  }
];

function generateMeals() {
  const totalBudgetInput = document.getElementById("totalBudget").value;
  const headcountInput = document.getElementById("headcount").value;
  const allowanceBadge = document.getElementById("allowanceBadge");
  const recipeContainer = document.getElementById("recipeContainer");

  // Reset outputs
  recipeContainer.innerHTML = "";
  allowanceBadge.classList.add("hidden");

  // Input Validation
  const totalBudget = parseFloat(totalBudgetInput);
  const headcount = parseInt(headcountInput);

  if (isNaN(totalBudget) || isNaN(headcount) || totalBudget <= 0 || headcount <= 0) {
    recipeContainer.innerHTML = `
      <div class="card error-card">
        <p><strong>Please enter valid numbers for both Total Budget and Headcount.</strong></p>
      </div>`;
    return;
  }

  // Calculate Allowance per Person
  const budgetPerPerson = (totalBudget / headcount).toFixed(2);
  allowanceBadge.innerHTML = `Calculated Budget Allowance: ₱${budgetPerPerson} per person`;
  allowanceBadge.classList.remove("hidden");

  // Filter recipes affordable within the total cash on hand
  const matchingRecipes = recipes.filter(recipe => recipe.totalCost <= totalBudget);

  // Fallback for extremely low budget entries
  if (matchingRecipes.length === 0) {
    recipeContainer.innerHTML = `
      <div class="card error-card">
        <p><strong>No matching recipes found within ₱${totalBudget}.</strong></p>
        <p style="font-size:0.85rem; margin-top:5px;">Budget is too low for a full ulam dish option. Try increasing your budget or adjusting headcount.</p>
      </div>`;
    return;
  }

  // Dynamic DOM Rendering of Matching Recipes
  matchingRecipes.forEach((recipe, index) => {
    const savingsLeft = (totalBudget - recipe.totalCost).toFixed(2);
    
    // Build ingredient list markup
    let ingredientsHTML = "";
    recipe.ingredients.forEach(item => {
      ingredientsHTML += `<li><span>${item.name}</span> <span>₱${item.cost.toFixed(2)}</span></li>`;
    });

    const cardHTML = `
      <div class="card recipe-card">
        <h2 class="recipe-title">Option ${index + 1}: ${recipe.title}</h2>
        <p class="cost-summary">
          Est. Total Cost: <strong>₱${recipe.totalCost.toFixed(2)}</strong> | 
          <span class="savings">Savings Left: ₱${savingsLeft}</span>
        </p>
        
        <ul class="ingredient-list">
          ${ingredientsHTML}
        </ul>

        <a href="${recipe.guideUrl}" target="_blank" class="recipe-link">View Cooking Guide & Instructions &rarr;</a>
      </div>`;

    recipeContainer.innerHTML += cardHTML;
  });
}