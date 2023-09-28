import React from 'react'
import PropTypes from 'prop-types';

function Button({ onClick, text, className }) {
  return (
    <button onClick={onClick} className={className}>
      {text}
    </button>
  )
}

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    className: PropTypes.string,
}

export default Button
