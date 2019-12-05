import React, { Fragment } from 'react'
import { Link, Redirect } from 'react-router-dom'

const NavigationLinksStudent = () =>
  <Fragment>
    <Link to="/reservations">
      <i className="material-icons detail-user__icon detail-user__icon--blue">search</i>
      <p>Reservations</p>
    </Link>
    <Link to="/credits">
      <i className="material-icons detail-user__icon detail-user__icon--blue">search</i>
      <p>Credits</p>
    </Link>
    <Link to="/progression">
      <i className="material-icons detail-user__icon detail-user__icon--blue">search</i>
      <p>Progression</p>
    </Link>
  </Fragment>

export default NavigationLinksStudent