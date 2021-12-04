import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
    }
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.setState({
        user: this.props.auth.user,
      })
    }
  }
  render() {
    const user = this.props.auth.user
    console.log(user)
    return (
      <>
        <br />
        <h1>
          Welcome {user.firstname} {user.lastname}!
        </h1>
      </>
    )
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapPropToState = (state) => ({
  auth: state.auth,
})

export default connect(mapPropToState)(Dashboard)
