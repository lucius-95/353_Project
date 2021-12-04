import React, { Component } from 'react'
import { getProfiles } from '../../../../action/profileAction'
import { getCurrentCompany } from '../../../../action/companyAction'
import PropTypes from 'prop-types'
import Loader from '../../../common/Loader'
import CompanyCustomersList from './CompanyCustomersList'
import isEmpty from '../../../../validation/isEmpty'
import {
  CAvatar,
  CButton,
  CProgress,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cilUserX,
  cilPeople,
  cilUser,
  cilGroup,
  cilXCircle,
} from '@coreui/icons'
import { connect } from 'react-redux'
import CIcon from '@coreui/icons-react'
import { AppContent, AppFooter, AppHeader, AppSidebar } from '../../../index'
import DefaultLayout from '../DefaultLayout'
import { removeStaff } from '../../../../action/companyAction'

class CompanyCustomersInfo extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    // call getCompanies to get information of the companies
    this.props.getProfiles()
    this.props.getCurrentCompany()
  }
  render() {
    const { profiles, loading } = this.props.profile
    const { company } = this.props.company
    const { user } = this.props.auth
    let customerDetails
    if (profiles == null || loading) {
      customerDetails = <Loader />
    } else {
      customerDetails = (
        <CompanyCustomersList
          profiles={profiles}
          company={isEmpty(company) ? null : company}
          user={user.userId}
        />
      )
    }
    return (
      <DefaultLayout
        content={
          <>
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell className="text-center">
                    <CIcon icon={cilPeople} />
                  </CTableHeaderCell>
                  <CTableHeaderCell>People</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Creation Date</CTableHeaderCell>
                  <CTableHeaderCell />
                </CTableRow>
              </CTableHead>
              <CTableBody>{customerDetails}</CTableBody>
            </CTable>
          </>
        }
      />
    )
  }
}

const isOwner = false
CompanyCustomersInfo.propTypes = {
  profile: PropTypes.object.isRequired,
  getCurrentCompany: PropTypes.func.isRequired,
  getProfiles: PropTypes.func.isRequired,
}

const mapPropToState = (state) => ({
  profile: state.profile,
  company: state.company,
  auth: state.auth,
})

export default connect(mapPropToState, { getProfiles, getCurrentCompany })(CompanyCustomersInfo)
