import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import { getLocalStorage, setLocalStorage } from '../services/localStorage';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import RecipesCardDrink from '../components/RecipesCardDrink';
import RecipesCardFood from '../components/RecipesCardFood';

import headerLogo from '../images/header-logo.png';
import LowerMenu from '../components/LowerMenu';
import MyContext from '../Context/MyContext';
const copy = require('clipboard-copy');

function FavoritesRecipes() {
  const [storeFavoriteRecipes, setStoreFavoriteRecipes] = useState([]);
  const [verify, setVerify] = useState(false);
  const [wordFilter, setWordFilter] = useState('');
  const history = useHistory();
  const {mealsArray, drinksArray} = useContext(MyContext);

  const myFunc = async () => {
    const getFavoriteRecipes = await getLocalStorage('favoriteRecipes');
    return getFavoriteRecipes !== null
      && setStoreFavoriteRecipes([...getFavoriteRecipes]);
  };

  useEffect(() => {
    myFunc();
  }, []);

  const functionShare = (item, id) => {
    copy(`http://localhost:3000/${item}s/${id}`);
    setVerify(!verify);
  };

  const redirectToRecipe = (id, type) => {
    history.push(`/${type}s/${id}`);
  };

  const favorDisfavorButton = (index) => {
    const disfavor = storeFavoriteRecipes.filter((a, ind) => ind !== index);
    setStoreFavoriteRecipes([...disfavor]);
    setLocalStorage('favoriteRecipes', disfavor);
  };

  return (
    <div>
      <div className="header-container">
        <Header/>
        <img src={ headerLogo } alt="header logo" className="header-logo" />
        <div className="white-space"/>
      </div>
      <h1 data-testid="page-title" className="header-title">Favorite Recipes</h1>
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
        (storeFavoriteRecipes !== undefined && storeFavoriteRecipes.length > 0)
        && storeFavoriteRecipes
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
                onClick={ () => redirectToRecipe(item.id, item.type) }
                src={ item.image }
              >
                <img
                  src={ item.image }
                  alt="description"
                  style={ { width: '200px' } }
                  data-testid={ `${index}-horizontal-image` }
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
              <button
                type="button"
                data-testid={ `${index}-horizontal-share-btn` }
                src="src/images/shareIcon.svg"
                onClick={ () => functionShare(item.type, item.id) }
              >
                <img src={ shareIcon } alt="shareIcon" />
              </button>
              {
                verify
                && <p>Link copied!</p>
              }
              <button
                type="button"
                data-testid={ `${index}-horizontal-favorite-btn` }
                src="src/images/blackHeartIcon.svg"
                onClick={ () => favorDisfavorButton(index) }
              >
                <img src={ blackHeartIcon } alt="favoriteIcon" />
              </button>
            </section>
          ))
      }
            <div className="mockup-done">
        {
          drinksArray.length > 0 &&
          <RecipesCardDrink
          idDrink={ drinksArray[19].idDrink }
          strDrink={ drinksArray[19].strDrink }
          strDrinkThumb={ drinksArray[19].strDrinkThumb }
          index={ 0 }
        />
        }
        {
          mealsArray.length > 0 &&
          <RecipesCardFood
          idMeal={ mealsArray[21].idMeal }
          strMeal={ mealsArray[21].strMeal }
          strMealThumb={ mealsArray[21].strMealThumb }
          index={ 0 }
        />
        }
      </div>
      <LowerMenu />
    </div>
  );
}

export default FavoritesRecipes;
