import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import {
  fetchMealsIngredientName,
  fetchMealsName,
  fetchMealsFirstLetter,
  fetchDrinksIngredientName,
  fetchDrinksName,
  fetchDrinksFirstLetter,
} from '../services/fetchApi';

import MyContext from '../Context/MyContext';

function Search() {
  const [storeWord, setStoreWord] = useState('');
  const {
    setMealsArray,
    setDrinksArray,
    kind,
    checkFoodOrDrink,
    inputSearch,
    setInputSearch,
    setButtonValue,
    toggleShowBar,
  } = useContext(MyContext);

  const recoverData = async (func1, func2) => {
    const mealsOrDrinks = kind === '/drinks/'
      ? checkFoodOrDrink(func2, setDrinksArray) : checkFoodOrDrink(func1, setMealsArray);
    return mealsOrDrinks;
  };

  const firstLetterCheck = async () => {
    const checker = inputSearch.length > 1
      ? global.alert('Your search must have only 1 (one) character')
      : await recoverData(fetchMealsFirstLetter, fetchDrinksFirstLetter);
    return checker;
  };

  const switchCase = () => {
    switch (storeWord) {
    case 'ingredient':
      recoverData(fetchMealsIngredientName, fetchDrinksIngredientName);
      break;
    case 'name':
      recoverData(fetchMealsName, fetchDrinksName);
      break;
    case 'first-letter':
      firstLetterCheck();
      break;
    default:
    }
    setButtonValue('Search');
  };

  return (
    <section>
      { toggleShowBar ? (
        <div className="search-container">
          <div className="search-group">
            <input
              className="search-input"
              type="text"
              data-testid="search-input"
              value={ inputSearch }
              onChange={ ({ target }) => setInputSearch(target.value) }
            />
            <p>
              <label htmlFor="ingredient-search">
                <input
                  type="radio"
                  name="search"
                  id="ingredient-search"
                  data-testid="ingredient-search-radio"
                  onChange={ () => setStoreWord('ingredient') }
                />
                <span className="teste">Ingredient Search</span>
              </label>
            </p>
            <p>
              <label htmlFor="name-search">
                <input
                  type="radio"
                  name="search"
                  id="name-search"
                  data-testid="name-search-radio"
                  onChange={ () => setStoreWord('name') }
                />
                <span>Name Search</span>
              </label>
            </p>
            <p>
              <label htmlFor="first-letter-search">
                <input
                  type="radio"
                  name="search"
                  id="first-letter-search"
                  data-testid="first-letter-search-radio"
                  onChange={ () => setStoreWord('first-letter') }
                />
                <span>First Letter Search</span>
              </label>
            </p>
            <button
              className="waves-effect waves-light btn deep-orange accent-2"
              type="button"
              data-testid="exec-search-btn"
              onClick={ switchCase }
            >
              Search
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}

Search.propTypes = {
  title: PropTypes.string,
  kind: PropTypes.string,
}.isRequired;

export default Search;
