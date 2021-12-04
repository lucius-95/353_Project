import React, { Component } from 'react'
import {
  cibFacebook,
  cibGithub,
  cibLinkedin,
  cibYoutube,
  cibInstagram,
  cibTwitter,
} from '@coreui/icons'
import { Link } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import isEmpty from '../../../../validation/isEmpty'
import connect from 'react-redux/lib/connect/connect'
import Loading from '../../../common/Loader'
import { Field, Form } from 'redux-form'
import FileUploads from '../../../common/form/FileUploads'
import { uploadImage } from '../../../../action/profileAction'
import { UpLoadForm } from '../../../common/form/UpLoadForm'
import { createForm } from '../../../common/form/createForm'
import { CButton } from '@coreui/react'

class ProfileHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      profile: {},
      selectedFile: {},
    }
  }
  componentDidMount() {
    if (!isEmpty(this.props.profile)) {
      this.setState({ profile: this.props.profile })
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!isEmpty(nextProps.profile)) {
      this.setState({ profile: nextProps.profile })
    }
  }

  onFileChange = (event) => {
    event.preventDefault()
    if (event.target.files && event.target.files[0]) {
      let selectedFile = event.target.files[0]
      uploadImage(selectedFile).then(() => window.location.reload())
      this.setState({ selectedFile })
      console.log(this.state.selectedFile)
    }
  }

  render() {
    if (isEmpty(this.state.profile)) {
      return <Loading />
    } else {
      const { profile } = this.state
      return (
        <div>
          <div className="container emp-profile">
            <div className="row">
              <div className="col-md-4">
                <div className="profile-img">
                  <img src={profile.user.avatar} alt="" />
                  <CButton color="light" className="file btn-outline-info">
                    Upload Image
                    <div>
                      <input type="file" name="image" onChange={this.onFileChange.bind(this)} />
                    </div>
                  </CButton>
                </div>
              </div>
              <div className="col-md-6">
                <div className="profile-head">
                  <h1>
                    {profile.firstname} {profile.lastname}
                  </h1>
                </div>
              </div>
              <div className="col-md-2">
                <span>
                  <Link to="/edit-profile" className="btn btn-light mb-3 float-left">
                    Edit Profile
                  </Link>
                  <Link to="/dashboard" className="btn btn-light mb-3 float-left">
                    Go to Dashboard
                  </Link>
                </span>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="profile-work">
                  <p>GITHUB</p>
                  {profile.githubusername ? (
                    <a href={profile.githubusername} target="_blank" rel="noopener noreferrer">
                      <CIcon icon={cibGithub} className="github icon-xxl" />
                    </a>
                  ) : (
                    <p>N/A</p>
                  )}
                  <br />
                  <p>SOCIALS</p>
                  <span>
                    {isEmpty(profile.social && profile.social.twitter) ? null : (
                      <a href={profile.social.twitter} target="_blank" rel="noopener noreferrer">
                        <CIcon icon={cibTwitter} className="icon-xxl" />
                      </a>
                    )}

                    {isEmpty(profile.social && profile.social.facebook) ? null : (
                      <a href={profile.social.facebook} target="_blank" rel="noopener noreferrer">
                        <CIcon icon={cibFacebook} className="icon-xxl" />
                      </a>
                    )}

                    {isEmpty(profile.social && profile.social.linkedin) ? null : (
                      <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer">
                        <CIcon icon={cibLinkedin} className="icon-xxl" />
                      </a>
                    )}

                    {isEmpty(profile.social && profile.social.instagram) ? null : (
                      <a href={profile.social.instagram} target="_blank" rel="noopener noreferrer">
                        <CIcon icon={cibInstagram} className="icon-xxl" />
                      </a>
                    )}
                  </span>
                </div>
              </div>
              <div className="col-md-8">
                <div className="tab-content profile-tab" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
                    <div className="row">
                      <div className="col-md-6">
                        <label>User Id</label>
                      </div>
                      <div className="col-md-6">
                        <p>{profile.profileusername}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Name</label>
                      </div>
                      <div className="col-md-6">
                        <p>{profile.firstname + ' ' + profile.lastname}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Location</label>
                      </div>
                      <div className="col-md-6">
                        <p>{profile.location}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Created at</label>
                      </div>
                      <div className="col-md-6">
                        <p>{profile.date}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default ProfileHeader
