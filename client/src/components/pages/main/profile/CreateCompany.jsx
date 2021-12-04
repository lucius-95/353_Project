import React, { Component } from 'react'
import { CButton, CForm, CFormInput, CInputGroup, CInputGroupText } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cibGithub, cibTwitter } from '@coreui/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressBook, faUser } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { createCompany } from '../../../../action/companyAction'

class CreateCompany extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      errors: {},
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  onSubmit = (event) => {
    event.preventDefault()
    const data = {
      name: this.state.name,
      description: this.state.description,
    }
    console.log(data)
    this.props.createCompany(data, this.props.history)
  }
  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }
  render() {
    const { errors } = this.state
    console.log(errors)
    return (
      <div>
        <div className="create-profile">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Create Company</h1>
                <CForm onSubmit={this.onSubmit}>
                  <CInputGroup className="mb-3">
                    <CInputGroupText id="basic-addon1">
                      <CIcon icon={cibTwitter} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Company name"
                      name="name"
                      value={this.state.name}
                      onChange={this.onChange}
                      errors={errors.name}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText id="basic-addon1">
                      <FontAwesomeIcon icon={faAddressBook} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="description"
                      name="description"
                      value={this.state.description}
                      onChange={this.onChange}
                      errors={errors.description}
                    />
                  </CInputGroup>

                  <div className="d-grid">
                    <CButton color="success" type="submit">
                      Submit
                    </CButton>
                  </div>
                </CForm>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
CreateCompany.propTypes = {
  createCompany: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  errors: state.errors,
  company: state.company,
})
export default connect(mapStateToProps, { createCompany })(CreateCompany)
