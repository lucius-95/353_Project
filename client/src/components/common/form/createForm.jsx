import React from 'react'
import {reduxForm,Field} from 'redux-form'
import FileUploads from './FileUploads'

const createForm = props =>{
  const { handleSubmit, submitCb } = props
  return (
    <form onSubmit={handleSubmit(submitCb)}>
      <Field
        name="image"
        label='Image'
        component={FileUploads}
      />
      <button className='btn btn-bwm btn-form' type="submit">
        Create hello there
      </button>
    </form>)
}


export default reduxForm({
  form: 'createForm',
  initialValues: {}
})(createForm)
