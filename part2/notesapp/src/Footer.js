import React from 'react'

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }

  return (
    <div style={footerStyle}>
      <br />
      <em>Note app Full Stack Open MOOC, University of Helsinki 2021</em>
    </div>
  )
}

export default Footer