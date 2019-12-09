import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import './index.sass'

import Context from '../CreateContext'



export default function ({ currentUser }) {
  const { roleOwner } = useContext(Context)
  const { name, surname, role, _id } = currentUser // sanitize _id in API!!

  return <>
    <li className='users__user'>
      <Link to={ roleOwner === 'admin' ? `/account/${_id}` : `/progression/${_id}`}>
        <i className="material-icons users__user-icon">
        {role === 'student' ? 'school' : 'directions_car'}</i>
        <p>{name} {surname}</p>
      </Link>
    </li>
  </>
}

