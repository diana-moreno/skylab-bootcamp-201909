import React, { useState, useEffect } from 'react';
import './index.sass'
import Feedback from '../Feedback'
import { retrievePractice, retrieveUser, cancelPractice} from '../../logic'
const moment = require('moment')

export default function ({ id, onBack }) {
  const { token } = sessionStorage
  const [role, setRole] = useState()
  const [nameInstructor, setNameInstructor] = useState()
  const [surnameInstructor, setSurnameInstructor] = useState()
  const [day, setDay] = useState()
  const [time, setTime] = useState()
  const [instructorId, setInstructorId] = useState()
  const [practiceId, setPracticeId] = useState()
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    (async () => {
      try {
        const user = await retrieveUser(token) // no sirve, hay que pasar el id de quien hace la practica // da igual porque admin no puede ver los detalles, mucha locura!
        const { user: { role } } = user
        setRole(role)

        const result = await retrievePractice(token, id)
        const { instructorId: { name: nameInstructor, surname: surnameInstructor, _id: instructorId }, date , _id} = result.practice
        let [day, time] = moment(date).format('DD-MM-YYYY HH:mm').split(' ')

        setNameInstructor(nameInstructor)
        setSurnameInstructor(surnameInstructor)
        setDay(day)
        setTime(time)
        setPracticeId(_id)
        setInstructorId(instructorId)
      } catch ({ message }) {
        setNotification({ error: true, message })
      }
    })()
  }, [])

  const handleCancel = async () => {
    try {
      await cancelPractice(token, instructorId, practiceId)
    } catch ({ message }) {
      setNotification({ error: true, message: 'We are sorry! It is not possible to cancel with less than 24h of advance' })
    }
  }

  return <>
    <div className='title'>
      <i onClick={onBack} className="material-icons">undo</i>
      <h3>Reservation detail</h3>
    </div>
    <section className='reservation-detail'>
      <div>
        <p>Those are your reservation details: </p>
        <p><b>Date: </b>{day}</p>
        <p><b>Time: </b>{time}</p>
        <p><b>Place: </b>In your driving school</p>
        <p><b>Instructor: </b>{nameInstructor} {surnameInstructor}</p>
        <p>Do you want to cancel the practice?</p>
        <p>Keep in mind that you can cancel it notifying with 24h of advance. In this case, your credit will be returned.</p>
      </div>
        <Feedback {...notification} />
        <button className='reservation-detail__button'onClick={handleCancel} >Cancel</button>
    </section>
  </>
}
