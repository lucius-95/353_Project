import { GET_TEAM, TEAM_ERROR } from '../action/types'

const initialState = {
  team: {},
}

export default function (state = initialState, action) {
  switch (action.type) {
    case TEAM_ERROR:
      return state
    case GET_TEAM:
      return { ...state, team: action.payload }
    default:
      return state
  }
}
