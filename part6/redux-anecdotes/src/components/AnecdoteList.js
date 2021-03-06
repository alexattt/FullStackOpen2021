import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteForJoke, voteNotification } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter.length > 0) {
      return anecdotes.filter(
        anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase())
      )
    }
    return anecdotes.sort(function(a, b) {
      return b.votes - a.votes;
    })
  })


  const vote = (id, content, votes) => {
    //console.log('vote', id)
    dispatch(voteForJoke(id, content, votes))
    
    dispatch(voteNotification(`You voted for ${content}`))
    setTimeout(() => {
      dispatch(voteNotification(null))
    }, 5000)
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
            <button onClick={() => vote(anecdote.id, anecdote.content, anecdote.votes)}>Vote</button>
          </div>
        </div>
      )}
    </ul>
  )
}

export default AnecdoteList