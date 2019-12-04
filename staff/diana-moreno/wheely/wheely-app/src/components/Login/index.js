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
    <section class='login'>
    <header class='login__container'>
      <h1 class='login__title'>Wheely</h1>
    </header>

    <main  class='login__container'>
      <p class='login__subtitle'>Instructors and students area</p>
      <form class='login__form' onSubmit={loginFn}>
        <input type="text" name="email" placeholder="email" class='login__form-item'/>
        <input type="text" name="password" placeholder="password" class='login__form-item'/>
        <button class='login__button'>Enter</button>
      </form>
      {error && <Feedback message={error} />}
    </main>
  </section>
  )
}
