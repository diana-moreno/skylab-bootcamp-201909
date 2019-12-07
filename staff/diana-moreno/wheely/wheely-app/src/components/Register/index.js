import React, { useContext, useEffect } from 'react'
import './index.sass'
import Navbar from '../Navbar'
import getToken from '../../logic/getToken'
import registerUser from '../../logic/register-user'
import Feedback from '../Feedback'
import Context from '../CreateContext'
import { Link , withRouter } from 'react-router-dom'

export default withRouter(function({ error, history }) {
  const { token } = sessionStorage
  const { setFeedback, roleOwner } = useContext(Context)

  const handleSubmit = event => {
    event.preventDefault()
    const { name: { value: name }, surname: { value: surname }, email: { value: email }, dni: { value: dni }, password: { value: password }, role: { value: role } } = event.target
    handleRegister(name, surname, email, dni, password, role)
  }

  const handleRegister = async (name, surname, email, dni, password, role) => {
    try {
      const response = await registerUser(token, name, surname, email, dni, password, role)
    /*  setFeedback({ message: response })*/
    } catch ({message}) {
   /*   setFeedback({ error: message })*/
    }
  }
{/*onClick={history.goBack()}*/}
  return <>
    <div className='title'>
      <i onClick={() => history.goBack()} className="material-icons">undo</i>
      <h3>Register</h3>
    </div>
    <section className='register'>
      <h3>Create a new user</h3>
      <p>All fields are required</p>
      <form className='register__form' onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="name" />
        <input type="text" name="surname" placeholder="surname" />
        <input type="text" name="email" placeholder="email" />
        <input type="text" name="dni" placeholder="DNI" />
        <input type="password" name="password" placeholder="password" />
        <select name="role">
          <option value="">-- role --</option>
          <option value="student">student</option>
          <option value="instructor">instructor</option>
          <option value="admin">admin</option>
        </select>
        <button className='form__button form__button--register'>Create account</button>
      </form>
{/*      {feedback && <Feedback feedback={feedback} />}*/}
    </section>
  </>
})
