import React from 'react'
import { connect } from 'react-redux'
import { addAnecdote, addNotification } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
  const add = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    props.addAnecdote(content)

    props.addNotification(`You added a new joke: ${content}`)
    setTimeout(() => {
      props.addNotification(null)
    }, 5000)
  }

  return (
    <form onSubmit={add}>
      <div><input name="anecdote"/></div>
      <button>Create</button>
    </form>
  )
}

const mapDispatchToProps  = {
  addAnecdote,
  addNotification
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)