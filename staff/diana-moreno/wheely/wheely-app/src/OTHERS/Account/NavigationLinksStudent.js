import React, { Fragment } from 'react'
import { Link, Redirect } from 'react-router-dom'

const NavigationLinksStudent = () =>
  <Fragment>
    <div className='detail-user__input--separation-no-icon'>
      <p><b>Account: </b>student</p>
    </div>
    <div>
      <Link to="/reservations">
        <i className="material-icons detail-user__icon detail-user__icon--blue">search</i>
      </Link>
      <p>Reservations</p>
    </div>
    <div>
      <Link to="/credits">
        <i className="material-icons detail-user__icon detail-user__icon--blue">search</i>
      </Link>
      <p>Credits</p>
    </div>
    <div>
      <Link to="/progression">
        <i className="material-icons detail-user__icon detail-user__icon--blue">search</i>
      </Link>
      <p>Progression</p>
    </div>
  </Fragment>

export default NavigationLinksStudent