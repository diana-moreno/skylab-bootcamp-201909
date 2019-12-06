import { Link, Redirect } from 'react-router-dom'
import React, { Fragment, useContext, useState, useEffect } from 'react'
import Context from '../CreateContext'


const NavigationLinksInstructor = ({ id }) => {
  const { roleOwner } = useContext(Context)

  const newRedirect = roleOwner === 'admin'

  const adminRoute = (
    <Link to={`/account/${id}/users/`}>
      <i className="material-icons detail-user__icon detail-user__icon--blue">search</i>
      <p>The instructor students</p>
    </Link>
  )

  const normalRoute = (
    <Link to="/users">
      <i className="material-icons detail-user__icon detail-user__icon--blue">search</i>
      <p>Your students</p>
    </Link>
  )

  return <Fragment>
    <Link to="/reservations">
      <i className="material-icons detail-user__icon detail-user__icon--blue">search</i>
      <p>Reservations</p>
    </Link>
    { newRedirect ? adminRoute : normalRoute }
    <Link to="/schedule">
      <i className="material-icons detail-user__icon detail-user__icon--blue">search</i>
      <p>Schedule</p>
    </Link>
  </Fragment>
}

export default NavigationLinksInstructor