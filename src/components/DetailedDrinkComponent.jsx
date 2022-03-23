import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { HiShare } from 'react-icons/hi';

const copy = require('clipboard-copy');

export default function DetailedDrinkComponent(props) {
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
    // onClickShare,
    onClickFav,
    iconFav,
  } = props;

  return (
    <section key={ index }>
      <h1
        data-testid="recipe-title"
        className="header-title"
      >
        { strDrink !== null ? strDrink : ''}
      </h1>
      <img
        className="img-recipe"
        src={ strDrinkThumb !== null ? strDrinkThumb : '' }
        alt="drink"
        data-testid="recipe-photo"
      />
      <div className="actions-container">
        <Link
          to="#p"
          data-testid="share-btn"
          onClick={ shareFunc }
        >
          <HiShare size={ 40 } color="ffffff" />
        </Link>
        <Link
          to="#p"
          onClick={ onClickFav }
          src={ iconFav }
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
        {`#${strCategory !== null ? strCategory : ''}`}
      </h5>
      <div className="instructions-container">
        <h5 className="category" data-testid="recipe-category">Preparation</h5>
        <p
          className="instructions"
          data-testid="instructions"
        >
          {strInstructions !== null ? strInstructions : '' }
        </p>
      </div>
    </section>
  );
}

DetailedDrinkComponent.propTypes = {
  index: PropTypes.string,
  drinkMeal: PropTypes.string,
  drinkMealThumb: PropTypes.string,
  drinkCategory: PropTypes.string,
  drinkInstructions: PropTypes.string,
}.isRequired;
