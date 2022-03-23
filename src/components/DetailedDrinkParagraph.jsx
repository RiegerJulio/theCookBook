import React from 'react';

import PropTypes from 'prop-types';

export default function DetailedDrinkParagraph(props) {
  const { index, it, itemRecovered } = props;

  return (
    <p
      className="ingredients-list"
      key={ index }
      data-testid={ `${index}-ingredient-name-and-measure` }
    >
      {index + 1}
      {' '}
      -
      {' '}
      {it[1]}
      <span>
        {' '}
        {itemRecovered[0][`strMeasure${index + 1}`]}
      </span>
    </p>
  );
}

DetailedDrinkParagraph.propTypes = {
  index: PropTypes.number,
  it: PropTypes.string,
  itemRecovered: PropTypes.string,
}.isRequired;
