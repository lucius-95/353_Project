import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './scss/style.scss'
import PrivateRoute from './components/common/PrivateRoute'
import CreateProfile from './components/pages/main/profile/CreateProfile'
import Profile from './components/pages/main/profile/Profile'
import Welcome from './components/pages/main/profile/Welcome'
import EditProfile from './components/pages/main/profile/EditProfile'
import CreateCompany from './components/pages/main/profile/CreateCompany'
import EditCompany from './components/pages/main/profile/EditCompany'
import Organizations from './components/pages/main/organization/Organizations'
import CompanyStaffsInfo from './components/pages/main/staff/CompanyStaffsInfo'
import CompanyCustomersInfo from './components/pages/main/customers/CompanyCustomersInfo'
import RequestManage from './components/pages/main/organization/request-manage/RequestManage'
import { ShowDonation } from './components/pages/main/organization/donation/ShowDonation'
import { Donation } from './components/pages/main/organization/donation/Donation'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse" />
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./components/pages/main/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./components/pages/login/Login'))
const Register = React.lazy(() => import('./components/pages/register/Register'))
const Page404 = React.lazy(() => import('./components/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./components/pages/page500/Page500'))
const About = React.lazy(() => import('./components/pages/about/About'))

class App extends Component {
  render() {
    return (
      <React.Suspense fallback={loading}>
        <Router>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" name="Register Page" component={Register} />
          <Route exact path="/404" name="Page 404" component={Page404} />
          <Route exact path="/500" name="Page 500" component={Page500} />
          <Route exact path="/" name="Home Page" component={About} />
          <Route exact path="/about" name="About" component={About} />
          <Switch>
            <PrivateRoute exact path="/profile/:profileusername" name="profile" component={Profile} />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/manage" name="About" component={RequestManage} />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/dashboard" component={DefaultLayout} />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/setting" name="Setting" component={Welcome} />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/create-company" component={CreateCompany} />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/edit-company" component={EditCompany} />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/create-profile" component={CreateProfile} />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/edit-profile" component={EditProfile} />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/organization" component={Organizations} />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/customer" component={CompanyCustomersInfo} />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/staff" component={CompanyStaffsInfo} />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/donation" name="Donation" component={ShowDonation} />
          </Switch>
        </Router>
      </React.Suspense>
    )
  }
}

export default App
