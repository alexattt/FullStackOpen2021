import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteForJoke } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteForJoke(id))
  }

  return (
    <ul>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes} votes
            <button onClick={() => vote(anecdote.id)}>Vote</button>
          </div>
        </div>
      )}
    </ul>
  )
}

export default AnecdoteList