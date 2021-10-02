const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_JOKE_FILTER':
      return action.filter
    default:
      return state
  }
}

export const filterChange = filter => {
  return {
    type: 'SET_JOKE_FILTER',
    filter
  }
}

export default filterReducer