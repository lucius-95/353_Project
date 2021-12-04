import React from 'react';
import { Field, reduxForm } from 'redux-form';
import FileUploads from './FileUploads'
const UpLoadForm = props => {
  const { handleSubmit, submitCb } = props
  return (
    <form onSubmit={handleSubmit(submitCb)}>
      <Field
        name="image"
        label='Image'
        component={FileUploads}
      />

      <button className='btn btn-bwm btn-form' type="submit">
        Create Rental
      </button>
    </form>
  )
}

export default reduxForm({
  form: 'uploadForm',
  initialValues: {}
})(UpLoadForm)
