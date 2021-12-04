import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCurrentCompanyById } from '../../../../../../action/companyAction'
import { createStaffRequest } from '../../../../../../action/requestingAction'
import PropTypes from 'prop-types'
import isEmpty from '../../../../../../validation/isEmpty'
import { CButton, CCol } from '@coreui/react'

class Requesting extends Component {
  constructor(props) {
    super(props)
    this.state = {
      staffRequest: true,
      customerRequest: false,
      errors: {},
      company: {},
    }
  }
  componentDidMount() {
    if (this.props.match.params._id) {
      this.props.getCurrentCompanyById(this.props.match.params._id)
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    if (!isEmpty(nextProps.errors)) {
      this.setState({ errors: nextProps.errors })
      alert(nextProps.errors.request)
    }
    if (!isEmpty(nextProps.company.company)) {
      this.setState({ company: nextProps.company.company })
    }
  }

  onRequest = (event) => {
    event.preventDefault()
    console.log('click click')
    const data = {
      staffRequest: this.state.staffRequest,
      customerRequest: this.state.customerRequest,
      company: this.props.company.company,
    }
    this.props.createStaffRequest(data)
  }

  render() {
    let someButton = (
      <CCol xs={6}>
        <CButton
          color="danger"
          className="px-3 btn-outline-light"
          onClick={this.onRequest.bind(this)}
        >
          request Button
        </CButton>
      </CCol>
    )
    return <h1>{someButton}</h1>
  }
}

Requesting.propTypes = {
  getCurrentCompanyById: PropTypes.func.isRequired,
  createStaffRequest: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
  errors: state.errors,
  company: state.company,
})
export default connect(mapStateToProps, { getCurrentCompanyById, createStaffRequest })(Requesting)
