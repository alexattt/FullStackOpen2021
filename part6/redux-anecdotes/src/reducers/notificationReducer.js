const initialNotification = ""

const notificationReducer = (state = initialNotification, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.message
    default:
      return state
  }
}

export const notificationMessage = message => {
  return {
    type: 'SET_NOTIFICATION',
    message
  }
}

export default notificationReducer