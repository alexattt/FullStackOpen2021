import React from 'react'

const ErrorMessage = ({ errorMessage }) => {
  if (errorMessage === null) {
      return null
  }

  return (
      <div className="error-message">
        {errorMessage}
      </div>
  )
} 

export default ErrorMessage