import React from 'react'
import './index.sass'
const moment = require('moment')

export default function ({ practice, role }) {
  const { instructorId: { name: nameInstructor, surname: surnameInstructor }, studentId: { name: nameStudent, surname: surnameStudent }, date } = practice
  const [day, hour] = moment(date).format('DD-MM-YYYY HH:mm').split(' ')
  let status
  moment(date).isBefore(moment()) ? status = 'finished' : status = 'pending'

  return <>
    <li className={`reservation reservation--${status}`}>
      <div className='reservation__icon'>
        {status === 'pending' && <i className="material-icons">hourglass_empty</i>}
      </div>
      <div className='reservation__detail'>
        <p><b>Date: </b>{day}</p>
        <p><b>Time: </b>{hour}</p>
        {role === 'student'
          ? <p><b>Instructor: </b>{nameInstructor} {surnameInstructor}</p>
          : <p><b>Student: </b>{nameStudent} {surnameStudent}</p>
        }
      </div>
    </li>
  </>
}
