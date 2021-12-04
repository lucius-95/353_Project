import React, { Component } from 'react'
import { CompanyCustomersCard } from './CompanyCustomersCard'
import { CTableRow } from '@coreui/react'

export default class CompanyCustomersList extends Component {
  renderCompaniesCustomerlist() {
    return this.props.profiles.map((profile, index) => {
      return (
        <CTableRow v-for="item in tableItems">
          <CompanyCustomersCard key={index}
                                colNum="col-md-3 col-xs-6"
                                customer={profile}
                                company = {this.props.company}
                                user = {this.props.user}

          />
        </CTableRow>
      )
    })
  }
  render() {
    return this.renderCompaniesCustomerlist()
  }
}
