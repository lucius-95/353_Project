import React from 'react'
import CIcon from '@coreui/icons-react'
import { cibGithub, cibLinkedin } from '@coreui/icons'

function Member({ pic, name, github, linkedin }) {
  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
      <div className="our-team">
        <div className="picture">
          <img src={pic} alt={pic} />
        </div>
        <div className="team-content">
          <h3>{name}</h3>
          <h4>Software Engineering Student</h4>
        </div>
        <ul className="social">
          <li>
            <a href={github} target="_blank" rel="noreferrer" aria-hidden="true">
              <CIcon className="icon github" icon={cibGithub} size="xxl" />
            </a>
          </li>
          <li>
            <a href={linkedin} target="_blank" rel="noreferrer" aria-hidden="true">
              <CIcon className="icon linkedIn" icon={cibLinkedin} size="xxl" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Member
