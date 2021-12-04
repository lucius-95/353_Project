import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { CFormInput, CInputGroup, CInputGroupText, CForm, CButton } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressBook, faNetworkWired, faUser } from '@fortawesome/free-solid-svg-icons'
import CIcon from '@coreui/icons-react'
import { withRouter } from 'react-router-dom'
import { cibGithub, cibLinkedin, cibYoutube, cibInstagram, cibTwitter } from '@coreui/icons'
import { createProfile } from '../../../../action/profileAction'
import isEmpty from '../../../../validation/isEmpty'
import DefaultLayout from "../DefaultLayout";

class CreateProfile extends Component {
  constructor() {
    super()
    this.state = {
      firstname: '',
      lastname: '',
      profileusername: '',
      location: '',
      githubusername: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: '',
      errors: {},
    }
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.setState({
        firstname: this.props.auth.user.firstname,
        lastname: this.props.auth.user.lastname,
      })
    }
    if (!isEmpty(this.props.profile.profile)) {
      this.props.history.push('/edit-profile')
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
    if (!isEmpty(nextProps.errors.profileusername)) {
      alert(nextProps.errors.profileusername)
    }
    if (!isEmpty(nextProps.errors.githubusername)) {
      alert(nextProps.errors.githubusername)
    }
    if (!isEmpty(nextProps.errors.youtube)) {
      alert(nextProps.errors.youtube)
    }
    if (!isEmpty(nextProps.errors.twitter)) {
      alert(nextProps.errors.twitter)
    }
    if (!isEmpty(nextProps.errors.facebook)) {
      alert(nextProps.errors.facebook)
    }
    if (!isEmpty(nextProps.errors.linkedin)) {
      alert(nextProps.errors.linkedin)
    }
    if (!isEmpty(nextProps.errors.instagram)) {
      alert(nextProps.errors.instagram)
    }
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  onSubmit = (event) => {
    event.preventDefault()
    const profileData = {
      firstname: this.props.auth.user.firstname,
      lastname: this.props.auth.user.lastname,
      profileusername: this.state.profileusername,
      location: this.state.location,
      githubusername: this.state.githubusername,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram,
    }
    this.props.createProfile(profileData, this.props.history)
  }
  render() {
    const { errors, displaySocialInputs } = this.state
    // select options for status
    let socialInputs
    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <CInputGroup className="mb-3">
            <CInputGroupText id="basic-addon1">
              <CIcon icon={cibTwitter} />
            </CInputGroupText>
            <CFormInput
              placeholder="Twitter Profile URL"
              name="twitter"
              icon="fab fa-twitter"
              value={this.state.twitter}
              onChange={this.onChange}
              errors={errors.twitter}
            />
          </CInputGroup>
          <CInputGroup className="mb-3">
            <CInputGroupText id="basic-addon1">
              <FontAwesomeIcon icon={faAddressBook} />
            </CInputGroupText>

            <CFormInput
              placeholder="Facebook Profile URL"
              name="facebook"
              icon="fab fa-facebook"
              value={this.state.facebook}
              onChange={this.onChange}
              errors={errors.facebook}
            />
          </CInputGroup>

          <CInputGroup className="mb-3">
            <CInputGroupText id="basic-addon1">
              <CInputGroupText id="basic-addon1">
                <CIcon icon={cibLinkedin} />
              </CInputGroupText>
            </CInputGroupText>
            <CFormInput
              placeholder="Linkedin Profile URL"
              name="linkedin"
              icon="fab fa-linkedin"
              value={this.state.linkedin}
              onChange={this.onChange}
              errors={errors.linkedin}
            />
          </CInputGroup>
          <CInputGroup className="mb-3">
            <CInputGroupText id="basic-addon1">
              <CInputGroupText id="basic-addon1">
                <CIcon icon={cibYoutube} />
              </CInputGroupText>
            </CInputGroupText>
            <CFormInput
              placeholder="YouTube Profile URL"
              name="youtube"
              icon="fab fa-youtube"
              value={this.state.youtube}
              onChange={this.onChange}
              errors={errors.youtube}
            />
          </CInputGroup>
          <CInputGroup className="mb-3">
            <CInputGroupText id="basic-addon1">
              <CInputGroupText id="basic-addon1">
                <CIcon icon={cibInstagram} />
              </CInputGroupText>
            </CInputGroupText>
            <CFormInput
              placeholder="Instagram Profile URL"
              name="instagram"
              icon="fab fa-instagram"
              value={this.state.instagram}
              onChange={this.onChange}
              errors={errors.instagram}
            />
          </CInputGroup>
        </div>
      )
    }
    return (
      <DefaultLayout content={<div>
        <div className="create-profile">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Create Your Profile</h1>
                <CForm onSubmit={this.onSubmit}>
                  <CInputGroup className="mb-3">
                    <CInputGroupText id="basic-addon1">
                      <FontAwesomeIcon icon={faUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="* Profile username"
                      name="profileusername"
                      value={this.state.profileusername}
                      onChange={this.onChange}
                      errors={errors.profileusername}
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText id="basic-addon1">
                      <FontAwesomeIcon icon={faAddressBook} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="location"
                      name="location"
                      value={this.state.location}
                      onChange={this.onChange}
                      errors={errors.location}
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText id="basic-addon1">
                      <CIcon icon={cibGithub} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Github Username"
                      name="githubusername"
                      value={this.state.githubusername}
                      onChange={this.onChange}
                      errors={errors.githubusername}
                    />
                  </CInputGroup>

                  <div className="mb-3">
                    <button
                      type="button"
                      onClick={() => {
                        this.setState((prevState) => ({
                          displaySocialInputs: !prevState.displaySocialInputs,
                        }))
                      }}
                      className="btn btn-light m-5"
                    >
                      Add Social Network Links
                    </button>
                  </div>
                  {socialInputs}
                  <div className="d-grid">
                    <CButton color="success" type="submit">
                      Submit
                    </CButton>
                  </div>
                </CForm>
              </div>
            </div>
          </div>
        </div>
      </div>}/>
    )
  }
}
CreateProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  profile: state.profile,
})
export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile))
