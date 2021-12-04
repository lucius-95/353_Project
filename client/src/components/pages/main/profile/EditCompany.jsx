import React, { Component } from 'react'
import { CButton, CForm, CFormInput, CInputGroup, CInputGroupText } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cibTwitter } from '@coreui/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressBook } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createCompany, getCurrentCompany } from '../../../../action/companyAction'
import DefaultLayout from '../DefaultLayout'
class EditCompany extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      errors: {},
    }
  }

  componentDidMount() {
    this.props.getCurrentCompany()
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
    if (nextProps.company.company) {
      // if company field doesnt exist , make empty string
      const company = nextProps.company.company
      this.setState({
        name: company.name,
        description: company.description,
      })
    }
  }

  onSubmit = (event) => {
    event.preventDefault()
    const data = {
      name: this.state.name,
      description: this.state.description,
    }
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
      <DefaultLayout
        content={
          <>
            <div className="create-profile">
              <div className="container">
                <div className="row">
                  <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Edit Company</h1>
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
          </>
        }
      />
    )
  }
}
EditCompany.propTypes = {
  getCurrentCompany: PropTypes.func.isRequired,
  createCompany: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  errors: state.errors,
  company: state.company,
})
export default connect(mapStateToProps, { createCompany, getCurrentCompany })(EditCompany)
