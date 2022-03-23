import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from '../Context/MyContext';
import { HiShare } from 'react-icons/hi';
import IngredientsList from './IngredientsList';
import { Link, useHistory } from 'react-router-dom'
import { setLocalStorage } from '../services/localStorage';

export default function InProgressDrinkComponent(props) {
  const history = useHistory();
  const [verifyLink, setVerifyLink] = useState(false);
  const shareFunc = () => {
    setVerifyLink(!verifyLink);
    copy(`http://localhost:3000${history.location.pathname}`);
  };

  const {
    index,
    strDrink,
    strDrinkThumb,
    strCategory,
    strInstructions,
    iconFav,
    onClickFav,
  } = props;

  const {
    itemRecovered,
    // setItemRecovered,
  } = useContext(MyContext);
  // console.log(itemRecovered);

  const onButtonClickFinish = () => {
    const { history } = props;
    setLocalStorage('doneRecipes', doneRecipes);
    history.push('/done-recipes');
  };

  //   a chave doneRecipes deve conter a seguinte estrutura:
  // [{
  //     id: id-da-receita,
  //     type: comida-ou-bebida,
  //     nationality: nacionalidade-da-receita-ou-texto-vazio,
  //     category: categoria-da-receita-ou-texto-vazio,
  //     alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
  //     name: nome-da-receita,
  //     image: imagem-da-receita,
  //     doneDate: quando-a-receita-foi-concluida,
  //     tags: array-de-tags-da-receita-ou-array-vazio
  // }]

  return (
    <section key={ index }>
      <img
        className="img-recipe"
        src={ strDrinkThumb }
        alt="food"
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title" className="header-title">{strDrink}</h1>
<div className="actions-container">
        <Link
          to="#t"
          data-testid="share-btn"
          onClick={ shareFunc }
        >
          <HiShare size={ 40 } color="ffffff" />
        </Link>
        <Link
          to="#t"
          src={ iconFav }
          onClick={ onClickFav }
        >
          <img
            className="heart-outline"
            src={ iconFav }
            alt="icon fav"
            data-testid="favorite-btn"
          />
        </Link>
      </div>
      { verifyLink && (
        <p className="copy-info">Link copied!</p>
      )}
      <h5
        className="category"
        data-testid="recipe-category"
      >
        {strCategory}
      </h5>
      <div className="instructions-container">
      <h5 className="category" data-testid="recipe-category">Ingredients</h5>
        <IngredientsList itemRecovered={ itemRecovered } />
        <p
          className="instructions instructions-progress"
          data-testid="instructions"
        >
          { strInstructions }
        </p>
      </div>
      {
        <Link
          to="/end-message"
          // disabled={ doneRecipe }
          data-testid="finish-recipe-btn"
          type="button"
          className="start-btn waves-effect waves-light btn-large red darken-4"
          // className="button-finish-recipe"
          // onClick={ () => onButtonClickFinish }
        >
          End Recipe
        </Link>
      }
    </section>
  );
}

InProgressDrinkComponent.propTypes = {
  index: PropTypes.string,
  strDrink: PropTypes.string,
  strDrinkThumb: PropTypes.string,
  strCategory: PropTypes.string,
  strInstructions: PropTypes.string,

}.isRequired;
