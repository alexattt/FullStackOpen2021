/* eslint-disable default-case */
const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      let goodAmount = state.good
      const gState = {
        good: goodAmount + 1,
        ok: state.ok,
        bad: state.bad
      }
      return gState
    case 'OK':
      let okAmount = state.ok
      const okState = {
        good: state.good,
        ok: okAmount + 1,
        bad: state.bad
      }
      return okState
    case 'BAD':
      let badAmount = state.bad
      const bState = {
        good: state.good,
        ok: state.ok,
        bad: badAmount + 1
      }
      return bState
    case 'ZERO':
      const zeroState = {
        good: 0,
        ok: 0,
        bad: 0
      }
      return zeroState
  }
  return state
}

export default counterReducer