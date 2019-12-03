import React, { useState, useEffect } from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom'
import { authenticateUser, registerUser, retrieveUser, listTasks, modifyTask, createTask, getToken } from '../../logic'
import './index.sass'
import Context from '../CreateContext'

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

/*import retrieveDataUser from '../../logic/retrieveDataUser'*/


export default withRouter(function({ history }) {
  const [nameSurname, setNameSurname] = useState()
  const [feedback, setFeedback] = useState()
  const [user, setUser] = useState()
  if(user) { const {name, surname, email, password, role, profile } = user }
  const { token } = sessionStorage

// when the page is reloaded, retrieve the user and save it into the state
  useEffect(() => {
    (async () => {
      try {
        if(token) {
          const user = await retrieveUser(token)
          const nameSurname = user.user.name.concat(' ').concat(user.user.surname)
          setUser(user)
          setNameSurname(nameSurname)
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
      setUser(user)
      history.push('/account')

    } catch (error) {
      console.error(error)
    }
  }

  const handleRegister = async (name, surname, email, password, role) => {
    try {
      debugger
      const response = await registerUser(token, name, surname, email, password, role)
      setFeedback({ message: response })
    } catch ({message}) {
      setFeedback({ error: message })
    }
  }

  return <>
      <Route exact path='/' render={() =>
        <Login onLogin={handleLogin} />} />
      {token && <Navbar nameSurname={nameSurname}/> }
      <Route path = '/register' render={() =>
        token ? <Register feedback={feedback} onRegister={handleRegister} /> : <Redirect to="/" /> }/>
      <Route path = '/booking' render={() =>
        token ?<Booking /> : <Redirect to="/" /> }/>
      <Route path = '/account' render={() =>
        token ? <Account /> : <Redirect to="/" /> }/>
      <Route path = '/profile' render={() =>
        !token ? <Redirect to="/" /> : <Profile /> }/>
      <Route path = '/credits' render={() =>
        token ?<Credits /> : <Redirect to="/" /> }/>
      <Route path = '/progression' render={() =>
        token ? <Progression /> : <Redirect to="/" /> }/>
      <Route path = '/schedule' render={() =>
        token ? <Schedule /> : <Redirect to="/" /> }/>
      <Route path = '/users' render={() =>
        token ? <UsersList /> : <Redirect to="/" /> }/>
      <Route path = '/valoration' render={() =>
        token ? <Valoration /> : <Redirect to="/" /> }/>
      <Route path = '/reservations' render = {() => <Reservations /> }/>
  </>
})

{/*    <Context.Provider value={{setFeedback, role, nameSurname}}>*/}
/*    </Context.Provider>*/


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



