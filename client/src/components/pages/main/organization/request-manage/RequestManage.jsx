import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getAllRequests } from '../../../../../action/requestingAction'
import Loader from '../../../../common/Loader'
import isEmpty from '../../../../../validation/isEmpty'
import { RequestList } from './RequestList'
import DefaultLayout from '../../DefaultLayout'

class RequestManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: null,
    }
  }
  componentDidMount() {
    this.props.getAllRequests()
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors.company) {
      this.props.history.push('/dashboard')
    }
  }

  render() {
    const { requests, loading } = this.props.request
    let showRequest
    if (loading) {
      showRequest = <Loader />
    } else if (requests === null) {
      showRequest = null
    } else {
      showRequest = <RequestList requests={requests} />
    }

    return <DefaultLayout content={<h1>{showRequest}</h1>} />
  }
}
RequestManage.propTypes = {
  request: PropTypes.object.isRequired,
  getAllRequests: PropTypes.func.isRequired,
}
const mapPropsToState = (state) => ({
  request: state.request,
  errors: state.errors,
})
export default connect(mapPropsToState, { getAllRequests })(RequestManage)
