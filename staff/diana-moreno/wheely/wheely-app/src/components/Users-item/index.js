import React from 'react'
import { Link } from 'react-router-dom'
import './index.sass'

export default function ({ currentUser }) {
  const { name, surname, role, _id } = currentUser

  return <>
    <li className='users__user'>
      <Link to={`/profile/${_id}`}>
        <i className="material-icons users__user-icon">
        {role === 'student' ? 'school' : 'directions_car'}</i>
        <p>{name} {surname}</p>
      </Link>
    </li>
  </>
}

