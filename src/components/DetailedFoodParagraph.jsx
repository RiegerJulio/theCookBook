import React from 'react';

import PropTypes from 'prop-types';

export default function DetailedFoodParagraph(props) {
  const { index, it, itemRecovered } = props;

  return (
    <p key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
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

DetailedFoodParagraph.propTypes = {
  index: PropTypes.number,
  it: PropTypes.string,
  itemRecovered: PropTypes.string,
}.isRequired;
