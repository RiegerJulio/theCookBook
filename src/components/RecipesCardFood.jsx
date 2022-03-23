import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const THREE = 3;

function RecipesCardFood({ idMeal, strMeal, strMealThumb, index }) {
  // const history = useHistory();

  // const sendInfo = () => {
  //   history.push(`/foods/${idMeal}`);
  // };

  return (
    <div className="card-container">
      <div className="card">
        <Link
          to={ `/foods/${idMeal}` }
        >
          {/* <button
          className="card"
          type="button"
          data-testid={ `${index}-recipe-card` }
          key={ idMeal }
          onClick={ sendInfo }
          src={ strMealThumb }
        > */}
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
              { strMeal.split(' ').splice(0, THREE).join(' ') }
            </span>
          </div>
          {/* </button> */}
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
