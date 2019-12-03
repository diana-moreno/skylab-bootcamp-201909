import React, { useState, useEffect } from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom'
import { authenticateUser, registerUser, retrieveUser, listTasks, modifyTask, createTask } from '../../logic'
import './index.sass'

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


export default withRouter(function({ history }) {
  const [name, setName] = useState()
  const [surname, setSurname] = useState()
  const [user, setUser] = useState()
  const [tasks, setTasks] = useState([])

/*  useEffect(() => {
    const { token } = sessionStorage;

    (async () => {
      if (token) {
        const { name, surname } = await retrieveUser(token)

        setSurname(surname)
        setName(name)

        await retrieveTasks(token)
      }
    })()
  }, [sessionStorage.token])
*/
/*  async function retrieveTasks(token) {
    const tasks = await listTasks(token)

    setTasks(tasks)
  }

  function handleGoToRegister() { history.push('/register') }

  function handleGoToLogin() { history.push('/login') }*/

  async function handleRegister(name, surname, email, password, role) {
    try {
      await registerUser(name, surname, email, password, role)
      /*history.push('/login')*/
    } catch (error) {
      console.error(error)
    }
  }

  async function handleLogin(email, password) {
    try {
      const token = await authenticateUser(email, password)

      sessionStorage.token = token

      history.push('/profile')
    } catch (error) {
      console.error(error)
    }
  }
/*
  function handleGoBack() { history.push('/') }

  function handleLogout() {
    sessionStorage.clear()

    handleGoBack()
  }

  async function handleChangeTaskStatus(id, status) {
    try {
      const { token } = sessionStorage

      await modifyTask(token, id, undefined, undefined, status)

      await retrieveTasks(token)
    } catch (error) {
      console.error(error)
    }
  }

  async function handleNewTask(title, description) {
    try {
      const { token } = sessionStorage

      await createTask(token, title, description)

      await retrieveTasks(token)
    } catch (error) {
      console.error(error)
    }
  }
*/
  const { token } = sessionStorage

  return <>
    <Route exact path='/' render={() => <Login onLogin={handleLogin} />} />
    <Route path = '/register' render={() => token ? <Register onRegister={handleRegister} /> : <Redirect to="/" /> }/>
    <Route path = '/booking' render={() => token ?<Booking /> : <Redirect to="/" /> }/>
    <Route path = '/account' render={() => token ? <Account /> : <Redirect to="/" /> }/>
    <Route path = '/profile' render={() => !token ? <Redirect to="/" /> : <Profile /> }/>
    <Route path = '/credits' render={() => token ?<Credits /> : <Redirect to="/" /> }/>
    <Route path = '/progression' render={() => token ? <Progression /> : <Redirect to="/" /> }/>
    <Route path = '/schedule' render={() => token ? <Schedule /> : <Redirect to="/" /> }/>
    <Route path = '/users' render={() => token ? <UsersList /> : <Redirect to="/" /> }/>
    <Route path = '/valoration' render={() => token ? <Valoration /> : <Redirect to="/" /> }/>
    <Route path = '/reservations' render = {() => <Reservations /> }/>
  </>
})


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



