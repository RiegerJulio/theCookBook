// API para comida

export const fetchMeals = async () => {
  const apiFetch = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const response = await apiFetch.json();
  return response.meals;
};

export const fetchMealsCategory = async (category) => {
  const apiFetch = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  const response = await apiFetch.json();
  return response.meals;
};

export const fetchMealCategories = async () => {
  const apiFetch = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const response = await apiFetch.json();
  return response.meals;
};

export const fetchMealsIngredientName = async (ingredientName) => {
  try {
    const apiFetch = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientName}`);
    const response = await apiFetch.json();
    return response.meals;
  } catch (err) {
    console.log(err);
  }
};

export const fetchMealsName = async (name) => {
  try {
    const apiFetch = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    const response = await apiFetch.json();
    return response.meals;
  } catch (err) {
    console.log(err);
  }
};

export const fetchMealsFirstLetter = async (firstLetter) => {
  try {
    const apiFetch = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);
    const response = await apiFetch.json();
    return response.meals;
  } catch (err) {
    console.log(err);
  }
};

// API para bebidas

export const fetchDrinks = async () => {
  const apiFetch = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const response = await apiFetch.json();
  return response.drinks;
};

export const fetchDrinksCategory = async (category) => {
  const apiFetch = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
  const response = await apiFetch.json();
  return response.drinks;
};


export const fetchDrinkCategories = async () => {
  const apiFetch = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const response = await apiFetch.json();
  return response.drinks;
};

export const fetchDrinksIngredientName = async (ingredientName) => {
  const apiFetch = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredientName}`);
  const response = await apiFetch.json();
  return response.drinks;
};

export const fetchDrinksName = async (name) => {
  const apiFetch = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
  const response = await apiFetch.json();
  return response.drinks;
};

export const fetchDrinksFirstLetter = async (firstLetter) => {
  const apiFetch = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`);
  const response = await apiFetch.json();
  return response.drinks;
};

// API para aleatoriedades

export const fetchRandomMeal = async () => {
  const apiFetch = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
  const response = await apiFetch.json();
  return response.meals[0];
};

export const fetchRandomDrink = async () => {
  const apiFetch = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
  const response = await apiFetch.json();
  return response.drinks[0];
};

// API para ingredientes

export const fetchMealIngredients = async () => {
  const apiFetch = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
  const response = await apiFetch.json();
  return response.meals;
};

export const fetchDrinkIngredients = async () => {
  const apiFetch = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
  const response = await apiFetch.json();
  return response.drinks;
};

// API para nacionalidades

export const fetchMealNationalities = async () => {
  const apiFetch = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
  const response = await apiFetch.json();
  return response.meals;
};

export const fetchMealsNationality = async (nationality) => {
  const apiFetch = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${nationality}`);
  const response = await apiFetch.json();
  return response.meals;
};

// API para detalhes

export const fetchMealDetailsId = async (id) => {
  const apiFetch = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const response = await apiFetch.json();
  return response.meals[0];
};

export const fetchDrinkDetailsId = async (id) => {
  const apiFetch = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const response = await apiFetch.json();
  return response.drinks[0];
};
