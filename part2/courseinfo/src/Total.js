import React from 'react'

const Total = ({courseParts}) => {
  let exerciseArray = courseParts.map(courseParts => courseParts.exercises)
  const total = exerciseArray.reduce((s, p) => {
    return s + p
  })
  return (
    <div>
      <p>
        Number of exercises {total}
      </p>
    </div>
  )
}

export default Total