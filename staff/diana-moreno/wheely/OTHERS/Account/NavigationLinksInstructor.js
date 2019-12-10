import React, { Fragment } from 'react'
import { Link, Redirect } from 'react-router-dom'

const NavigationLinksInstructor = () =>
  <Fragment>
    <div className='detail-user__input--separation-no-icon'>
      <p><b>Account: </b>instructor</p>
    </div>
    <div>
      <Link to="/reservations">
        <i className="material-icons detail-user__icon detail-user__icon--blue">search</i>
      </Link>
      <p>Reservations</p>
    </div>
    <div>
      <Link to="/users">
        <i className="material-icons detail-user__icon detail-user__icon--blue">search</i>
      </Link>
      <p>Your students</p>
    </div>
    <div>
      <Link to="/schedule">
        <i className="material-icons detail-user__icon detail-user__icon--blue">search</i>
      </Link>
      <p>Schedule</p>
    </div>
  </Fragment>

export default NavigationLinksInstructor