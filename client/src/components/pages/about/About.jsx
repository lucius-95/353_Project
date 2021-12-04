import React, { Component } from 'react'
import Paragraph from './Paragraph'
import Member from './Member'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getTeam } from '../../../action/teamAction'
import Loader from '../../common/Loader'

class About extends Component {
  componentDidMount() {
    this.props.getTeam()
  }

  render() {
    let { team } = this.props.team
    let members
    if (team === null) {
      members = <Loader />
    } else if (Object.keys(team).length > 0) {
      members = (
        <div className="row">
          <Member
            pic={team[0].pic}
            name={team[0].name}
            github={team[0].github}
            linkedin={team[0].linkedin}
          />
          <Member
            pic={team[1].pic}
            name={team[1].name}
            github={team[1].github}
            linkedin={team[1].linkedin}
          />
          <Member
            pic={team[2].pic}
            name={team[2].name}
            github={team[2].github}
            linkedin={team[2].linkedin}
          />
          <Member
            pic={team[3].pic}
            name={team[3].name}
            github={team[3].github}
            linkedin={team[3].linkedin}
          />
        </div>
      )
    }

    return (
      <div id="parallax-world-of-ugg">
        <section>
          <h1>
            Nomosnow
            <Link to="/login">
              <button className="button">Login/Register</button>
            </Link>
          </h1>
        </section>

        <section>
          <div className="parallax one">
            <h2>WHO WE ARE</h2>
          </div>
        </section>

        <section>
          <Paragraph
            header="A Group Of Engineering Students"
            first="We are from the University of Saskatchewan and currently
              enrolled in the 2021 class of CMPT353. This class entails the learning
              development of all components in a working website, Fullstack Development,
              and as a project given from our professors we came together to create this
               small sized project in the span of 1 month."
          />
        </section>

        <section>
          <div className="parallax two">
            <h2>WHAT WE DO</h2>
          </div>
        </section>

        <section>
          <Paragraph
            header="A Center for Organizations"
            first="This project was designed in order to assist and create a central hub
              for an organization to use and operate within. It provides an owner and several staff
              the ability to see its customers or the organization and provide actions such as
               hiring staff to be held within the website. This project was designed using a multitude
              of languages and libraries/packages. It also contains a three stage architecture where
              the website communicates between a webserver and database. As a whole this project
              contains the collective knowledge of CSS, HTML, Javascript, NodeJS, MongoDB, React,
              Redux, and Heroku."
          />
        </section>

        <section>
          <div className="ourTeam-bg">
            <h2>OUR TEAM</h2>
            <div className="ourTeam-list">
              <div className="container">{members}</div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

About.propTypes = {
  team: PropTypes.object.isRequired,
  getTeam: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  team: state.team,
})

export default connect(mapStateToProps, { getTeam })(About)
