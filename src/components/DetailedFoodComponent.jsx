import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { HiShare } from 'react-icons/hi';
import Youtube from './Youtube';

const copy = require('clipboard-copy');

export default function DetailedFoodComponent(props) {
  const history = useHistory();
  const [verifyLink, setVerifyLink] = useState(false);
  const shareFunc = () => {
    setVerifyLink(!verifyLink);
    copy(`http://localhost:3000${history.location.pathname}`);
  };

  const {
    index,
    strMeal,
    strMealThumb,
    strCategory,
    strInstructions,
    strYoutube,
    iconFav,
    onClickFav,
  } = props;

  return (
    <section key={ index }>
      <h1
        data-testid="page-title"
        className="header-title"
      >
        { strMeal !== null ? strMeal : '' }
      </h1>
      <img
        className="img-recipe"
        src={ strMealThumb !== null ? strMealThumb : '' }
        alt="food"
        data-testid="recipe-photo"
      />
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
      <div className="youtube-box" data-testid="video">
        <Youtube video={ strYoutube !== undefined ? strYoutube.split('=')[1] : null } />
      </div>
    </section>
  );
}

DetailedFoodComponent.propTypes = {
  index: PropTypes.string,
  strMeal: PropTypes.string,
  strMealThumb: PropTypes.string,
  strCategory: PropTypes.string,
  strInstructions: PropTypes.string,
  strYoutube: PropTypes.shape({
    split: PropTypes.func,
  }),
}.isRequired;
