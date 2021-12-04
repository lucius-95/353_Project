import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentCompanyByStaff } from '../../../../../action/companyAction'
import { AppContent, AppFooter, AppHeader, AppSidebar } from '../../../../index'
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
import CIcon from '@coreui/icons-react'
import { cilPeople } from '@coreui/icons'
export const ShowDonation = () => {
  const [total, setTotal] = React.useState(0)
  const currentCompany = useSelector((state) => state.company)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCurrentCompanyByStaff())
  }, [])
  let totalAmout = 0
  console.log(currentCompany)
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <CTable align="middle" className="mb-3 mt-3 border" hover responsive>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell className="text-center">User</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Donation Amount</CTableHeaderCell>
                <CTableHeaderCell>Time</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {!currentCompany.companyByStaff
                ? null
                : currentCompany.companyByStaff.donation.map((someitem, index) => {
                    // {someitem.amount? setTotal(total+someitem.amount): setTotal(total)}
                    totalAmout = totalAmout + someitem.amount
                    return (
                      <>
                        <CTableRow key={index}>
                          <CTableDataCell className="text-center">
                            {someitem.firstname} {someitem.lastname}
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            $ {someitem.amount}
                          </CTableDataCell>
                          <CTableDataCell>{someitem.date}</CTableDataCell>
                        </CTableRow>
                      </>
                    )
                  })}
            </CTableBody>
          </CTable>
        </div>
        <div className="text-center">
          <h3>Total of ${totalAmout.toFixed(2)} has been donate to this organization</h3>
        </div>
        <AppFooter />
      </div>
    </div>
  )
}
