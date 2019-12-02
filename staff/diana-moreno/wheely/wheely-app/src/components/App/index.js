import React, { useState, useEffect } from 'react';
import './index.sass'
import { Route, withRouter, Redirect } from 'react-router-dom'
import { authenticateUser, registerUser, retrieveUser, listTasks, modifyTask, createTask } from '../../logic'
/*import Hello from '../Hello'*/

// componentizado
import Login from '../Login'
import ReservationsList from '../Reservations-list'
import Booking from '../Booking'
import Credits from '../Credits'
import Progression from '../Progression'
import Schedule from '../Schedule'
import UsersList from '../Users-list'


import StudentYourAccount from '../Student-your-account'

import AdminDetailInstructor from '../Admin-detail-instructor'
import AdminDetailStudent from '../Admin-detail-student'
import AdminNewUser from '../Admin-new-user'

import InstructorMessageFeedback from '../Instructor-message-feedback'
import InstructorYourAccount from '../Instructor-your-account'
import InstructorStatistics from '../Instructor-statistics' // no logic yet
import InstructorStudents from '../Instructor-students' // same as user list with different behavior ???






export default withRouter(function ({ history }) {
    const [name, setName] = useState()
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        const { token } = sessionStorage;

        (async () => {
            if (token) {
                const { name } = await retrieveUser(token)

                setName(name)

                await retrieveTasks(token)
            }
        })()
    }, [sessionStorage.token])

    async function retrieveTasks(token) {
        const tasks = await listTasks(token)

        setTasks(tasks)
    }

    function handleGoToRegister() { history.push('/register') }

    function handleGoToLogin() { history.push('/login') }

    async function handleRegister(name, surname, email, username, password) {
        try {
            await registerUser(name, surname, email, username, password)

            history.push('/login')
        } catch (error) {
            console.error(error)
        }
    }

    async function handleLogin(username, password) {
        try {
            const token = await authenticateUser(username, password)

            sessionStorage.token = token

            history.push('/board')
        } catch (error) {
            console.error(error)
        }
    }

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

    const { token } = sessionStorage

    return <>
       <Route exact path='/' render={() => <InstructorStudents />} />
       <Route path='/detail-instructor' render={() => <AdminDetailInstructor />} />
       <Route path='/detail-instructor' render={() => <AdminDetailStudent />} />
       <Route path='/detail-instructor' render={() => <AdminNewUser />} />


{/*
       {/* <Route exact path="/" render={() => token ? <Redirect to="/login" /> : <Landing onRegister={handleGoToRegister} onLogin={handleGoToLogin} />} />
        <Route path="/register" render={() => token ? <Redirect to="/board" /> : <Register onRegister={handleRegister} onBack={handleGoBack} />} />
        <Route path="/login" render={() => token ? <Redirect to="/board" /> : <Login onLogin={handleLogin} onBack={handleGoBack} />} />
        <Route path="/board" render={() => token ? <Board user={name} tasks={tasks} onLogout={handleLogout} onChangeTaskStatus={handleChangeTaskStatus} onNewTask={handleNewTask} /> : <Redirect to="/" />} />
         <Route path="/hello/:name" render={props => <Hello name={props.match.params.name} />} />
        <Route path="/hello/:name" render={({ match: { params: { name } } }) => <Hello name={name} />} />*/}

    </>
})
