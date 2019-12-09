import { Route, withRouter, Redirect } from 'react-router-dom'
import Context from '../CreateContext'
import React, { useState, useEffect, useContext } from 'react';
import './index.sass'
const moment = require('moment')

export default withRouter(function({ history, practice, role }) {
  const { roleOwner } = useContext(Context)
  const { instructorId: { name: nameInstructor, surname: surnameInstructor }, studentId: { name: nameStudent, surname: surnameStudent }, _id, date, feedback } = practice
  const [day, hour] = moment(date).format('DD-MM-YYYY HH:mm').split(' ')

  let status
  if(moment(date).isBefore(moment()) && feedback) {
    status = 'finished'
  } else if(moment(date).isBefore(moment()) && !feedback) {
    status = 'feedback'
  } else if(moment(date).isAfter(moment())) {
    status = 'pending'
  }

  const handleDetail = () => {
    if(roleOwner === 'student' && status === 'pending') {
      history.push(`/reservation-detail/${_id}`)
    } else if(roleOwner === 'instructor' && status === 'feedback') {
      history.push(`/valoration/${_id}`)
    }
  }

  return <>
    <li className={`reservation reservation--${status}`} onClick={handleDetail} >
      <div className='reservation__icon'>
        {status === 'pending' && <i className="material-icons">hourglass_empty</i>}
        {status === 'feedback' && roleOwner === 'instructor' && <i className="material-icons">create</i>}
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
})
