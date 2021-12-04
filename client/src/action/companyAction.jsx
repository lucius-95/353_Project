import axios from 'axios'
import {
  DELETE_COMPANY,
  GET_COMPANIES,
  GET_CURRENT_COMPANY,
  GET_ERRORS,
  LOADING_COMPANY,
  SET_CURRENT_USER,
  GET_CURRENT_COMPANY_BYSTAFF,
} from './types'

//create company

export const createCompany = (data, history) => (dispatch) => {
  axios
    .post('/service/v1/company/', data)
    .then((result) => {
      history.push('/dashboard')
    })
    .catch((error) => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data,
      })
    })
}

// get Company
export const getCompanies = () => (dispatch) => {
  axios
    .get('/service/v1/company/all')
    .then((companies) =>
      dispatch({
        type: GET_COMPANIES,
        payload: companies.data,
      }),
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }),
    )
}

// get company with auth owner
export const getCurrentCompany = () => (dispatch) => {
  dispatch(setCompanyLoading())
  axios
    .get('/service/v1/company/')
    .then((result) =>
      dispatch({
        type: GET_CURRENT_COMPANY,
        payload: result.data,
      }),
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }),
    )
} // get company with auth staff
export const getCurrentCompanyByStaff = () => (dispatch) => {
  dispatch(setCompanyLoading())
  axios.get('/service/v1/company/staff').then(
    (result) =>
      dispatch({
        type: GET_CURRENT_COMPANY_BYSTAFF,
        payload: result.data,
      }),
    (errors) =>
      dispatch({
        type: GET_ERRORS,
        payload: errors.response.data,
      }),
  )
}

export const donate = (data) => (dispatch) => {
  if (window.confirm(`Are you sure you want to donate $${data.amount} to organization?`)) {
    axios
      .post('/service/v1/company/donate', data)
      .then((company) => {
        alert('donated!')
        dispatch({
          type: GET_CURRENT_COMPANY,
          payload: company.data,
        })
      })
      .catch((err) =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        }),
      )
  }
}

// get company with id
export const getCurrentCompanyById = (_id) => (dispatch) => {
  dispatch(setCompanyLoading())
  axios
    .get(`/service/v1/company/${_id}`)
    .then((result) =>
      dispatch({
        type: GET_CURRENT_COMPANY,
        payload: result.data,
      }),
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }),
    )
}

//delete company
export const deleteCompany = (history) => (dispatch) => {
  if (window.confirm('Are you sure you want to delete your Company')) {
    axios
      .delete('/service/v1/company/')
      .then((result) => {
        dispatch({
          type: DELETE_COMPANY,
        })
        window.location.reload()
      })
      .catch((err) =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        }),
      )
  }
}

export const removeStaff = (id) => (dispatch) => {
  if (window.confirm('Are you sure you want to remove your staff ?')) {
    // console.log(id)
    axios
      .put(`/service/v1/company/${id}`)
      .then((result) => {
        console.log(result)
        window.location.reload()
      })
      .catch((err) =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        }),
      )
  }
}
// Company loading
export const setCompanyLoading = () => {
  return {
    type: LOADING_COMPANY,
  }
}
