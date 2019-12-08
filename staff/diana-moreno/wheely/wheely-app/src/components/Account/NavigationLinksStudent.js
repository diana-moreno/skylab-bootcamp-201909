import React, { Fragment, useContext, useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Context from '../CreateContext'

const NavigationLinksStudent = ({ id }) => {
  const { roleOwner } = useContext(Context)

  return <Fragment>
    <Link to={`/reservations/${id}`}>
      <i className="material-icons detail-user__icon detail-user__icon--blue">search</i>
      <p>Reservations</p>
    </Link>
    {roleOwner === 'student' && <Link to="/credits">
      <i className="material-icons detail-user__icon detail-user__icon--blue">search</i>
      <p>Credits</p>
    </Link>}
    <Link to={`/progression/${id}`}>
      <i className="material-icons detail-user__icon detail-user__icon--blue">search</i>
      <p>Progression</p>
    </Link>
  </Fragment>
}
export default NavigationLinksStudent