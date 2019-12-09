import React, { useState, useEffect, Fragment } from 'react';
import './index.sass'
import Feedback from '../Feedback'
import { retrievePractice, retrieveUser, cancelPractice, writeFeedback } from '../../logic'
const moment = require('moment')

export default function ({ id, onBack }) {
  const { token } = sessionStorage
  const [role, setRole] = useState()
  const [nameStudent, setNameStudent] = useState()
  const [surnameStudent, setSurnameStudent] = useState()
  const [day, setDay] = useState()
  const [time, setTime] = useState()
  const [instructorId, setInstructorId] = useState()
  const [practiceId, setPracticeId] = useState()
  const [valoration, setValoration] = useState()
  const [comment, setComment] = useState()
  const [studentId, setStudentId] = useState()
  const [notification, setNotification] = useState(null)


  useEffect(() => {
    (async () => {
      try {
        const result = await retrievePractice(token, id)
        const { studentId: { name: nameStudent, surname: surnameStudent, _id: studentId }, date , _id} = result.practice
        let [day, time] = moment(date).format('DD-MM-YYYY HH:mm').split(' ')
        setNameStudent(nameStudent)
        setSurnameStudent(surnameStudent)
        setDay(day)
        setTime(time)
        setPracticeId(_id)
        setInstructorId(instructorId)
        setStudentId(studentId)
      } catch ({ message }) {
        setNotification({ error: true, message })
      }
    })()
  }, [])


  const handleValoratePractice = (event) => {
    event.preventDefault()
    try {
      writeFeedback(token, id, studentId, comment, valoration)
    } catch ({ message }) {
      setNotification({ error: true, message })
    }
  }

  return <>
    <div className='title'>
      <i onClick={onBack} className="material-icons">undo</i>
      <h3>Valoration</h3>
    </div>
    <section className='reservations'>
      <div className='reservations__category-container'>
        <div className='reservations__category'>
          <ul className='reservations__category-list'>
            <li className='category__item'>
              <div className='category__item-icon'>
                <i className="material-icons">create</i>
              </div>
              <div className='category__item-detail'>
                <p><b>Date: </b>{day}</p>
                <p><b>Time: </b>{time}</p>
                <p><b>Student: </b>{nameStudent} {surnameStudent}</p>
              </div>
            </li>
          </ul>
            <form onSubmit={handleValoratePractice} className='form'>
              <textarea
                className='form__message'
                cols="30"
                rows="10"
                placeholder="Please, write an accurate feedback to your student. Keep in mind that once sent, it won't be possible to edit."
                onChange={(event) => { setComment(event.target.value)}}
              >
              </textarea>
              <h4>How was {nameStudent}'s performance?</h4>
              <div className="form__puntuation">
                <label className="radio">Bad
                  <input
                    type="radio"
                    value={'bad'}
                    onChange={(event) => { setValoration(event.target.value) }}
                  />
                </label>
                <label className="radio">Regular
                  <input
                    type="radio"
                    value={'regular'}
                    onChange={(event) => { setValoration(event.target.value) }}
                  />
                </label>
                <label className="radio">Good
                  <input
                    type="radio"
                    value={'good'}
                    onChange={(event) => { setValoration(event.target.value) }}
                  />
                </label>
              </div>
              <button className='form__button'>Send</button>
            </form>
        </div>
      </div>
      {notification && <Feedback {...notification} />}
    </section>
  </>
}



