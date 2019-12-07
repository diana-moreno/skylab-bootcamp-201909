import React, { useState, useEffect, useContext } from 'react'
import './index.sass'
import Navbar from '../Navbar'
import { withRouter } from 'react-router-dom'
import Context from '../CreateContext'
import { listUsers, retrieveOtherUser, listPractices } from '../../logic'
import Option from './option.js'
const moment = require('moment')

export default withRouter(function({ history }) {
  const [instructors, setInstructors] = useState()
  const [schedule, setSchedule] = useState()
  const [instructorId, setInstructorId] = useState()

  const { token } = sessionStorage

  useEffect(() => {
    handleInstructors()
  }, [])


  // recoge todos los profesores
  const handleInstructors = async () => {
    try {
      let result = await listUsers(token)
      const { users } = result

      setInstructors(users)
    } catch (error) {
      console.log(error)
    }
  }


  // recoge el schedule del profesor seleccionado
  const getAvailableSchedule = async (event) => {
    let id = event.target.value
    setInstructorId(id)
    // retrieve instructor schedule
    try {
      let result = await retrieveOtherUser(token, id)
      const { user: { profile: { schedule: { days }}} } = result

      let calendar = generateCalendar(days)
      let availableCalendar = getAvailableCalendar(calendar, id)
    } catch (error) {
      console.log(error)
    }
  }


  // genera un calendario con días y horas reales a partir del schedule
 const generateCalendar = (schedule) => {
  let calendar = []

  // transform the schedule of weekdays of the data base in an object with real dates (for 30 natural days) and an array of hours to expose in the frontend for booking
  for (let i = 0; i < 30; i++) {
    const weekday = moment().add(i, 'day').day()
    const today = Number(moment().day())

    if (schedule[weekday].hours.length > 0) {
      let dayHour = moment().day(i + today, 'day')
      let day = dayHour.format('DD-MM-YYYY')
      const hours = schedule[weekday].hours

      calendar.push({
        day,
        hours
      })
    }
  }

  // checks if the first day of the array is today. If is today, removes from the array of hours, the hours that are past (to no offer a new practice in the past)

  if (calendar[0].day == moment().format('DD-MM-YYYY')) {
    const now = moment().format('HH:mm')
    const timeNow = moment(now, "HH:mm"); // parse string to moment hour
    let hoursToSave = []

    calendar[0].hours.forEach(hour => {
      const timeSaved = moment(hour, "HH:mm") // parse string to moment hour
      if (timeNow < timeSaved) {
        hoursToSave.push(timeSaved)
      }
    })
    // update today hours
    calendar[0].hours = hoursToSave

  }
  console.log(calendar)
  return calendar
 }


// recoge las reservas pendientes del profesor
 const retrieveReservations = async (id) => {
  let reservations = []
  try {
    let result = await listPractices(token, id)
    const { practices } = result
    if(practices) {
      let pendingPractices = practices.filter(pract => pract.status === 'pending')
      if(pendingPractices) {
        pendingPractices.forEach(pract => {
          reservations.push(pract.date)
        })
      }
    }
    return reservations
  } catch (error) {
    console.log(error)
  }
 }

 // genera el calendario disponible, restando las reservas pendientes
 const getAvailableCalendar = (calendar, id) => {
  let reservations = retrieveReservations(id)
  reservations.forEach(reservation => calendar.filter(date => {
/*    moment(reservation).format('DD-MM-YYYY') !== date.date */
  }))
  calendar.forEach(date => {

  })
 }

  return <>
    <div className='title'>
      <i onClick={() => history.goBack()} className="material-icons">undo</i>
      <h3>Booking</h3>
    </div>
    <section className='booking'>
      <div>
        <h3>Do you want to book a practice?</h3>
        <p>You can select the instructor you prefer and the day and time that suits you best!</p>
        <p>Every practice costs 1 credit.</p>
      </div>
      <form action="">
       <select name="role" onChange={getAvailableSchedule} >
          <option value="" >-- instructor --</option>
         { instructors && instructors.map((instructor, i) =>
            <Option key={i} id={instructor._id} instructor={instructor} />)
         }
        </select>
       <select name="date">
          <option value="">-- date --</option>
          <option value="date1">25/11/2019</option>
          <option value="date2">26/11/2019</option>
          <option value="date3">27/11/2019</option>
          <option value="date1">28/11/2019</option>
          <option value="date2">29/11/2019</option>
          <option value="date3">30/11/2019</option>
          <option value="date1">31/11/2019</option>
          <option value="date2">01/12/2019</option>
          <option value="date3">02/12/2019</option>
        </select>
       <select name="date">
          <option value="">-- time --</option>
          <option value="">17:00</option>
          <option value="">18:00</option>
          <option value="">19:00</option>
          <option value="">20:00</option>
          <option value="">21:00</option>
          <option value="">22:00</option>
          <option value="">23:00</option>
        </select>
        <button>Confirm</button>
      </form>
    </section>
  </>
})

