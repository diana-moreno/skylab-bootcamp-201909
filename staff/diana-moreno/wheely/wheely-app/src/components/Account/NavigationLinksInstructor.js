import { Link } from 'react-router-dom'
import React, { useContext } from 'react'
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

  return <>
    <Link to={`/reservations/${id}`}>
      <i className="material-icons detail-user__icon detail-user__icon--blue">search</i>
      <p>Reservations</p>
    </Link>
    { newRedirect ? adminRoute : normalRoute }
    <Link to={`/schedule/${id}`}>
      <i className="material-icons detail-user__icon detail-user__icon--blue">search</i>
      <p>Schedule</p>
    </Link>
  </>
}

export default NavigationLinksInstructor