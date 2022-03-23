import React from 'react';
// import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const THREE = 3;

function RecipesCardDrink({ idDrink, strDrink, strDrinkThumb, index }) {
  // const history = useHistory();

  // const sendInfo = () => {
  //   history.push(`/drinks/${idDrink}`);
  // };

  return (
    <div className="card-container">
      <div className="card">
        <Link
          to={ `/drinks/${idDrink}` }
        >
          {/* <button
            type="button"
            data-testid={ `${index}-recipe-card` }
            key={ idDrink }
            onClick={ sendInfo }
            src={ strDrinkThumb }
          > */}
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
              { strDrink.split(' ').splice(0, THREE).join(' ') }
            </span>
          </div>
          {/* </button> */}
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
