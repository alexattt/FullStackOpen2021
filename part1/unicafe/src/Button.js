import React from 'react'

const Button = ({className, handleRating, text }) => {
   return (
    <button className={className} onClick={handleRating}>
      {text}
    </button>
  )
}

export default Button