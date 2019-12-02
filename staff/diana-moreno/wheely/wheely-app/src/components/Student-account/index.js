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
        <p><b>Role: </b><span>Student</span></p>
      </div>
      <div>
        <a href="">
          <i className="material-icons detail-user__icon">create</i>
        </a>
        <p><b>Credits: </b><span>3</span></p>
      </div>
      <div>
        <a href="">
          <i className="material-icons detail-user__icon detail-user__icon--blue">search</i>
        </a>
        <p>Progression</p>
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