import React, { Component } from 'react'
import { CompanyByStaffCard } from './CompanyByStaffCard'
import { CTableRow } from '@coreui/react'

export class CompanyByStaffList extends Component {
  renderCompaniesStafflist() {
    return this.props.staffList.map((staff, index) => {
      return <CompanyByStaffCard key={index} colNum="col-md-3 col-xs-6" staff={staff} />
    })
  }
  render() {
    return <>{this.renderCompaniesStafflist()}</>
  }
}
