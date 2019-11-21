import React from 'react'
import './index.sass'

export default function({ onRegister, onLogin }) {
  return <>
    <header className='login-title'>
      <h1>Tasksboard</h1>
    </header>
    <section className='landing'>
      <h2 className='landing__title'>Login to enter</h2>
      <form className='landing__form'>
        <input className='form__input' type="text" name="username"
          placeholder="email"/>
        <input className='form__input' type="password" name="password"
          placeholder="password"/>
        <button type='submit' className='form__button form__button--login'>Login</button>
      </form>
      <button className='form__button form__button--register'>Create account</button>
    </section>
  </>
}
