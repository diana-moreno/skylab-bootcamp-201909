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
  const [roleOwner, setRoleOwner] = useState(undefined)

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
        }
      }catch (error) {
        console.log(error)
      }
    })()
  }, [roleOwner])

/*  const handleLogin = async (email, password) => {
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
  }*/

/*  const handleRegister = async (name, surname, email, password, role) => {
    try {
      const response = await registerUser(token, name, surname, email, password, role)
      setFeedback({ message: response })
    } catch ({message}) {
      setFeedback({ error: message })
    }
  }*/

/*  const handleRetrieveOtherUser = async (_id) => {
    try {
      const user = await retrieveOtherUser(token, _id)
      return user
    } catch (error) {
      console.error(error)
    }
  }  // propio*/

/*  const handleListUsers = async () => {
    try {
      const users = await listUsers(token)
      return users
    } catch (error) {

    }
  } // propio*/

  const handleGoBack = (event) => {
    history.goBack()
  }




// bloquear ciertas pantallas para usuarios
  return <>
    <Context.Provider value={{ roleOwner, setRoleOwner, nameSurname, setNameSurname, id }}>

      <Route exact path='/' render={() => <Login />} />
      {token && roleOwner && <Navbar /> }

      {token && <Route path='/home' render={() => <Home />} />}


      {token && roleOwner === 'admin' && <Route path = '/register' render={() => <Register /> }/> }

      { roleOwner && <Route path = '/account' render={() => token
        ? <Account id={id} /*onBack={handleGoBack}*/ />
        : <Redirect to="/" /> }
      /> }
      { roleOwner && <Route path='/profile/:id' render={({ match: { params: { id }}}) => token && id
        ? <Profile roleOwner={roleOwner} id={id} onBack={handleGoBack}  />
        : <Navbar nameSurname={nameSurname}/> } /> }

      {roleOwner && <Route path = '/users' render={() => <UsersList onBack={handleGoBack} /> }/> }
      <Route path = '/booking' render={() =>
        token ? <Booking onBack={handleGoBack}  /> : <Redirect to="/" /> }/>
      <Route path = '/credits' render={() =>
        token ?<Credits onBack={handleGoBack}  /> : <Redirect to="/" /> }/>
      <Route path = '/progression' render={() =>
        token ? <Progression onBack={handleGoBack} /> : <Redirect to="/" /> }/>
      <Route path = '/schedule' render={() =>
        token ? <Schedule onBack={handleGoBack} /> : <Redirect to="/" /> }/>
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



