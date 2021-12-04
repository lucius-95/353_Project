import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCompanies, donate } from '../../../../../action/companyAction'
import isEmpty from '../../../../../validation/isEmpty'
import { CFormInput, CInputGroup, CInputGroupText, CForm, CButton, CRow, CCol } from '@coreui/react'

export const Donation = (props) => {
  const [total, setTotal] = React.useState(0)
  const [displayState, setDisplayState] = React.useState(false)
  const [errors, setErrors] = React.useState(props)
  const [company, setCompanies] = React.useState(props)

  const dispatch = useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(donate({ amount: total, companyId: props.companyId }))
  }

  const currentErrors = useSelector((state) => state.errors)
  let companyDonation = null
  if (!isEmpty(company.companies)) {
    console.log(company.companies[0])
    companyDonation = (
      <div>
        {company.companies.donation.map((item) => {
          return <h1>{item}</h1>
        })}
      </div>
    )
  }
  let showDonation = (
    <div className="col pt-2">
      <CForm onSubmit={handleSubmit}>
        <CInputGroup className="donation-field">
          <CInputGroupText id="basic-addon1">Amount</CInputGroupText>
          <CFormInput
            placeholder="Donation Amount"
            value={total}
            onChange={(e) => {
              setTotal(e.target.value)
              console.log({ total })
            }}
          />
          <CButton color="success" type="submit">
            Donate
          </CButton>
        </CInputGroup>
      </CForm>
    </div>
  )
  return (
    <div className="row">
      <div className="col-4">
        <button
          className="browse-jobs-btn mt-3"
          type="button"
          onClick={() => {
            setDisplayState(!displayState)
            console.log({ displayState })
          }}
        >
          Donate Here!
        </button>
      </div>
      {displayState ? showDonation : ''}
    </div>
  )
}
