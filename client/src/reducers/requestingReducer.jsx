import { GET_REQUESTINGS_SUCESS, GET_REQUESTINGS_FAIL, REQUESTINGS_LOADING } from '../action/types'

const initialState = {
  requests: null,
  loading: false,
  request: null,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_REQUESTINGS_SUCESS:
      return { ...state, requests: action.payload, loading: false }
    case REQUESTINGS_LOADING:
      return { ...state, loading: true }
    case GET_REQUESTINGS_FAIL:
      return { ...state, requests: null, loading: false }
    default:
      return state
  }
}
