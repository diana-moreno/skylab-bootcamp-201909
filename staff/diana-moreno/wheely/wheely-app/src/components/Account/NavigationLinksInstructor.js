import React, { Fragment } from 'react'
import { Link, Redirect } from 'react-router-dom'

const NavigationLinksInstructor = () =>
  <Fragment>
    <Link to="/reservations">
      <i className="material-icons detail-user__icon detail-user__icon--blue">search</i>
      <p>Reservations</p>
    </Link>
    <Link to="/users">
      <i className="material-icons detail-user__icon detail-user__icon--blue">search</i>
      <p>Your students</p>
    </Link>
    <Link to="/schedule">
      <i className="material-icons detail-user__icon detail-user__icon--blue">search</i>
      <p>Schedule</p>
    </Link>
  </Fragment>

export default NavigationLinksInstructor