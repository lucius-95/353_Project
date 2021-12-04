import { CLEAR_CURRENT_PROFILE, GET_PROFILE, PROFILE_LOADING, GET_PROFILES } from '../action/types'

const initialState = {
  profile: null,
  loading: false,
  profiles: null,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return { ...state, profile: action.payload, loading: false }
    case PROFILE_LOADING:
      return { loading: true }
    case GET_PROFILES:
      return { ...state, profiles: action.payload, loading: false }
    case CLEAR_CURRENT_PROFILE:
      return {
        profile: null,
        loading: false,
      }

    default:
      return state
  }
}
