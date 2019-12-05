import React from 'react'
import { Link } from 'react-router-dom'
/*import './index.sass'*/

export default function({ onToggleMenu, onLogout }) {
  return <>
    <li className='navbar__menu-item'>
      <Link onClick={onToggleMenu} to={`/home`}>Home</Link>
    </li>
    <li className='navbar__menu-item'>
      <Link onClick={onToggleMenu} to={`/account`}>Your account</Link>
    </li>
    <li className='navbar__menu-item'>
      <Link to={'/'} onClick={onLogout} >Logout</Link>
    </li>
  </>
}
