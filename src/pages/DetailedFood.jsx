import React, { useEffect, useContext } from 'react';
import M from 'materialize-css';
import { useHistory, useParams } from 'react-router-dom';
import RecipesCardDrink from '../components/RecipesCardDrink';
import Header from '../components/Header';

import { fetchMealDetailsId } from '../services/fetchApi';

import MyContext from '../Context/MyContext';
import DetailedFoodComponent from '../components/DetailedFoodComponent';
import DetailedFoodParagraph from '../components/DetailedFoodParagraph';

import whiteHeartIcon from '../images/whiteHeartIcon.png';
import blackHeartIcon from '../images/blackHeartIcon.png';

import './css/detailsFoodsAndDrinks.css';
import headerLogo from '../images/header-logo.png';

import { getLocalStorage } from '../services/localStorage';
import LowerMenu from '../components/LowerMenu';

const SIX = 6;

export default function DetailedFood() {
  const {
    drinksArray,
    requestApiDrinks,
    itemRecovered,
    setItemRecovered,
    verify,
    btnValue,
    verifyStart,
    testInprogressRecipesMeals,
    testDoneRecipes,
    favFuncMeal,
    imageFav,
    setImageFav,
  } = useContext(MyContext);

  const history = useHistory();
  const { id } = useParams();

  const testeFavorite = () => {
    const getLocalFav = getLocalStorage('favoriteRecipes');
    if (getLocalFav) {
      if (getLocalFav.some((a) => a.id === id)) {
        setImageFav(blackHeartIcon);
      } else {
        setImageFav(whiteHeartIcon);
      }
    }
  };

  const recoverData = async () => {
    const recoverFetch = await fetchMealDetailsId(id);
    setItemRecovered([recoverFetch]);
    requestApiDrinks();
    testDoneRecipes(id);
    testInprogressRecipesMeals(id);
    testeFavorite();
  };

  useEffect(() => {
    recoverData();
    setTimeout(() => {
      const elem = document.querySelector('.carousel');
      const instance = M.Carousel.init(elem, {});
      if (document.querySelector('.photos').classList) {
        document.querySelector('.photos').classList.remove('spinner');
      }
      console.log(instance);
    // eslint-disable-next-line no-magic-numbers
    }, 1000);
  }, []);

  const redirectPageFood = () => {
    history.push(`/foods/${id}/in-progress`);
  };

  return (
    <div>
      <div className="header-container">
        <Header title="Explore" />
        <img src={ headerLogo } alt="header logo" className="header-logo" />
        <div className="white-space"/>
      </div>
      {
        itemRecovered.length === 1
          ? (
            <DetailedFoodComponent
              key={ itemRecovered[0] }
              index={ itemRecovered[0] }
              strMeal={ itemRecovered[0].strMeal }
              strMealThumb={ itemRecovered[0].strMealThumb }
              strCategory={ itemRecovered[0].strCategory }
              strInstructions={ itemRecovered[0].strInstructions }
              strYoutube={ itemRecovered[0].strYoutube }
              // onClickShare={ shareFunc }
              onClickFav={ () => favFuncMeal(id) }
              iconFav={ imageFav }
            />)
          : (
            <DetailedFoodComponent
              key=""
              index=""
              strMeal=""
              strMealThumb=""
              strCategory=""
              strInstructions=""
              strYoutube=""
              // onClickShare={ shareFunc }
              // onClickFav={ favFunc }
              iconFav={ imageFav }
            />
          )
      }
      <h5 className="category" data-testid="recipe-category">Ingredients</h5>
      <div className="ingredients-container">
        {
          verify().map((it, index) => (
            <DetailedFoodParagraph
              key={ index }
              index={ index }
              it={ it }
              itemRecovered={ itemRecovered.length === 1 ? itemRecovered : '' }
            />
          ))
        }
      </div>
      <h5 className="category" data-testid="recipe-category">Try With</h5>
      {/* <div className="carousel-container"> */}
      <div className="carousel carousel-container">
        {
          drinksArray.length > 0
            && drinksArray
              .map((drink, index) => (
                <div
                  className="carousel-item"
                  key={ index }
                  data-testid={ `${index}-recomendation-title` }
                >
                  <div key={ index } data-testid={ `${index}-recomendation-card` }>
                    <RecipesCardDrink
                      idDrink={ drink.idDrink }
                      strDrink={ drink.strDrink }
                      strDrinkThumb={ drink.strDrinkThumb }
                      index={ index }
                    />
                  </div>
                </div>
              ))
              .slice(0, SIX)
        }
      </div>
      { verifyStart && (
        <button
          className="start-btn waves-effect waves-light btn-large red darken-4"
          type="button"
          data-testid="start-recipe-btn"
          onClick={ redirectPageFood }
        >
          { btnValue }
        </button>
      )}
      {/* {verifyProgress && (
        <button
          type="button"
          data-testid="start-recipe-btn"
          style={ { position: 'fixed', bottom: '0px' } }
        >
          Continue Recipe
        </button>
      )} */}
      <LowerMenu />
    </div>
  );
}
