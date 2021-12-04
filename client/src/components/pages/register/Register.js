import React, { Component } from 'react'
import { connect } from 'react-redux'
import { registerUser } from '../../../action/authAction'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormFeedback,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cibGmail, cilLockLocked, cilUser } from '@coreui/icons'
import PropTypes from 'prop-types'

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      password2: '',
      errors: {},
    }
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/setting')
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    // if authenticate, /register cannot be call and push to welcome instead
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/setting')
    } else if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
      alert('Email had already been registered!')
    }
  }
  onSubmit = (event) => {
    event.preventDefault()
    const newUser = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    }
    if (newUser.firstname.length < 2) {
      alert('Firstname must contain more than 2 letters!')
    } else if (newUser.lastname.length < 2) {
      alert('Lastname must contain more than 2 letters!')
    } else if (newUser.password !== newUser.password2) {
      alert('Passwords do not match!')
    } else {
      this.props.registerUser(newUser, this.props.history)
    }
  }
  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }
  render() {
    const { errors } = this.state
    return (
      <div className="login-bg min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={9} lg={7} xl={6}>
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <CForm validated={true} onSubmit={this.onSubmit}>
                    <h3 className="text-high-emphasis text-center mb-4">New Account Information</h3>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Firstname"
                        autoComplete="firstname"
                        name="firstname"
                        defaultValue=""
                        value={this.state.firstname}
                        onChange={this.onChange}
                        invalid={errors.firstname}
                        required
                      />
                      <CFormFeedback invalid>Please enter your firstname</CFormFeedback>
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="lastname"
                        autoComplete="lastname"
                        name="lastname"
                        defaultValue=""
                        value={this.state.lastname}
                        onChange={this.onChange}
                        invalid={errors.lastname}
                        required
                      />
                      <CFormFeedback invalid>Please enter your lastname</CFormFeedback>
                    </CInputGroup>
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
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        name="password"
                        value={this.state.password}
                        defaultValue=""
                        placeholder="Password"
                        autoComplete="new-password"
                        onChange={this.onChange}
                        invalid={errors.password}
                        required
                      />
                      <CFormFeedback invalid>Please enter a password</CFormFeedback>
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        name="password2"
                        value={this.state.password2}
                        defaultValue=""
                        placeholder="Re-enter Password"
                        autoComplete="new-password"
                        onChange={this.onChange}
                        invalid={errors.password2}
                        required
                      />
                      <CFormFeedback invalid>Please re-enter the password</CFormFeedback>
                    </CInputGroup>
                    <div className="text-center">
                      <CButton color="light" className="px-4 btn-outline-info" type="submit">
                        Create Account
                      </CButton>
                    </div>
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
  errors: state.errors,
  auth: state.auth,
})
export default connect(mapStateToProps, { registerUser })(Register)
