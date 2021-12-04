import React, { Component } from 'react'
class OrganizationIntroduct extends Component {
  render() {
    return (
      <div className="body-organization">
        <div className="profile-card-hover">
          <div className="profile-card__content">
            <div className="about-company">
              <a className="profile-card__avatar" href="#">
                <img src="https://image.ibb.co/h8LN9K/ea.png" alt="Company Avatar" />
              </a>
              <div className="row-wrapper">
                <a className="profile-card__company-name" href="#">
                  EA Games
                </a>
                <p className="profile-card__company-bio">
                  Electronic Arts (EA) • Amesterdam Netherlands • 400,589 follwers
                </p>
                <a className="btn browse-jobs-btn" href="#">
                  See jobs
                </a>
              </div>
              <div className="user-actions">
                <button className="btn btn-small follow-btn" type="button">
                  <i className="icon plus-icon">
                    <svg>
                      xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                      version="1.1" x="0px" y="0px" viewBox="0 0 32 40" enable-background="new 0 0
                      32 32" xml:space="preserve"
                      <polygon points="32,14.5 17.5,14.5 17.5,0 14.5,0 14.5,14.5 0,14.5 0,17.5 14.5,17.5 14.5,32 17.5,32 17.5,17.5 32,17.5 " />
                    </svg>
                  </i>
                  <span>Follow</span>
                </button>
              </div>
            </div>
            <div className="row-wrapper">
              <span>3 friends are interested:</span>
              <div className="friends-avatars">
                <a href="#">
                  <img
                    src="data:image/jpeg;base64,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"
                    alt="User Avatar"
                  />
                </a>
                <a href="#">
                  <img
                    src="data:image/jpeg;base64,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"
                    alt="User Avatar"
                  />
                </a>
                <a href="#">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR4o7hylbjQlxoiYmtOBmWmbXlmOJW-tJkP_Q&amp;usqp=CAU"
                    alt="User Avatar"
                  />
                </a>
              </div>
              <a className="see-all-btn" href="#">
                See All
              </a>
            </div>
            <a className="ellipsis-horizontal-icon" href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                data-name="Layer 1"
                viewBox="0 0 100 125"
                x="0px"
                y="0px"
                fill="#9ba1ad"
                width="60px"
                height="60px"
              >
                <circle cx="31.14" cy="50" r="6.14"></circle>
                <circle cx="50" cy="50" r="6.14"></circle>
                <circle cx="68.86" cy="50" r="6.14"></circle>
              </svg>
            </a>
          </div>
        </div>
      </div>
    )
  }
}
export default OrganizationIntroduct
