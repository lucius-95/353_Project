import React, { Component } from 'react'
import isEmpty from '../../../../validation/isEmpty'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStaffRequest } from '../../../../action/requestingAction'
import { CButton, CLink } from '@coreui/react'
import { Donation } from './donation/Donation'
class CompanyCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      staffRequest: true,
      customerRequest: false,
      errors: {},
      company: props.company,
      total: 0,
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.setState({
        user: this.props.auth.user,
      })
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    if (!isEmpty(nextProps.errors)) {
      this.setState({ errors: nextProps.errors })
    }
    if (!isEmpty(nextProps.company)) {
      this.setState({
        company: nextProps.company,
      })
    }
    if (nextProps.errors.request) {
      alert(nextProps.errors.request)
    }
    if (nextProps.errors.currency) {
      alert(nextProps.errors.currency)
    }
  }

  onRequest = (event) => {
    event.preventDefault()
    console.log('click click')
    const data = {
      staffRequest: this.state.staffRequest,
      customerRequest: this.state.customerRequest,
      company: this.state.company,
    }
    this.props.createStaffRequest(data)
  }

  render() {
    let isOwner = false
    if (!isEmpty(this.state.company) && !isEmpty(this.state.user)) {
      isOwner = this.state.company.owner === this.state.user.userId
    }

    return (
      <div className="body-organization">
        <div className="profile-card-hover">
          <div className="profile-card__content">
            <div className="about-company">
              <div className="profile-card__avatar">
                <img
                  src="https://icons.iconarchive.com/icons/fixicon/xmas-2006/256/blue-snow-icon.png"
                  alt="Company Avatar"
                />
              </div>
              <div className="row-wrapper">
                <div className="profile-card__company-name">{this.state.company.name}</div>
                <p className="profile-card__company-bio">• Saskatoon, Saskatchewan •</p>
                {isOwner ? null : (
                  <button
                    className="browse-jobs-btn"
                    type="button"
                    onClick={this.onRequest.bind(this)}
                  >
                    Apply for Staff
                  </button>
                )}
                <Donation companyId={this.state.company._id} errors={this.state.errors} />
              </div>

              <div className="user-actions" />
            </div>
            <div className="row-wrapper">
              <span>Description: {this.state.company.description} </span>
            </div>
            <div className="row-wrapper">
              <span>
                Total Customer: {!isEmpty(this.props.profiles) ? this.props.profiles.length : ''} •{' '}
              </span>
              <CLink className="btn-link link-dark" href="/customer">
                See All
              </CLink>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

CompanyCard.propTypes = {
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  createStaffRequest: PropTypes.func.isRequired,
}
const mapStateToProps = (state) => ({
  errors: state.errors,
  auth: state.auth,
})
export default connect(mapStateToProps, { createStaffRequest })(CompanyCard)

// import React, {Component} from 'react'
// import  { connect } from 'react-redux'
// import  {getCurrentCompanyById} from '../../action/companyAction'
// import {createStaffRequest} from '../../action/requestingAction'
// import PropTypes from "prop-types";
// import isEmpty from '../../validation/isEmpty'
// import { CButton, CCard, CCol, CContainer, CHeaderNav, CNavLink, CRow } from '@coreui/react'
//
// class Requesting extends Component {
//
//   constructor(props) {
//     super(props);
//     this.state = {
//       staffRequest: true,
//       customerRequest: false,
//       errors: {},
//       company: {}
//     }
//   }
//   componentDidMount() {
//     if (this.props.match.params._id) {
//       this.props.getCurrentCompanyById(this.props.match.params._id)
//     }
//   }
//   UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
//     if (!isEmpty(nextProps.errors)) {
//       this.setState({ errors: nextProps.errors })
//       alert(nextProps.errors.request)
//     }
//     if (!isEmpty(nextProps.company.company)) {
//       this.setState({ company: nextProps.company.company })
//     }
//   }
//
//   onRequest = (event) =>{
//     event.preventDefault()
//     console.log("click click")
//     const data = {
//       staffRequest: this.state.staffRequest,
//       customerRequest: this.state.customerRequest,
//       company: this.props.company.company
//     }
//     this.props.createStaffRequest(data)
//   }
//
//   render (){
//
//     let someButton = (
//       <CCol xs={6}>
//         <CButton
//           color="danger"
//           className="px-3 btn-outline-light"
//           onClick={this.onRequest.bind(this)}
//         >
//           request Button
//         </CButton>
//       </CCol>
//     )
//     return (<h1>{someButton}</h1>)
//   }
// }
//
// Requesting.propTypes = {
//   getCurrentCompanyById: PropTypes.func.isRequired,
//   createStaffRequest: PropTypes.func.isRequired,
//   errors: PropTypes.object.isRequired,
//   company: PropTypes.object.isRequired,
//   history: PropTypes.object.isRequired
// }
// const mapStateToProps = (state) => ({
//   errors: state.errors,
//   company: state.company,
// })
// export default connect(mapStateToProps,{getCurrentCompanyById,createStaffRequest})(Requesting)
