import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Context from '../CreateContext'

const NavigationLinksStudent = ({ id }) => {
  const { roleOwner } = useContext(Context)

  return <>
    <Link to={`/reservations/${id}`}>
      <i className="material-icons detail-user__icon detail-user__icon--blue">search</i>
      <p>Reservations</p>
    </Link>
    {roleOwner === 'student' && <Link to={`/credits/${id}`}>
      <i className="material-icons detail-user__icon detail-user__icon--blue">search</i>
      <p>Credits</p>
    </Link>}
    <Link to={`/progression/${id}`}>
      <i className="material-icons detail-user__icon detail-user__icon--blue">search</i>
      <p>Progression</p>
    </Link>
  </>
}
export default NavigationLinksStudent

// es correcto que todo dependa de id??