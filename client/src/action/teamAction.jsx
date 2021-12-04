import axios from 'axios'
import { GET_TEAM, TEAM_ERROR } from './types'

export const getTeam = () => (dispatch) => {
  axios
    .get('/service/v1/team')
    .then((result) => {
      dispatch({ type: GET_TEAM, payload: result.data })
    })
    .catch((error) => {
      dispatch({ type: TEAM_ERROR, payload: error.response.data })
    })
}
