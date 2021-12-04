import React from 'react'
import { Link } from 'react-router-dom'
import isEmpty from '../../../../validation/isEmpty'
import { CButton, CCol, CRow } from '@coreui/react'
const ProfileAction = (props) => {
  let companyItem
  if (props.user.user.email === 'dillon@yahoo.com') {
    if (isEmpty(props.mycompany.company)) {
      companyItem = (
        <CCol xs={6}>
          <Link to="/create-company">
            <CButton color="light" className="px-3 btn-outline-info">
              Create Company
            </CButton>
          </Link>
        </CCol>
      )
    } else {
      companyItem = (
        <CCol xs={6}>
          <Link to="/edit-company">
            <CButton color="light" className="px-3 btn-outline-info">
              Edit Company
            </CButton>
          </Link>
        </CCol>
      )
    }
  }

  return (
    <CRow>
      <CCol xs={6}>
        <Link to="/edit-profile">
          <CButton color="light" className="px-3 btn-outline-info">
            Edit Profile
          </CButton>
        </Link>
      </CCol>
      {companyItem}
    </CRow>
  )
}

export default ProfileAction
