import React from 'react'
import Part from './Part'

const Content = ({courseParts}) => {
  return (
    <div>
      {courseParts.map(coursePart => 
          <Part
            key={coursePart.id}
            part={coursePart.name}
            exercises={coursePart.exercises}
          />
      )}
    </div>
  )
}

export default Content