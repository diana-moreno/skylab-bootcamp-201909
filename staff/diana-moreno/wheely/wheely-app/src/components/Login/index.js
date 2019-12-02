import React from 'react'
import './index.sass'
import Feedback from '../Feedback'

export default function({error}) {
  return (
    <section class='login'>
      <header class='login__container'>
{/*          <img class='login__logo' src="./images/wheel.png" alt=""/>*/}
          <h1 class='login__title'>Wheely</h1>
      </header>

      <main  class='login__container'>
        <p class='login__subtitle'>Instructors and students area</p>
        <form action="" class='login__form'>
          <input type="text" name="email" placeholder="email" class='login__form-item'/>
          <input type="text" name="password" placeholder="password" class='login__form-item'/>
          <button class='login__button'>Enter</button>
        </form>
        {error && <Feedback message={error} />}
      </main>
    </section>
  )
}
