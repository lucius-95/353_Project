import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentProfile, deleteAccount } from '../../../../action/profileAction'
import { getCurrentCompany, deleteCompany } from '../../../../action/companyAction'
import Loader from '../../../common/Loader'
import ProfileAction from './ProfileAction'
import { CButton, CCard, CCol, CContainer, CNavLink, CRow } from '@coreui/react'
import isEmpty from '../../../../validation/isEmpty'
import DefaultLayout from 'src/components/pages/main/DefaultLayout'

class Welcome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      wantDelete: false,
      name: '',
      errors: {},
    }
  }
  componentDidMount() {
    this.props.getCurrentProfile()
    this.props.getCurrentCompany()
  }

  onDeleteClick = (event) => {
    this.props.deleteAccount(this.props.history)
  }
  onDeleteCompany = (event) => {
    this.props.deleteCompany(this.props.history)
  }
  render() {
    const { profile, loading } = this.props.profile
    const { company } = this.props.company

    let dashboardContent
    let deleteCompanyButton
    let deleteProfileButton
    if (!isEmpty(company)) {
      deleteCompanyButton = (
        <CCol xs={6}>
          <CButton
            color="danger"
            className="px-3 btn-outline-light"
            onClick={this.onDeleteCompany.bind(this)}
          >
            Delete Company
          </CButton>
        </CCol>
      )
    }
    if (!isEmpty(profile)) {
      deleteProfileButton = (
        <CCol xs={6}>
          <CButton
            color="danger"
            className="px-3 btn-outline-light"
            onClick={this.onDeleteClick.bind(this)}
          >
            Delete Profile
          </CButton>
        </CCol>
      )
    }

    if (profile === null || loading) {
      dashboardContent = <Loader />
    } else {
      // check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <ProfileAction mycompany={this.props.company} user={this.props.auth} />
            <div style={{ marginBottom: '10px' }} />
            <CRow>
              {deleteProfileButton}
              {deleteCompanyButton}
            </CRow>
          </div>
        )
      } else {
        // user is logged in but has no profile
        dashboardContent = (
          <div>
            <p>No profile set up yet. Please create one</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        )
      }
    }

    return (
      <DefaultLayout
        content={
          <div className="welcome-bg min-vh-100 d-flex align-items-center">
            <Link to="/dashboard">
              <button className="button dashboard-button">Dashboard</button>
            </Link>
            <CContainer>
              <CCol md={4}>
                <CCard className="p-4">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-12">
                        <h1 className="display-5 text-center">
                          Welcome{' '}
                          {!isEmpty(profile) ? (
                            <CNavLink
                              href={`profile/${profile.profileusername}`}
                              className="text-info user-link"
                            >
                              <p>
                                {profile.firstname} {profile.lastname}
                              </p>
                            </CNavLink>
                          ) : null}
                        </h1>
                        {dashboardContent}
                      </div>
                    </div>
                  </div>
                </CCard>
              </CCol>
            </CContainer>
          </div>
        }
      />
    )
  }
}
Welcome.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getCurrentCompany: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  deleteCompany: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
  company: state.company,
})

export default connect(mapStateToProps, {
  getCurrentProfile,
  deleteAccount,
  getCurrentCompany,
  deleteCompany,
})(withRouter(Welcome))
