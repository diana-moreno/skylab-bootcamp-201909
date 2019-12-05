import React, { Fragment, useContext, useEffect, useState } from 'react'
import './index.sass'
/*import NavbarItems from '../Navbar-items'*/
import Context from '../CreateContext'
import MenuStudent from './Menu-student'
import MenuInstructor from './Menu-instructor'
import MenuAdmin from './Menu-admin'

export default function({ nameSurname }) {
  const { role } = useContext(Context)
  const [toggleMenu, setToggleMenu] = useState(false)

  function handleToggleMenu() {
    setToggleMenu(!toggleMenu)
  }

  return (
    <header>
      <nav className='navbar'>
        <div className="navbar__menu-toggle">
          <div onClick={handleToggleMenu} className='navbar__lines-container' >
            <span className='navbar__line'></span>
            <span className='navbar__line'></span>
            <span className='navbar__line'></span>
          </div>
          <h1 className='navbar__title'>Wheely</h1>
          <ul className={!toggleMenu ? 'navbar__menu' : 'navbar__menu navbar__menu--show'}>
            {role === 'student' && <MenuStudent onToggleMenu={handleToggleMenu}/> }
            {role === 'instructor' && <MenuInstructor onToggleMenu={handleToggleMenu} /> }
            {role === 'admin' && <MenuAdmin onToggleMenu={handleToggleMenu} /> }
          </ul>
        </div>
      </nav>
      <div className='greeting'>
        <i className="material-icons greeting__rol-icon">supervisor_account</i>
        <h3 className='greeting__name'>{nameSurname}</h3>
      </div>
      {/*<h3 className='title'>Your account</h3>*/}
    </header>
  )
}