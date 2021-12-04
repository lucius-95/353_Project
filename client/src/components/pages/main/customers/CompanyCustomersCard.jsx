import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import isEmpty from '../../../../validation/isEmpty'
import { deleteCustomerAccount } from '../../../../action/profileAction'
import { CAvatar, CTableDataCell } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilXCircle } from '@coreui/icons'

export function CompanyCustomersCard(props) {
  const dispatch = useDispatch()

  let isOwner = false
  if (!isEmpty(props.company)) {
    isOwner = props.company.owner === props.user
  }

  console.log(props)
  return (
    <>
      <CTableDataCell className="text-center">
        <Link to="/dashboard">
          <CAvatar className="profile-img" size="lg" src={props.customer.user.avatar} />
        </Link>
      </CTableDataCell>
      <CTableDataCell>
        <div>
          {props.customer.user.firstname} {props.customer.user.lastname}
        </div>
      </CTableDataCell>
      <CTableDataCell className="text-center">
        <div className="small text-medium-emphasis">Created at</div>
        {props.customer.date}
      </CTableDataCell>
      {isOwner && props.customer.user._id != props.company.owner ? (
        <CTableDataCell>
          <button
            id="deleteCustomer"
            className="delete-user-btn"
            type="button"
            onClick={() => {
              dispatch(deleteCustomerAccount(props.customer.user._id))
            }}
          >
            <CIcon size="xl" icon={cilXCircle} title="Remove Staff" />
          </button>
        </CTableDataCell>
      ) : (
        <CTableDataCell />
      )}
    </>
  )
}
