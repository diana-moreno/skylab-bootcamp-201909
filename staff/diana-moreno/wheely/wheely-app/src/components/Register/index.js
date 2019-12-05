import React, { useContext, useEffect } from 'react'
import './index.sass'
import Navbar from '../Navbar'
import getToken from '../../logic/getToken'
import registerUser from '../../logic/register-user'
import Feedback from '../Feedback'
import Context from '../CreateContext'

export default function ({ onRegister, feedback }) {

  const { setFeedback } = useContext(Context)

  const registerFn = event => {
    event.preventDefault()
    const { name: { value: name }, surname: { value: surname }, email: { value: email }, password: { value: password }, role: { value: role } } = event.target
    onRegister(name, surname, email, password, role)
  }

  return <>
    <h3 className='title'>Register</h3>
    <section className='register'>
      <h3>Create a new user</h3>
      <p>All fields are required</p>
      <form className='register__form' onSubmit={registerFn}>
        <input type="text" name="name" placeholder="name" />
        <input type="text" name="surname" placeholder="surname" />
        <input type="text" name="email" placeholder="email" />
        <input type="password" name="password" placeholder="password" />
        <select name="role">
          <option value="">-- role --</option>
          <option value="student">student</option>
          <option value="instructor">instructor</option>
          <option value="admin">admin</option>
        </select>
        <button className='form__button form__button--register'>Create account</button>
      </form>
      {feedback && <Feedback feedback={feedback} />}
    </section>
  </>
}
