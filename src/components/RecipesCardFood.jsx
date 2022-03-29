import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function RecipesCardFood({ idMeal, strMeal, strMealThumb, index }) {

  return (
    <div className="card-container">
      <div className="card">
        <Link
          to={ `/foods/${idMeal}` }
        >
          <div className="card-image">
            <img
              className="food-img"
              data-testid={ `${index}-card-img` }
              src={ strMealThumb }
              alt={ strMeal }
            />
          </div>
          <div className="card-content red darken-4">
            <span
              className="card-title white-text darken-4"
              data-testid={ `${index}-card-name` }
            >
              { strMeal }
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

RecipesCardFood.propTypes = {
  idMeal: PropTypes.string.isRequired,
  strMeal: PropTypes.string.isRequired,
  strMealThumb: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipesCardFood;
