import React from 'react'
import ReactDOM from 'react-dom'
import { combineReducers } from 'redux'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import App from './App'

import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notifications: notificationReducer,
  filter: filterReducer
})

const store = createStore(
  reducer,
  composeWithDevTools()
)

console.log(store.getState())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)