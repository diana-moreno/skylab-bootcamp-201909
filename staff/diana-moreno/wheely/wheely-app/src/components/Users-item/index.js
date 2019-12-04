import React from 'react'
import { Link } from 'react-router-dom'
import './index.sass'

export default function ({ currentUser }) {
  const { name, surname, role, _id } = currentUser
debugger
  return <>
    <li class='users__user'>
      <Link to={`/profile/${_id}`}>

        <i class="material-icons users__user-icon">
        {role === 'student' ? 'school' : 'directions_car'}</i>
        <p>{name} {surname}</p>
      </Link>
    </li>

{/*        <li class='users__user'>
          <i class="material-icons users__user-icon">school</i>
          <p>Daniel García López</p>
        </li>
        <li class='users__user'>
          <i class="material-icons users__user-icon">directions_car</i>
          <p>David Peña Pascual</p>
        </li>
        <li class='users__user '>
          <i class="material-icons users__user-icon">school</i>
          <p>Laura Pestaña Antón</p>
        </li>
        <li class='users__user'>
          <i class="material-icons users__user-icon">directions_car</i>
          <p>David Peña Pascual</p>
        </li>*/}
  </>
}

