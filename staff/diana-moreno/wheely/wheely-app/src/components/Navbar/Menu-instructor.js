import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Context from '../CreateContext'

export default function({ onToggleMenu, onLogout }) {
  const { myId } = useContext(Context)

  return <>
    <li className='navbar__menu-item'>
      <Link onClick={onToggleMenu} to={`/home`}>Home</Link>
    </li>
    <li className='navbar__menu-item'>
      <Link onClick={onToggleMenu} to={`/account/${myId}`}>Your account</Link>
    </li>
    <li className='navbar__menu-item'>
      <Link to={'/'} onClick={onLogout} >Logout</Link>
    </li>
  </>
}
