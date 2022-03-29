import React from 'react';
import PropTypes from 'prop-types';

export default function ButtonCategory({ strCategory, index, func }) {
  return (
    <button
      id={ strCategory }
      type="submit"
      key={ index }
      data-testid={ `${strCategory}-category-filter` }
      onClick={ func }
      className="waves-effect waves-light btn deep-orange accent-2 btn-header"
    >
      { strCategory }
    </button>
  );
}

ButtonCategory.propTypes = {
  strCategory: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  func: PropTypes.func.isRequired,
};
