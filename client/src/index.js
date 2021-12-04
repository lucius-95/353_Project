import 'react-app-polyfill/stable'
import 'core-js'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import store from './store'
import setAuthToken from './validation/setAuthToken'
import jwt_decode from 'jwt-decode'
import { logoutUser, setCurrentUser } from './action/authAction'
import { clearCurrentProfile } from './action/profileAction'

if (localStorage.jwtToken) {
  // set auth token header auth
  setAuthToken(localStorage.jwtToken)
  // decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken)
  // set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded))
  // check for expired token
  store.dispatch(clearCurrentProfile)

  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
    // logout user
    store.dispatch(logoutUser())
    // clear current Profile
    store.dispatch(clearCurrentProfile)
    // redirect to login
    window.location.href = '/login'
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
