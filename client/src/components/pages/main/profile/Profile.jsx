import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ProfileHeader from './ProfileHeader'
import Loader from '../../../common/Loader'
import { getProfileByProfileUsername } from '../../../../action/profileAction'
import DefaultLayout from 'src/components/pages/main/DefaultLayout'

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.profileusername) {
      this.props.getProfileByProfileUsername(this.props.match.params.profileusername)
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push('/404')
    }
  }

  render() {
    const { profile, loading } = this.props.profile
    let profileContent = ''
    if (profile === null || loading) {
      profileContent = <Loader />
    } else {
      profileContent = (
        <div>
          <ProfileHeader profile={profile} />
        </div>
      )
    }
    return (
      <DefaultLayout
        content={
          <div className="min-vh-100 d-flex align-items-center">
            <div className="container">
              <div className="row">{profileContent}</div>
            </div>
          </div>
        }
      />
    )
  }
}

Profile.propTypes = {
  getProfileByProfileUsername: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  profile: state.profile,
})

export default connect(mapStateToProps, { getProfileByProfileUsername })(Profile)
