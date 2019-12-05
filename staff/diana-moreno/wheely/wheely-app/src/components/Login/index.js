import React from 'react'
import './index.sass'
import Feedback from '../Feedback'
import { Link } from 'react-router-dom'

export default function({ onLogin, error }) {

  const loginFn = event => {
    event.preventDefault()
    const { email: { value: email }, password: { value: password } } = event.target
    onLogin(email, password)
  }

  return (
    <section className='login'>
    <header className='login__container'>
      <h1 className='login__title'>Wheely</h1>
    </header>

    <main  className='login__container'>
      <p className='login__subtitle'>Instructors and students area</p>
      <form className='login__form' onSubmit={loginFn}>
        <input type="text" name="email" placeholder="email" className='login__form-item'/>
        <input type="text" name="password" placeholder="password" className='login__form-item'/>
        <button className='login__button'>Enter</button>
      </form>
      {error && <Feedback message={error} />}
    </main>
  </section>
  )
}
