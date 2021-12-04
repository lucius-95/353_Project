import {
  CREATE_COMPANY,
  DELETE_COMPANY,
  GET_COMPANIES,
  GET_CURRENT_COMPANY,
  LOADING_COMPANY,
  GET_CURRENT_COMPANY_BYSTAFF,
} from '../action/types'

const initialState = {
  company: null,
  loading: false,
  companies: null,
  companyByStaff: null,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_COMPANY:
      return { ...state, company: action.payload, loading: false }
    //this call by owner
    case GET_CURRENT_COMPANY:
      return { ...state, company: action.payload, loading: false }
    //this call global by any users
    case GET_COMPANIES:
      return { ...state, loading: false, companies: action.payload }
    // loading state
    case LOADING_COMPANY:
      return { loading: true }
    // this call by owner
    case DELETE_COMPANY:
      return { ...state, loading: false, company: null }
    // this call by staff
    case GET_CURRENT_COMPANY_BYSTAFF:
      return {
        ...state,
        loading: false,
        company: null,
        companies: null,
        companyByStaff: action.payload,
      }
    default:
      return state
  }
}
