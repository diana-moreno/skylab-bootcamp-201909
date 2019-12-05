import React, { useState, useEffect } from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom'
import { authenticateUser, registerUser, retrieveUser, listTasks, modifyTask, createTask, getToken, listUsers, retrieveOtherUser } from '../../logic'
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
  const [nameSurname, setNameSurname] = useState()
  const [feedback, setFeedback] = useState()
  const [user, setUser] = useState()
  const [role, setRole] = useState()
  const [id, setUserId] = useState()
  const [roleOwner, setRoleOwner] = useState()


/*  if(user) { const {name, surname, email, password, role, profile } = user }*/
  const { token } = sessionStorage

// when the page is reloaded, retrieve the user and save it into the state
  useEffect(() => {
    (async () => {
      try {
        if(token) {
          const user = await retrieveUser(token)
          const nameSurname = user.user.name.concat(' ').concat(user.user.surname)// cambiar user.user
          setUser(user)
          setUserId(user.user.id)
          setRoleOwner(user.user.role)
          setRole(user.user.role)
          setNameSurname(nameSurname)
          console.log(role)
        }
      }catch (error) {
        console.log(error)
      }
    })()
  }, [])

  const handleLogin = async (email, password) => {
    try {
      const token = await authenticateUser(email, password)
      sessionStorage.token = token
      const user = await retrieveUser(token)
      const nameSurname = user.user.name.concat(' ').concat(user.user.surname)
      setRole(user.user.role)
      setUser(user)
      setUserId(user.user.id)
      setRoleOwner(user.user.role)
      setNameSurname(nameSurname)
      history.push('/home')

    } catch (error) {
      console.error(error)
    }
  }

  const handleRegister = async (name, surname, email, password, role) => {
    try {
      const response = await registerUser(token, name, surname, email, password, role)
      setFeedback({ message: response })
    } catch ({message}) {
      setFeedback({ error: message })
    }
  }

  const handleRetrieveOtherUser = async (_id) => {
    try {
      const user = await retrieveOtherUser(token, _id)
      return user
    } catch (error) {
      console.error(error)
    }
  }

  const handleListUsers = async () => {
    try {
      const users = await listUsers(token)
      return users
    } catch (error) {

    }
  }



// bloquear ciertas pantallas para usuarios
  return <>

    <Context.Provider value={{ setFeedback, role }}>

      <Route exact path='/' render={() => <Login onLogin={handleLogin} />} />

      {token && role && <Navbar nameSurname={nameSurname}/> }

      <Route path='/home' render={() => <Home />} />

      <Route path = '/register' render={() => token && role === 'admin'
        ? <Register feedback={feedback} onRegister={handleRegister} />
        : <Redirect to="/" /> }
      /> {/* redirect to home?*/}

      { user && <Route path = '/account' render={() =>
        token
        ? <Account id={id} />
        : <Redirect to="/" /> }
      /> }

 {/*     { user && <Route path = '/profile' render={() =>
       <Profile user={user} /> }/> }*/}

      { user && <Route path='/profile/:id' render={({ match: { params: { id }}}) =>
        token && id ?  <Profile roleOwner={roleOwner} id={id} onRetrieveOtherUser={handleRetrieveOtherUser} /> : <Navbar nameSurname={nameSurname}/> } /> }


      {user && <Route path = '/users' render={() => <UsersList onListUsers={handleListUsers} /> }/> }


      <Route path = '/booking' render={() =>
        token ?<Booking /> : <Redirect to="/" /> }/>
      <Route path = '/credits' render={() =>
        token ?<Credits /> : <Redirect to="/" /> }/>
      <Route path = '/progression' render={() =>
        token ? <Progression /> : <Redirect to="/" /> }/>
      <Route path = '/schedule' render={() =>
        token ? <Schedule /> : <Redirect to="/" /> }/>
      <Route path = '/valoration' render={() =>
        token ? <Valoration /> : <Redirect to="/" /> }/>
      <Route path = '/reservations' render = {() => <Reservations /> }/>

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



