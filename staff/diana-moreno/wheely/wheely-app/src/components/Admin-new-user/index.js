import React from 'react'
import './index.sass'
import Navbar from '../Navbar'

export default function () {
  return <>
    <Navbar />
    <section className='register'>
      <h3>Create a new user</h3>
      <p>All fields are required</p>
      <form className='register__form'>
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
        <button classNameName='form__button form__button--register'>Create account</button>
      </form>
    </section>
  </>
}
