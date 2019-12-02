import React from 'react'
import './index.sass'
import Navbar from '../Navbar'

export default function () {
  return <>
    <Navbar />
    <section class='detail-user'>
      <div>
        <a href="">
          <i class="material-icons detail-user__icon">create</i>
        </a>
        <p><b>Name: </b><span>Carlos</span></p>
      </div>
      <div>
        <a href="">
          <i class="material-icons detail-user__icon">create</i>
        </a>
        <p><b>Surname: </b><span>López</span></p>
      </div>
      <div>
        <a href="">
          <i class="material-icons detail-user__icon">create</i>
        </a>
        <p><b>Email: </b><span>carlos@gmail.com</span></p>
      </div>
      <div>
        <a href="">
          <i class="material-icons detail-user__icon detail-user__icon--blue">search</i>
        </a>
        <p>Statistics</p>
      </div>
      <div>
        <a href="">
          <i class="material-icons detail-user__icon detail-user__icon--blue">search</i>
        </a>
        <p>Reservations</p>
      </div>
      <div>
        <a href="">
          <i class="material-icons detail-user__icon detail-user__icon--blue">search</i>
        </a>
        <p>Your students</p>
      </div>
    </section>

  </>
}
