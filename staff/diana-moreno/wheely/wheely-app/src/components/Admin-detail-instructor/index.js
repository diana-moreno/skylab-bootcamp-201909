import React from 'react'
import './index.sass'
import Navbar from '../Navbar'

export default function () {
  return <>
    <Navbar />
    <section className='detail-user'>
      <div>
        <a href="">
          <i className="material-icons detail-user__icon">create</i>
        </a>
        <p><b>Name: </b><span>Carlos</span></p>
      </div>
      <div>
        <a href="">
          <i className="material-icons detail-user__icon">create</i>
        </a>
        <p><b>Surname: </b><span>López</span></p>
      </div>
      <div>
        <a href="">
          <i className="material-icons detail-user__icon">create</i>
        </a>
        <p><b>Email: </b><span>carlos@gmail.com</span></p>
      </div>
      <div>
        <a href="">
          <i className="material-icons detail-user__icon">create</i>
        </a>
        <p><b>Role: </b><span>Instructor</span></p>
      </div>
      <div>
        <a href="">
          <i className="material-icons detail-user__icon">create</i>
        </a>
        <p>Schedule</p>
      </div>
      <div>
        <a href="">
          <i className="material-icons detail-user__icon detail-user__icon--blue">search</i>
        </a>
        <p>Statistics</p>
      </div>
      <div>
        <a href="">
          <i className="material-icons detail-user__icon detail-user__icon--blue">search</i>
        </a>
        <p>Reservations</p>
      </div>
      <button className='detail-user__button detail-user__button--red'>Delete user</button>
    </section>
  </>
}
