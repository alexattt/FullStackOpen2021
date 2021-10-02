import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote, addNotification } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const add = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(addAnecdote(content))

    dispatch(addNotification(`You added a new joke: ${content}`))
    setTimeout(() => {
      dispatch(addNotification(null))
    }, 5000)
  }

  return (
    <form onSubmit={add}>
      <div><input name="anecdote"/></div>
      <button>Create</button>
    </form>
  )
}

export default AnecdoteForm