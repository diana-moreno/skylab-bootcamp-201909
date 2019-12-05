import React from 'react'
import { Link } from 'react-router-dom'
/*import './index.sass'*/

export default function({ onToggleMenu }) {


debugger
  return <>
    <li className='navbar__menu-item'>
      <Link onClick={onToggleMenu} to={`/home`}>Home</Link>
    </li>
    <li className='navbar__menu-item'>
      <Link onClick={onToggleMenu} to={`/booking`}>Booking</Link>
    </li>
    <li className='navbar__menu-item'>
      <Link onClick={onToggleMenu} to={`/account`}>Your account</Link>
    </li>
    <li className='navbar__menu-item'>
      <Link onClick={onToggleMenu} to={`/`}>Logout</Link>
    </li>
  </>
}
