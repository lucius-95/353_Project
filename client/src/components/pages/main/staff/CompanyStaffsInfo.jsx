import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getCurrentCompanyByStaff } from '../../../../action/companyAction'
import Loader from '../../../common/Loader'
import { CompanyByStaffList } from './CompanyByStaffList'
import isEmpty from '../../../../validation/isEmpty'
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
} from '@coreui/icons'
import { connect } from 'react-redux'
import CIcon from '@coreui/icons-react'
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
import { AppContent, AppFooter, AppHeader, AppSidebar } from '../../../index'
import DefaultLayout from '../DefaultLayout'

class CompanyStaffsInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: {},
    }
  }
  componentDidMount() {
    this.props.getCurrentCompanyByStaff()
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }
  render() {
    let companyByStaffDetails
    const { companyByStaff, loading } = this.props.company
    const { errors } = this.state
    if (!isEmpty(errors)) {
      companyByStaffDetails = ''
    } else if (isEmpty(companyByStaff) || loading) {
      companyByStaffDetails = <Loader />
    } else {
      if (Object.keys(companyByStaff).length > 0) {
        console.log(companyByStaff.staff)
        companyByStaffDetails = <CompanyByStaffList staffList={companyByStaff.staff} />
      }
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
                  <CTableHeaderCell className="text-center">Role</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Created At</CTableHeaderCell>
                  <CTableHeaderCell>{isOwner ? 'Options' : ''}</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>{companyByStaffDetails}</CTableBody>
            </CTable>
          </>
        }
      />
    )
  }
}
const isOwner = false

CompanyStaffsInfo.propTypes = {
  company: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getCurrentCompanyByStaff: PropTypes.func.isRequired,
}
const mapPropsToState = (state) => ({
  company: state.company,
  errors: state.errors,
})
export default connect(mapPropsToState, { getCurrentCompanyByStaff })(CompanyStaffsInfo)
