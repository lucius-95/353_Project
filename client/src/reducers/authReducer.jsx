import isEmpty from '../validation/isEmpty'
import { REGISTER_USER, SET_CURRENT_USER } from '../action/types'

const initialState = {
  isAuthenticated: false,
  user: {},
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      }
    case REGISTER_USER:
      return state
    default:
      return state
  }
}
