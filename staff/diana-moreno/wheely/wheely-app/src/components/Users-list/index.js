import React from 'react'
import './index.sass'
import Navbar from '../Navbar'
import UsersItem from '../Users-item'

export default function () {
  return <>
    <section class='users'>
      <form class='users__searcher' action="">
        <input class='users__searcher-input' type="text" placeholder="search user"/>
        <button class='users__searcher-button'>Search</button>
      </form>
      <ul>
        <UsersItem />
        <UsersItem />
        <UsersItem />
        <UsersItem />
{/*        <li class='users__user'>
          <i class="material-icons users__user-icon">school</i>
          <p>Daniel García López</p>
        </li>
        <li class='users__user'>
          <i class="material-icons users__user-icon">directions_car</i>
          <p>David Peña Pascual</p>
        </li>
        <li class='users__user '>
          <i class="material-icons users__user-icon">school</i>
          <p>Laura Pestaña Antón</p>
        </li>
        <li class='users__user'>
          <i class="material-icons users__user-icon">directions_car</i>
          <p>David Peña Pascual</p>
        </li>*/}
      </ul>
    </section>
  </>
}








