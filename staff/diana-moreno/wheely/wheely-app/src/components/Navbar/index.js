import React from 'react'
import './index.sass'
import NavbarItems from '../Navbar-items'

export default function() {
  return (
    <header>
      <nav role="navigation" className='navbar'>
        <div className="navbar__menu-toggle">
          <input type='checkbox' className="navbar__checkbox" />
          <span className='navbar__line'></span>
          <span className='navbar__line'></span>
          <span className='navbar__line'></span>
          <h1 className='navbar__title'>Wheely</h1>
          <ul className="navbar__menu">
            <NavbarItems />
            <NavbarItems />
            <NavbarItems />
          </ul>
        </div>
      </nav>
      <div className='greeting'>
        <i className="material-icons greeting__rol-icon">supervisor_account</i>
        <h3 className='greeting__name'>Luis Garcia</h3>
      </div>
      <h3 className='title'>Your account</h3>
    </header>
  )
}