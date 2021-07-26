import React from 'react'
import Content from './Content'
import Header from './Header'
import Total from './Total'

const Course = (props) => {
  return (
    <div>
      <Header courseName={props.course.name}/>
      <Content courseParts={props.course.parts}/>
      <Total courseParts={props.course.parts}/>
    </div>
  )
}

export default Course