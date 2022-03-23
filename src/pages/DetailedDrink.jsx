import React, { useEffect, useContext } from 'react';
import M from 'materialize-css';
import { useHistory, useParams } from 'react-router-dom';
import RecipesCardFood from '../components/RecipesCardFood';
import Header from '../components/Header';

import { fetchDrinkDetailsId } from '../services/fetchApi';

import MyContext from '../Context/MyContext';
import DetailedDrinkComponent from '../components/DetailedDrinkComponent';
import DetailedDrinkParagraph from '../components/DetailedDrinkParagraph';

import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

import './css/detailsFoodsAndDrinks.css';
import headerLogo from '../images/header-logo.png';

import { getLocalStorage } from '../services/localStorage';

import LowerMenu from '../components/LowerMenu';

const SIX = 6;

export default function DetailedDrink() {
  const {
    mealsArray,
    requestApiFoods,
    itemRecovered,
    setItemRecovered,
    verify,
    verifyStart,
    btnValue,
    testDoneRecipes,
    testInprogressRecipesCocktails,
    favFuncDrink,
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
    const recoverFetch = await fetchDrinkDetailsId(id);
    setItemRecovered([recoverFetch]);
    requestApiFoods();
    testDoneRecipes(id);
    testInprogressRecipesCocktails(id);
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

  const redirectPageDrink = () => {
    history.push(`/drinks/${id}/in-progress`);
  };

  const verifyAlcohoolic = (alco, categ) => {
    if (alco === 'Alcoholic') {
      return alco;
    }
    return categ;
  };

  return (
    <div>
      <div className="header-container">
        <Header title="Explore" />
        <img src={ headerLogo } alt="header logo" className="header-logo" />
        <div className="white-space"/>
      </div>
      {
        itemRecovered.length === 1 ? (
          <DetailedDrinkComponent
            key={ itemRecovered[0] }
            index={ itemRecovered[0] }
            strDrink={ itemRecovered[0].strDrink }
            strDrinkThumb={ itemRecovered[0].strDrinkThumb }
            strCategory={ verifyAlcohoolic(itemRecovered[0].strAlcoholic,
              itemRecovered[0].strCategory) }
            strInstructions={ itemRecovered[0].strInstructions }
            // onClickShare={ shareFunc }
            onClickFav={ () => favFuncDrink(id) }
            iconFav={ imageFav }
          />)
          : (
            <DetailedDrinkComponent
              key=""
              index=""
              strDrink=""
              strDrinkThumb=""
              strCategory=""
              strInstructions=""
              // onClickShare={ shareFunc }
              iconFav={ imageFav }
            />
          )
      }
      <h5 className="category" data-testid="recipe-category">Ingredients</h5>
      <div className="ingredients-container">
        {
          verify().map((it, index) => (
            <DetailedDrinkParagraph
              key={ index }
              index={ index }
              it={ it }
              itemRecovered={ itemRecovered.length === 1 ? itemRecovered : '' }
            />
          ))
        }
      </div>
      <h5 className="category" data-testid="recipe-category">Try With</h5>
      <div className="carousel carousel-container">
        {
          mealsArray.length > 0
          && mealsArray
            .map((meal, index) => (
              <div
                className="carousel-item"
                key={ index }
                data-testid={ `${index}-recomendation-title` }
              >
                <div data-testid={ `${index}-recomendation-card` }>
                  <RecipesCardFood
                    idMeal={ meal.idMeal }
                    strMeal={ meal.strMeal }
                    strMealThumb={ meal.strMealThumb }
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
          className="start-btn waves-effect waves-light btn-large lime darken-2"
          type="button"
          data-testid="start-recipe-btn"
          onClick={ redirectPageDrink }
        >
          { btnValue }
        </button>
      )}
      {/* {
        verifyProgress && (
          <button
            type="button"
            data-testid="start-recipe-btn"
            style={ { position: 'fixed', bottom: '0px' } }
          >
            Continue Recipe
          </button>
        )
      } */}
      <LowerMenu />
    </div>
  );
}
