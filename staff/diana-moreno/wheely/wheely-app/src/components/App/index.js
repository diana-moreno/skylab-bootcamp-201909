import React, { useState, useEffect } from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom'
import { retrieveUser } from '../../logic'
import './index.sass'
import Context from '../CreateContext'

import Home from '../Home'
import Login from '../Login'
import Reservations from '../Reservations'
import Booking from '../Booking'
import Credits from '../Credits'
import Progression from '../Progression'
import Schedule from '../Schedule'
import UsersList from '../Users-list'
import Register from '../Register'
import Valoration from '../Valoration'
import Account from '../Account'
import Profile from '../Profile'
import Navbar from '../Navbar'
import ReservationDetail from '../Reservation-detail'

export default withRouter(function({ history }) {
  const [nameSurname, setNameSurname] = useState()
  const [myId, setMyId] = useState()
  const [roleOwner, setRoleOwner] = useState(undefined)
  const [credits, setCredits] = useState()

  const { token } = sessionStorage

// when the page is reloaded, retrieve the user and save it into the state
  useEffect(() => {
    (async () => {
      try {
        if(token) {
          const result = await retrieveUser(token)
          // retrieve and save in state my profile
          const { user: {id, name, surname, role }} = result
          const nameSurname = name.concat(' ').concat(surname)
          setMyId(id)
          setRoleOwner(role)
          setNameSurname(nameSurname)
          if(roleOwner === 'student') {
            const { profile: { credits }} = result
            setCredits(credits)
          }
        }
      }catch (error) {
        console.log(error)
      }
    })()
  }, [])


  const handleGoBack = (event) => {
    history.goBack()
  }

  const OnlyLoggedIn = (Component, props) =>
    token ? <Component {...props} />
    : <Redirect to="/" />

  const OnlyAdmin = (Component, props) =>
    roleOwner === 'admin'
      ? <Component {...props} />
      : <Home />

// bloquear ciertas pantallas para usuarios
  return <>
    <Context.Provider value={{ roleOwner, setRoleOwner, nameSurname, setNameSurname, setMyId, myId }}>

      <Route exact path='/' render={() => <Login />} />
      {token && roleOwner && <Navbar /> }

      {token && <Route path='/home' render={() => <Home />} />}

      {token && roleOwner === 'admin' && <Route path = '/register' render={() => <Register /> }/> }

{/*      {token && (roleOwner === 'instructor' || roleOwner === 'student') && <Route path = '/register' render={() => <Home /> }/> }*/}

{/*      {!token && <Route path = '/register' render={() => <Login /> }/>}*/}

      { token && roleOwner === 'student' && <Route path='/account/:id' render={({ match: { params: { id }}}) => token && id === myId
        ? <Account id={id} onBack={handleGoBack}  />
        : <Home /> } /> }


      { token && (roleOwner === 'instructor' || roleOwner === 'admin') && <Route exact path='/account/:id/' render={({ match: { params: { id }}}) => token && id
        ? <Account id={id} onBack={handleGoBack}  />
        : <Home /> } /> }

      {
        token && roleOwner === 'admin'
          ? (<Route
              path='/account/:id/users/'
              render={({ match: { params: { id }}}) => id
                ? <UsersList id={id} onBack={handleGoBack}  />
                : <Home /> }
            />)
          : ''
      }

      { /* Profile */ }
      { token && roleOwner === 'student' && <Route path='/profile/:id' render={({ match: { params: { id }}}) => token && id === myId
        ? <Profile roleOwner={roleOwner} id={id} onBack={handleGoBack}  />
        : <Home /> } /> }

      { /* Profile */ }
      { token && (roleOwner === 'instructor' || roleOwner === 'admin') && <Route path='/profile/:id' render={({ match: { params: { id }}}) => token && id
        ? <Profile roleOwner={roleOwner} id={id} onBack={handleGoBack}  />
        : <Home /> } /> }


      {(roleOwner === 'admin' || roleOwner === 'instructor') && <Route path = '/users' render={() => <UsersList onBack={handleGoBack} /> }/> }

      {token && roleOwner === 'student' && <Route path = '/booking'
        render={() => token ? <Booking onBack={handleGoBack}  /> : '' }/>}

      {token && roleOwner === 'student' && <Route path = '/credits' render={() =>
        token ? <Credits onBack={handleGoBack} credits={credits} /> : '' }/>}


     { roleOwner && <Route path='/progression/:id' render={({ match: { params: { id }}}) => token && id
        ? <Progression id={id} onBack={handleGoBack} />
        : <Navbar nameSurname={nameSurname}/> } /> }

      { token && (roleOwner === 'admin' || roleOwner === 'instructor') && <Route path='/schedule/:id' render={({ match: { params: { id }}}) => token && id
        ? <Schedule roleOwner={roleOwner} id={id} onBack={handleGoBack}  />
        : <Home /> } /> }

      { token && roleOwner === 'instructor' && <Route path='/valoration/:id' render={({ match: { params: { id }}}) => token
        ? <Valoration id={id} onBack={handleGoBack}  />
        : <Home /> } /> }

      { roleOwner && <Route path='/reservations/:id' render={({ match: { params: { id }}}) => token && id
        ? <Reservations id={id} onBack={handleGoBack} />
        : '' } /> }

      { (roleOwner === 'instructor' || roleOwner === 'student') && <Route path='/reservation-detail/:id' render={({ match: { params: { id }}}) => token && id
        ? <ReservationDetail id={id} onBack={handleGoBack} />
        : '' } /> }

    </Context.Provider>
  </>
})


