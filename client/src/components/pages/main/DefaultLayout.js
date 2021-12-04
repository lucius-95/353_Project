import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../../index'
import isEmpty from '../../../validation/isEmpty'

function DefaultLayout({ content }) {
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">{isEmpty(content) ? <AppContent /> : content}</div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
