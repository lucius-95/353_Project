import React, { Component } from 'react'
import { connect } from 'react-redux'
import CIcon from '@coreui/icons-react'
import PropTypes from 'prop-types'
import { logoutUser } from '../../action/authAction'
import { getCurrentProfile } from '../../action/profileAction'
import isEmpty from '../../validation/isEmpty'

import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { cilLockLocked, cilSettings, cilUser } from '@coreui/icons'
/**
 *
 * Header working here
 */
class AppHeaderDropdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
    }
  }

  componentDidMount() {
    this.setState({ user: this.props.auth.user })
    this.props.getCurrentProfile()
  }

  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.auth) {
      console.log(nextProps.auth.user.avatar)
      this.setState({ user: nextProps.auth.user })
    }
  }
  onLogoutClick(event) {
    event.preventDefault()
    this.props.logoutUser()
  }

  render() {
    const { user } = this.props.auth
    const { profile, loading } = this.props.profile
    let dropdownItemForProfile
    if (isEmpty(profile) || loading) {
      dropdownItemForProfile = ''
    } else {
      dropdownItemForProfile = (
        <CDropdownItem href={`/profile/${profile.profileusername}`}>
          <CIcon icon={cilUser} className="me-2" />
          My Profile
        </CDropdownItem>
      )
    }
    return (
      <CDropdown variant="nav-item">
        <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
          <CAvatar src={user.avatar} size="lg" className="profile-img" />
        </CDropdownToggle>
        <CDropdownMenu className="pt-0" placement="bottom-end">
          <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
          {dropdownItemForProfile}
          <CDropdownItem href="/setting">
            <CIcon icon={cilSettings} className="me-2" />
            Settings
          </CDropdownItem>
          <CDropdownDivider />

          <CDropdownItem href="#" onClick={this.onLogoutClick.bind(this)}>
            <CIcon icon={cilLockLocked} className="me-2" />
            Logout
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    )
  }
}

AppHeaderDropdown.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  CAvatar: PropTypes.string,
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
})
export default connect(mapStateToProps, { logoutUser, getCurrentProfile })(AppHeaderDropdown)
