import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeStaff } from '../../../../action/companyAction'
import { CAvatar, CTableDataCell, CTableRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilUser, cilStar, cilXCircle } from '@coreui/icons'

export function CompanyByStaffCard(props) {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.auth)
  const currentCompany = useSelector((state) => state.company)
  let isOwner = currentUser.user.userId === currentCompany.companyByStaff.owner
  return (
    <>
      <CTableRow>
        <CTableDataCell className="text-center">
          <CAvatar size="lg" src={props.staff.user.avatar} className="profile-img" />
        </CTableDataCell>

        <CTableDataCell>
          <div>
            {props.staff.user.firstname} {props.staff.user.lastname}
          </div>
          <div className="small text-medium-emphasis">
            {props.staff.user._id === currentCompany.companyByStaff.owner ? 'Owner' : 'Staff'}
          </div>
        </CTableDataCell>
        <CTableDataCell className="text-center">
          <CIcon
            size="xl"
            icon={props.staff.user._id === currentCompany.companyByStaff.owner ? cilStar : cilUser}
            title={props.staff.user._id === currentCompany.companyByStaff.owner ? 'Owner' : 'Staff'}
          />
        </CTableDataCell>
        <CTableDataCell className="text-center">
          <div className="small text-large-emphasis">{props.staff.user.date}</div>
        </CTableDataCell>
        {isOwner && props.staff.user._id !== currentUser.user.userId ? (
          <CTableDataCell>
            <button
              id="deleteStaff"
              className="delete-user-btn"
              type="button"
              onClick={() => dispatch(removeStaff(props.staff.user._id))}
            >
              <CIcon size="xl" icon={cilXCircle} title="Remove Staff" />
            </button>
          </CTableDataCell>
        ) : (
          <CTableDataCell />
        )}
      </CTableRow>
    </>
  )
}
