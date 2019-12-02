
import React from 'react'
import './index.sass'
import Navbar from '../Navbar'

export default function () {
  return <>
    <Navbar />
    <section class='users'>
      <form class='users__searcher' action="">
        <input class='users__searcher-input' type="text" placeholder="search an student"/>
        <button class='users__searcher-button'>Search</button>
      </form>
      <ul>
        <li class='users__user'>
          <i class="material-icons users__user-icon">account_circle</i>
          <p>Daniel García López</p>
        </li>
        <li class='users__user'>
          <i class="material-icons users__user-icon">account_circle</i>
          <p>David Peña Pascual</p>
        </li>
        <li class='users__user '>
          <i class="material-icons users__user-icon">account_circle</i>
          <p>Laura Pestaña Antón</p>
        </li>
      </ul>
    </section>
  </>
}

