import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loginUser } from '../../../action/authAction'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormFeedback,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cibGmail, cilLockLocked } from '@coreui/icons'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      errors: {},
    }
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      console.log('Authenticate!!')
      this.props.history.push('/setting')
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    // if authenticate, /login cannot be call and push to welcome instead
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/setting')
    }
    // otherwise, if see any errors, set props.error to be current state and alert client
    else if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
      alert('Incorrect email and/or password.\nPlease try again!')
    }
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }
  onSubmit = (event) => {
    event.preventDefault()
    const userData = {
      email: this.state.email,
      password: this.state.password,
    }
    this.props.loginUser(userData)
  }

  render() {
    const { errors } = this.state
    return (
      <div className="login-bg min-vh-100 d-flex align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={5}>
              <CCard className="p-4">
                <CCardBody>
                  <CForm validated={true} onSubmit={this.onSubmit}>
                    <h6 className="text-high-emphasis">
                      SIGN IN to your account or {}
                      <Link to="/register">REGISTER</Link>
                      {} for a new one
                    </h6>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cibGmail} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Email"
                        autoComplete="email"
                        name="email"
                        type="email"
                        defaultValue=""
                        value={this.state.email}
                        onChange={this.onChange}
                        invalid={errors.email}
                        required
                      />
                      <CFormFeedback invalid>Please enter a valid email</CFormFeedback>
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        name="password"
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={this.state.password}
                        onChange={this.onChange}
                        invalid={errors.password}
                        required
                      />
                      <CFormFeedback invalid>Please enter your password</CFormFeedback>
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="light" className="px-4 btn-outline-info" type="submit">
                          Log In
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  errors: state.errors,
  auth: state.auth,
})
export default connect(mapStateToProps, { loginUser })(Login)
