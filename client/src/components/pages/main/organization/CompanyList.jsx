import React, { Component } from 'react'
import CompanyCard from './CompanyCard'

class CompanyList extends Component {
  renderCompanies() {
    return this.props.companies.map((company, index) => {
      return (
        <CompanyCard
          key={index}
          colNum="col-md-3 col-xs-6"
          company={company}
          profiles={this.props.profiles}
        />
      )
    })
  }
  render() {
    return <div className="row">{this.renderCompanies()}</div>
  }
}
export default CompanyList
