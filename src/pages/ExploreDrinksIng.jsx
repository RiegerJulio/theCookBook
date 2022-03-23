/* eslint-disable no-var */
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';
import MyContext from '../Context/MyContext';

import headerLogo from '../images/header-logo.png';
import './css/explore.css';

import { fetchDrinkIngredients, fetchDrinksIngredientName } from '../services/fetchApi';

export default function ExploreFoodsIng() {
  const [initialIngredients, setInitialIngredients] = useState([]);
  const { setDrinksArray } = useContext(MyContext);

  const MAX_INGREDIENTS = 12;

  const requestIngredients = async () => {
    const ingredients = await fetchDrinkIngredients();
    console.log(ingredients);
    setInitialIngredients(ingredients);
    console.log(initialIngredients);
  };

  // const history = useHistory();

  const handleClick = async (ing) => {
    const response = await fetchDrinksIngredientName(ing);
    setDrinksArray(response);
    // history.push('/foods');
  };

  useEffect(() => {
    setTimeout(() => {
      const elem = document.querySelector('.carousel');
      const instance = M.Carousel.init(elem, {});
      if (document.querySelector('.photos').classList) {
        document.querySelector('.photos').classList.remove('spinner');
      }
      console.log(instance);
    // eslint-disable-next-line no-magic-numbers
    }, 1000);
    requestIngredients();
  }, []);

  return (
    <div className="explore-container">
      <div className="header-container">
        <Header title="Explore" />
        <img src={ headerLogo } alt="header logo" className="header-logo" />
        <div className="white-space"/>
      </div>
      <h1 data-testid="page-title" className="header-title">Choose Ingredient</h1>
      <div className="carousel carousel-ing">
        {initialIngredients
          .map((ingredient, index) => (
            <Link
              key={ ingredient.strIngredient1 }
              className="carousel-item"
              to="/drinks"
              data-testid={ `${index}-ingredient-card` }
              onClick={ () => handleClick(ingredient.strIngredient1) }
            >
              <img
                data-testid={ `${index}-card-img` }
                src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}.png` }
                alt={ ingredient.strIngredient1 }
              />
              <p className="food-name" data-testid={ `${index}-card-name` }>
                {ingredient.strIngredient1}
              </p>
            </Link>
          ))
          .slice(0, MAX_INGREDIENTS)}
      </div>
      <LowerMenu />
    </div>
  );
}
