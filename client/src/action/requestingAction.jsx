import axios from 'axios'
import { REQUESTINGS_LOADING, GET_ERRORS, GET_REQUESTINGS_SUCESS } from './types'

export const createStaffRequest = (data) => (dispatch) => {
  axios
    .post('/service/v1/requesting', data)
    .then((res) => {
      if (res.data) {
        alert('request has been sent to Organization')
      }
      console.log(res.data)
      // res.data
    })
    .catch((errors) =>
      dispatch({
        type: GET_ERRORS,
        payload: errors.response.data,
      }),
    )
}

export const getAllRequests = () => (dispatch) => {
  dispatch(requestingLoading())
  axios
    .get('/service/v1/requesting')
    .then((requests) =>
      dispatch({
        type: GET_REQUESTINGS_SUCESS,
        payload: requests.data,
      }),
    )
    .catch((errors) =>
      dispatch({
        type: GET_ERRORS,
        payload: errors.response.data,
      }),
    )
}
export const acceptRequest = (id) => (dispatch) => {
  axios
    .post(`/service/v1/requesting/acceptrequest/${id}`)
    .then((result) => {
      alert('Accepted application')
      console.log(result)
      window.location.reload()
    })
    .catch()
}
export const denyRequest = (id) => (dispatch) => {
  axios
    .post(`/service/v1/requesting/denyrequest/${id}`)
    .then((result) => {
      alert('Denied application')
      console.log(result)
      window.location.reload()
    })
    .catch()
}

// bookingLoading loading
export const requestingLoading = () => {
  return {
    type: REQUESTINGS_LOADING,
  }
}
