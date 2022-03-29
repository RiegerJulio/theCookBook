import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function RecipesCardDrink({ idDrink, strDrink, strDrinkThumb, index }) {

  return (
    <div className="card-container">
      <div className="card">
        <Link
          to={ `/drinks/${idDrink}` }
        >
          <div className="card-image">
            <img
              className="food-img"
              data-testid={ `${index}-card-img` }
              src={ strDrinkThumb }
              alt={ strDrink }
            />
          </div>
          <div className="card-content lime darken-2">
            <span
              className="card-title white-text darken-4"
              data-testid={ `${index}-card-name` }
            >
              { strDrink }
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

RecipesCardDrink.propTypes = {
  idDrink: PropTypes.string.isRequired,
  strDrink: PropTypes.string.isRequired,
  strDrinkThumb: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipesCardDrink;
