import { SET } from '../action/types'

const initialState = {
  sidebarShow: true,
  sidebarUnfoldable: false,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET:
      return { ...state, sidebarShow: '' }
    default:
      return state
  }
}
