import React, { useState, useEffect } from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom'
import { authenticateUser, registerUser, retrieveUser, getToken, listUsers, retrieveOtherUser } from '../../logic'
import './index.sass'
import Context from '../CreateContext'

import Home from '../Home'
import Login from '../Login'
import Reservations from '../Reservations' // double
import Booking from '../Booking'
import Credits from '../Credits'
import Progression from '../Progression'
import Schedule from '../Schedule'
import UsersList from '../Users-list' // double
import Register from '../Register'
import Valoration from '../Valoration'
import Account from '../Account' // double
import Profile from '../Profile'
import Navbar from '../Navbar'

export default withRouter(function({ history }) {
/*  const [user, setUser] = useState()*/
  const [nameSurname, setNameSurname] = useState()
  const [myId, setMyId] = useState()
  const [roleOwner, setRoleOwner] = useState(undefined)
  const [credits, setCredits] = useState()

  const { token } = sessionStorage

// paso por contexto el nombre, el rol del propietario y sus respectivo seteadores. En el useEffect general de App, le digo que cuando cambie el roleOwner, se actualice, recogiendo al usuario y guardándolo en el state. A partir de ahora, tengo acceso a mi usuario desde cualquier punto de la aplicación, pasando el state por props.

// when the page is reloaded, retrieve the user and save it into the state
  useEffect(() => {
    (async () => {
      try {
        if(token) {
          const user = await retrieveUser(token)
          const nameSurname = user.user.name.concat(' ').concat(user.user.surname)// cambiar user.user
          setMyId(user.user.id) // to retrieve my profile
          setRoleOwner(user.user.role)
          setNameSurname(nameSurname)
          setCredits(user.user.profile.credits)
        }
      }catch (error) {
        console.log(error)
      }
    })()
  }, [roleOwner])


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

      {token && (roleOwner === 'instructor' || roleOwner === 'student') && <Route path = '/register' render={() => <Home /> }/> }

      {!token && <Route path = '/register' render={() => <Login /> }/>}

      { token && roleOwner === 'student' && <Route path='/account/:id' render={({ match: { params: { id }}}) => token && id === myId
        ? <Account id={id} onBack={handleGoBack}  />
        : <Home /> } /> }


      { token && (roleOwner === 'instructor' || roleOwner === 'admin') && <Route exact path='/account/:id/' render={({ match: { params: { id }}}) => token && id
        ? <Account id={id} onBack={handleGoBack}  />
        : <Home /> } /> }

      { /* account/id/users desde admin */ }
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

{/*      { !token && <Route path='/account/:id' render={({ match: { params: { id }}}) => <Login /> } /> }*/}


      { /* Profile */ }
      { token && roleOwner === 'student' && <Route path='/profile/:id' render={({ match: { params: { id }}}) => token && id === myId
        ? <Profile roleOwner={roleOwner} id={id} onBack={handleGoBack}  />
        : <Home /> } /> }

      { /* Profile */ }
      { token && (roleOwner === 'instructor' || roleOwner === 'admin') && <Route path='/profile/:id' render={({ match: { params: { id }}}) => token && id
        ? <Profile roleOwner={roleOwner} id={id} onBack={handleGoBack}  />
        : <Home /> } /> }


      {roleOwner && <Route path = '/users' render={() => <UsersList onBack={handleGoBack} /> }/> }
      {token && <Route path = '/booking' render={() =>
        token ? <Booking onBack={handleGoBack}  /> : '' }/>}

      {token && roleOwner === 'student' && <Route path = '/credits' render={() =>
        token ?<Credits onBack={handleGoBack} credits={credits} /> : '' }/>}

{/*      <Route path = '/progression' render={() =>
        token ? <Progression onBack={handleGoBack} user={user} /> : <Redirect to="/" /> }/>
*/}

     { roleOwner && <Route path='/progression/:id' render={({ match: { params: { id }}}) => token && id
        ? <Progression id={id} onBack={handleGoBack} id={id} />
        : <Navbar nameSurname={nameSurname}/> } /> }

      { token && (roleOwner === 'admin' || roleOwner === 'instructor') && <Route path='/schedule/:id' render={({ match: { params: { id }}}) => token && id
        ? <Schedule roleOwner={roleOwner} id={id} onBack={handleGoBack}  />
        : <Home /> } /> }

      <Route path = '/valoration' render={() =>
        token ? <Valoration onBack={handleGoBack}  /> : <Redirect to="/" /> }/>
      <Route path = '/reservations' render = {() => <Reservations onBack={handleGoBack} /> }/>

    </Context.Provider>
  </>
})



{/*      <Route path = '/profile' render={() =>
        !token && !user ? <Redirect to="/" /> : <Profile onRetrieveUser={handleRetrieveUser} user={user} /> }/>
*/}

  {
    /*
    <Route path = '/account' render={() => <Account /> }/>



    <Route path = '/student-account' render={() => <StudentAccount /> }/>
           <Route path='/detail-instructor' render={() => <AdminDetailStudent />} />
           <Route path='/detail-instructor' render={() => <AdminNewUser />} />
           */
  }


  {
    /*
           {/* <Route exact path="/" render={() => token ? <Redirect to="/login" /> : <Landing onRegister={handleGoToRegister} onLogin={handleGoToLogin} />} />
            <Route path="/register" render={() => token ? <Redirect to="/board" /> : <Register onRegister={handleRegister} onBack={handleGoBack} />} />
            <Route path="/login" render={() => token ? <Redirect to="/board" /> : <Login onLogin={handleLogin} onBack={handleGoBack} />} />
            <Route path="/board" render={() => token ? <Board user={name} tasks={tasks} onLogout={handleLogout} onChangeTaskStatus={handleChangeTaskStatus} onNewTask={handleNewTask} /> : <Redirect to="/" />} />
             <Route path="/hello/:name" render={props => <Hello name={props.match.params.name} />} />
            <Route path="/hello/:name" render={({ match: { params: { name } } }) => <Hello name={name} />} />*/
  }



