import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="/" target="_blank" rel="noopener noreferrer">
          CMPT353 Team
        </a>
        <span className="ms-1">&copy; 2021 Project</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="/" target="_blank" rel="noopener noreferrer">
          Nomosnow
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
