import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCurrentCompany, getCurrentCompanyByStaff } from '../../action/companyAction'
import PropTypes from 'prop-types'
import { CSidebar, CSidebarBrand, CSidebarNav } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSnowflake } from '@coreui/icons'
import isEmpty from '../../validation/isEmpty'

import { AppSidebarNav } from './AppSidebarNav'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigationOwner from '../../_navOwner'
import navigationStaff from '../../_navStaff'
import { SET } from '../../action/types'

class AppSidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
    }
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.setState({
        user: this.props.auth.user,
      })
    }
    // call getCurrentCompany
    this.props.getCurrentCompany()
  }
  render() {
    const { company } = this.props.company
    let isOwner = false
    if (!isEmpty(company) && !isEmpty(this.state.user)) {
      isOwner = company.owner === this.state.user.userId
    }

    return (
      <CSidebar
        position="fixed"
        // unfoldable="unfoldable"
        // visible="sidebarShow"
        // // onVisibleChange={(visible) => {
        // //   dispatch({ type: 'set', sidebarShow: visible })
        // // }}
      >
        <CSidebarBrand className="brand d-none d-lg-flex" to="/">
          <h1>Nomosn</h1>
          <CIcon icon={cilSnowflake} className="icon-xl icon" />
          <h1>w</h1>
        </CSidebarBrand>

        <CSidebarNav>
          <SimpleBar>
            {isOwner ? (
              <AppSidebarNav items={navigationOwner} />
            ) : (
              <AppSidebarNav items={navigationStaff} />
            )}
          </SimpleBar>
        </CSidebarNav>
      </CSidebar>
    )
  }
}
AppSidebar.propTypes = {
  company: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getCurrentCompany: PropTypes.func.isRequired,
  getCurrentCompanyByStaff: PropTypes.func.isRequired,
}

const mapPropToState = (state) => ({
  company: state.company,
  auth: state.auth,
})

export default connect(mapPropToState, { getCurrentCompany, getCurrentCompanyByStaff })(AppSidebar)
