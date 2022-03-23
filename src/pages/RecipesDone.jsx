import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import Header from '../components/Header';
import MyContext from '../Context/MyContext';
import RecipesCardDrink from '../components/RecipesCardDrink';
import RecipesCardFood from '../components/RecipesCardFood';

import headerLogo from '../images/header-logo.png';
import { getLocalStorage } from '../services/localStorage';
import LowerMenu from '../components/LowerMenu';


import '../pages/css/detailsFoodsAndDrinks.css';

const copy = require('clipboard-copy');

function RecipesDone() {
  const [storeDoneRecipe, setStoreDoneRecipe] = useState([]);
  const [verify, setVerify] = useState(false);
  const [wordFilter, setWordFilter] = useState('');
  const history = useHistory();
  const { drinksArray, mealsArray } = useContext(MyContext);

  const myFunc = async () => {
    const getDoneRecipes = await getLocalStorage('doneRecipes');
    return getDoneRecipes !== null && setStoreDoneRecipe([...getDoneRecipes]);
  };

  useEffect(() => {
    myFunc();
  }, []);

  const functionShare = (type, id) => {
    copy(`http://localhost:3000/${type}s/${id}`);
    setVerify(!verify);
  };

  const redirectToRecipe = (type, id) => {
    history.push(`/${type}s/${id}`);
  };

  return (
    <div>
      <div className="header-container">
        <Header/>
        <img src={ headerLogo } alt="header logo" className="header-logo" />
        <div className="white-space"/>
      </div>
      <h1 data-testid="page-title" className="header-title">Recipes Done</h1>
      <div className="done-recipes-container">
        <button
          className="waves-effect waves-light btn-large red darken-4"
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setWordFilter('') }
        >
          <span
            className="btn-explore-text"
          >
            All
          </span>
        </button>
        <button
          className="waves-effect waves-light btn-large brown darken-4"
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => setWordFilter('food') }
        >
          <span
            className="btn-explore-text"
          >
          Food
          </span>
        </button>
        <button
          className="waves-effect waves-light btn-large lime darken-2"
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setWordFilter('drink') }
        >
          <span
            className="btn-explore-text"
          >
          Drinks
          </span>
        </button>
      </div>
      {
        storeDoneRecipe !== undefined
        && storeDoneRecipe
          .filter((val) => {
            if (wordFilter !== '') {
              return val.type === wordFilter;
            }
            return val;
          })
          .map((item, index) => (
            <section key={ index }>
              <button
                type="button"
                src={ item.image }
                data-testid={ `${index}-horizontal-image` }
                onClick={ () => redirectToRecipe(item.type, item.id) }
              >
                <img
                  src={ item.image }
                  alt="description"
                  style={ { width: '200px' } }
                />
              </button>
              <p data-testid={ `${index}-horizontal-top-text` }>
                <span>{item.nationality}</span>
                {' - '}
                <span>{item.alcoholicOrNot || item.category}</span>
              </p>
              <Link
                data-testid={ `${index}-horizontal-name` }
                to={ `${item.type}s/${item.id}` }
              >
                {item.name}
              </Link>
              <p data-testid={ `${index}-horizontal-done-date` }>{item.doneDate}</p>
              {
                verify
                && <p>Link copied!</p>
              }
              <button
                type="button"
                data-testid={ `${index}-horizontal-share-btn` }
                src="src/images/shareIcon.svg"
                onClick={ () => functionShare(item.type, item.id) }
              >
                <img src={ shareIcon } alt="shareIcon" />
              </button>
              {
                item.tags !== undefined
                && item.tags.map((tag, ind) => (
                  <p
                    key={ ind }
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                  >
                    {tag}
                  </p>
                ))
              }
            </section>
          ))
      }
      <div className="mockup-done">
        {
          drinksArray.length > 0 &&
          <RecipesCardDrink
          idDrink={ drinksArray[12].idDrink }
          strDrink={ drinksArray[12].strDrink }
          strDrinkThumb={ drinksArray[12].strDrinkThumb }
          index={ 0 }
        />
        }
        {
          mealsArray.length > 0 &&
          <RecipesCardFood
          idMeal={ mealsArray[8].idMeal }
          strMeal={ mealsArray[8].strMeal }
          strMealThumb={ mealsArray[8].strMealThumb }
          index={ 0 }
        />
        }
      </div>
      <LowerMenu />
    </div>
  );
}

export default RecipesDone;
