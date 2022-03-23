import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import MyContext from './MyContext';
import { fetchMeals,
  fetchMealCategories,
  fetchDrinks,
  fetchDrinkCategories,
} from '../services/fetchApi';

import RecipesCardFood from '../components/RecipesCardFood';
import RecipesCardDrink from '../components/RecipesCardDrink';

import { setLocalStorage, getLocalStorage } from '../services/localStorage';

import whiteHeartIcon from '../images/whiteHeartIcon.png';
import blackHeartIcon from '../images/blackHeartIcon.png';

const START_RECIPE = 'Start Recipe';

function Provider({ children }) {
  const [check, setCheck] = useState();
  const [stepsClassName, setStepsClassName] = useState();
  const [searchbtn, setsearchbtn] = useState(true);
  const [mealsArray, setMealsArray] = useState([]);
  const [initialCategoriesFood, setInitialCategoriesFood] = useState([]);
  const [initialCategoriesDrink, setinitialCategoriesDrink] = useState([]);
  const [drinksArray, setDrinksArray] = useState([]);
  const [itemRecovered, setItemRecovered] = useState([]);
  const [renderSearch, setRenderSearch] = useState(true);
  const [kind, setKind] = useState('');
  const [inputSearch, setInputSearch] = useState('');
  const [buttonValue, setButtonValue] = useState('');
  const [toggleShowBar, setToggleShowBar] = useState(false);

  const verify = () => {
    const te = itemRecovered.length === 1
      && Object.fromEntries(
        Object.entries(itemRecovered[0])
          .filter((it1) => it1[0].includes('strIngredient')),
      );
    const te1 = Object.entries(te);
    const te2 = te1
      .filter((val) => val[1] !== null)
      .filter((val) => val[1].length > 0);
    return te2;
  };

  const funcSetSearch = () => {
    setsearchbtn(!searchbtn);
  };

  const requestApiFoods = async () => {
    const mealsApi = await fetchMeals();
    setMealsArray(mealsApi);

    const categories = await fetchMealCategories();
    setInitialCategoriesFood(categories);
  };

  const requestApiDrinks = async () => {
    const drinks = await fetchDrinks();
    setDrinksArray(drinks);

    const categories = await fetchDrinkCategories();
    setinitialCategoriesDrink(categories);
  };

  const foodsRecipe = (meal, index) => (
    <RecipesCardFood
      key={ meal.idMeal }
      idMeal={ meal.idMeal }
      strMeal={ meal.strMeal }
      strMealThumb={ meal.strMealThumb }
      index={ index }
    />
  );

  const drinksRecipe = (drink, index) => (
    <RecipesCardDrink
      key={ drink.idDrink }
      idDrink={ drink.idDrink }
      strDrink={ drink.strDrink }
      strDrinkThumb={ drink.strDrinkThumb }
      index={ index }
    />
  );

  const renderKind = () => (kind === '/foods/' ? mealsArray : drinksArray);

  const choose = (item, index) => {
    if (kind === '/drinks/') {
      return drinksRecipe(item, index);
    }
    return foodsRecipe(item, index);
  };

  const history = useHistory();

  const redirectUniqueItem = () => {
    const kindDiscover = kind === '/drinks/' ? 'idDrink' : 'idMeal';
    history.push(`${kind}${renderKind()[0][`${kindDiscover}`]}`);
  };

  const checkFoodOrDrink = async (func, setFunc) => {
    const storeAPIData = await func(inputSearch);
    const checkerApiData = storeAPIData === null
      ? global.alert('Sorry, we haven\'t found any recipes for these filters.')
      : setFunc([...storeAPIData]);
    return checkerApiData;
  };

  const [verifyStart, setVerifyStart] = useState(true);
  const [btnValue, setbtnValue] = useState(START_RECIPE);
  const testDoneRecipes = (id) => {
    const getLocal = getLocalStorage('doneRecipes');
    if (getLocal) {
      setVerifyStart(getLocal.some((a) => a.id !== id));
    }
  };

  const testInprogressRecipesMeals = (id) => {
    const getLocalInprogress = getLocalStorage('inProgressRecipes');
    if (getLocalInprogress) {
      setbtnValue(getLocalInprogress.meals[id] !== undefined
        ? 'Continue Recipe' : START_RECIPE);
    }
  };

  const testInprogressRecipesCocktails = (id) => {
    const getLocalInprogress = getLocalStorage('inProgressRecipes');
    if (getLocalInprogress) {
      setbtnValue(getLocalInprogress.cocktails[id] !== undefined
        ? 'Continue Recipe' : START_RECIPE);
    }
  };

  const [imageFav, setImageFav] = useState(whiteHeartIcon);
  const favFuncDrink = (id) => {
    if (imageFav === whiteHeartIcon) {
      setImageFav(blackHeartIcon);
      const favoriteRecipes = getLocalStorage('favoriteRecipes');
      const newStorage = [
        ...favoriteRecipes,
        {
          id,
          type: 'drink',
          nationality: itemRecovered[0].strArea ? itemRecovered[0].strArea : '',
          category: itemRecovered[0].strCategory,
          alcoholicOrNot: itemRecovered[0].strAlcoholic
            ? itemRecovered[0].strAlcoholic : '',
          name: itemRecovered[0].strDrink,
          image: itemRecovered[0].strDrinkThumb,
        },
      ];
      setLocalStorage('favoriteRecipes', newStorage);
    } else {
      setImageFav(whiteHeartIcon);
    }
  };

  const favFuncMeal = (id) => {
    if (imageFav === whiteHeartIcon) {
      setImageFav(blackHeartIcon);
      const favoriteRecipes = getLocalStorage('favoriteRecipes');
      const newStorage = [
        ...favoriteRecipes,
        {
          id,
          type: 'food',
          nationality: itemRecovered[0].strArea,
          category: itemRecovered[0].strCategory,
          alcoholicOrNot: itemRecovered[0].strAlcoholic
            ? itemRecovered[0].strAlcoholic : '',
          name: itemRecovered[0].strMeal,
          image: itemRecovered[0].strMealThumb,
        },
      ];
      setLocalStorage('favoriteRecipes', newStorage);
    } else {
      setImageFav(whiteHeartIcon);
    }
  };

  const stateHook = {
    check,
    setCheck,
    stepsClassName,
    setStepsClassName,
    searchbtn,
    funcSetSearch,
    mealsArray,
    setMealsArray,
    initialCategoriesFood,
    initialCategoriesDrink,
    requestApiFoods,
    requestApiDrinks,
    drinksArray,
    setDrinksArray,
    foodsRecipe,
    drinksRecipe,
    itemRecovered,
    setItemRecovered,
    verify,
    renderSearch,
    setRenderSearch,
    kind,
    setKind,
    checkFoodOrDrink,
    inputSearch,
    setInputSearch,
    choose,
    redirectUniqueItem,
    renderKind,
    setButtonValue,
    buttonValue,
    testDoneRecipes,
    testInprogressRecipesMeals,
    testInprogressRecipesCocktails,
    btnValue,
    verifyStart,
    favFuncDrink,
    favFuncMeal,
    imageFav,
    setImageFav,
    toggleShowBar,
    setToggleShowBar,
  };

  useEffect(() => {
    requestApiFoods();
    requestApiDrinks();
  }, []);

  return (
    <MyContext.Provider value={ stateHook }>
      { children }
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
  stateHook: PropTypes.node,
}.isRequired;

export default Provider;
