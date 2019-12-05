import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './index.sass'

import Context from '../CreateContext'



export default function ({ currentUser }) {
  const { roleOwner } = useContext(Context)
  debugger
  const { name, surname, role, _id } = currentUser

  return <>
    <li className='users__user'>
      <Link to={ roleOwner === 'admin' ? `/profile/${_id}` : `/progression`}>
        <i className="material-icons users__user-icon">
        {role === 'student' ? 'school' : 'directions_car'}</i>
        <p>{name} {surname}</p>
      </Link>
    </li>
  </>
}

