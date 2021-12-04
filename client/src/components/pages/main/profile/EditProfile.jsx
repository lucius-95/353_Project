import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { createProfile, getCurrentProfile } from '../../../../action/profileAction'
import isEmpty from '../../../../validation/isEmpty'
import { CButton, CForm, CFormInput, CInputGroup, CInputGroupText } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cibGithub, cibInstagram, cibLinkedin, cibTwitter, cibYoutube } from '@coreui/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressBook, faUser } from '@fortawesome/free-solid-svg-icons'
import DefaultLayout from 'src/components/pages/main/DefaultLayout'

class EditProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
    this.props.getCurrentProfile()
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile

      // if profile field doesnt exist , make empty string
      profile.location = !isEmpty(profile.location) ? profile.location : ''
      profile.githubusername = !isEmpty(profile.githubusername) ? profile.githubusername : ''
      profile.social = !isEmpty(profile.social) ? profile.social : {}
      profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : ''
      profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : ''
      profile.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin : ''
      profile.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : ''
      profile.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram : ''

      // set component fields state
      this.setState({
        profileusername: profile.profileusername,
        firstname: profile.firstname,
        lastname: profile.lastname,
        location: profile.location,
        githubusername: profile.githubusername,
        twitter: profile.twitter,
        facebook: profile.facebook,
        linkedin: profile.linkedin,
        youtube: profile.youtube,
        instagram: profile.instagram,
      })
    }
  }
  onSubmit = (event) => {
    event.preventDefault()
    const profileData = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
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
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
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
      <DefaultLayout
        content={
          <div>
            <div className="create-profile">
              <div className="container">
                <div className="row">
                  <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Edit Your Profile</h1>
                    <CForm onSubmit={this.onSubmit}>
                      {/*<CInputGroup className="mb-3">*/}
                      {/*  <CInputGroupText id="basic-addon1">*/}
                      {/*    <FontAwesomeIcon icon={faUser} />*/}
                      {/*  </CInputGroupText>*/}
                      {/*  <CFormInput*/}
                      {/*    placeholder="* Profile username"*/}
                      {/*    name="profileusername"*/}
                      {/*    value={this.state.profileusername}*/}
                      {/*    onChange={this.onChange}*/}
                      {/*    errors={errors.profileusername}*/}
                      {/*  />*/}
                      {/*</CInputGroup>*/}

                      <CInputGroup className="mb-3">
                        <CInputGroupText id="basic-addon1">
                          <FontAwesomeIcon icon={faUser} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="* first name"
                          name="firstname"
                          value={this.state.firstname}
                          onChange={this.onChange}
                          errors={errors.firstname}
                        />
                      </CInputGroup>

                      <CInputGroup className="mb-3">
                        <CInputGroupText id="basic-addon1">
                          <FontAwesomeIcon icon={faUser} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="* last name"
                          name="lastname"
                          value={this.state.lastname}
                          onChange={this.onChange}
                          errors={errors.lastname}
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
          </div>
        }
      />
    )
  }
}
EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  profile: state.profile,
})
export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile),
)
