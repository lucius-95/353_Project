import React, { Component } from 'react'
import { CButton, CCard, CCol, CContainer, CHeaderNav, CNavLink, CRow } from '@coreui/react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { acceptRequest, denyRequest } from '../../../../../action/requestingAction'
import PropTypes from 'prop-types'
import isEmpty from '../../../../../validation/isEmpty'
import {
  CAvatar,
  CProgress,
  Cbutton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

class RequestCard extends Component {
  constructor(props) {
    super(props)
  }
  onAcceptRequestClick = (id) => {
    this.props.acceptRequest(id)
  }
  onDenyRequestClick = (id) => {
    this.props.denyRequest(id)
  }
  render() {
    let { request } = this.props
    return (
      <>
        <CTableDataCell className="text-center">
          <CAvatar size="md" src={request.avatar} />
          {request.firstname} {request.lastname}
          <button
            onClick={this.onAcceptRequestClick.bind(this, request._id)}
            type="button"
            className="btn btn-light btn-outline-success mr-2"
          >
            Accept Request
          </button>
          <button
            onClick={this.onDenyRequestClick.bind(this, request._id)}
            type="button"
            className="btn btn-light btn-outline-danger mr-2"
          >
            Deny Request
          </button>
        </CTableDataCell>
      </>
    )
  }
}
RequestCard.propTypes = {
  acceptRequest: PropTypes.func.isRequired,
  denyRequest: PropTypes.func.isRequired,
  request: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({})
export default connect(mapStateToProps, { acceptRequest, denyRequest })(RequestCard)
