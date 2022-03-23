import React from 'react';
import PropTypes from 'prop-types';

export default function ButtonHeader({ onClick, testId, srcButton, alt, srcImage }) {
  return (
    <button
      type="button"
      onClick={ onClick }
      data-testid={ testId }
      src={ srcButton }
    >
      <img
        alt={ alt }
        src={ srcImage }
      />
    </button>
  );
}

ButtonHeader.propTypes = {
  onClick: PropTypes.string,
  testId: PropTypes.string,
  srcButton: PropTypes.string,
  alt: PropTypes.string,
  srcImage: PropTypes.string,
}.isRequired;
