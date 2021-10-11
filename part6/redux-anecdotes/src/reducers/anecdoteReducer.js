import anecdoteService from '../services/anecdotes'

export const getId = () => (100000 * Math.random()).toFixed(0)

// export const voteForJoke = (id) => {
//   return {
//     type: 'LIKE_ANECDOTE',
//     data: { id }
//   }
// }

export const voteForJoke = (id, content, votes) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.voteForAnecdote(id, content, votes)
    console.log(newAnecdote)
    dispatch({
      type: 'LIKE_ANECDOTE',
      data: { id }
    })
  }
}

export const addAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    console.log(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const voteNotification = (message) => {
  return {
    type: 'SET_NOTIFICATION',
    message
  }
}

export const addNotification = (message) => {
  return {
    type: 'SET_NOTIFICATION',
    message
  }
}

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

//const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'INIT_ANECDOTES':
      return action.data
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'LIKE_ANECDOTE':
      const id = action.data.id
      const toLike = state.find(a => a.id === id)
      const likedAnecdote = { 
        ...toLike, 
        votes: toLike.votes + 1
      }
      state.sort(function(a, b) {
        return b.votes - a.votes;
      })
      return state.map(joke =>
        joke.id !== id ? joke : likedAnecdote 
      )
    default:
      return state
  }
}

export default anecdoteReducer