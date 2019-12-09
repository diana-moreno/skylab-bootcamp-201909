import React, { Fragment, useContext, useState, useEffect } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'
import './index.sass'
import ScheduleItem from '../Schedule-item'
import { updateSchedule, retrieveOtherUser } from '../../logic'
import Context from '../CreateContext'

export default function({ id, onBack }) {

  const hoursList = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00']
  const daysList = [0,1,2,3,4,5,6]
  const { token } = sessionStorage
  const { roleOwner } = useContext(Context)

  const [name, setName] = useState()
  const [days, setDays] = useState(daysList)
  const [hours, setHour] = useState(hoursList)
  const [availableSchedule, setAvailableSchedule] = useState(null)


  useEffect(() => {
    (async () => {
      try {

        const result = await retrieveOtherUser(token, id)
        const { user: { profile: { schedule : { days } } } } = result
        const { user: { name } } = result
        setName(name)
        setAvailableSchedule(days)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])


  const updateSlot = (day, hour) => async () => {
    // si es un instructor, solo puede visualizar los datos, no editarlos
    if(roleOwner == 'admin') {
      let result = await updateSchedule(token, id, day, hour)
      const { instructor: { profile: { schedule : { days } } } } = result
      setAvailableSchedule(days)
    }
  }

  return <>
    <div className='title'>
      <i onClick={onBack} className="material-icons">undo</i>
      <h3>{name}'s Schedule</h3>
    </div>
    <section className='schedule'>
      <div className='schedule__timetable'>
        <div className="schedule__week-names">
          { ['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(d => <p>{d}</p>) }
        </div>
        <div className="schedule__time-interval">
          { hours.map((hour) => <p>{hour}</p>) }
        </div>
        <ul className="schedule__board">
          { availableSchedule === null
            ? 'Loading...'
            : hours.map(hour => (
                days.map((day, i) =>
                  <ScheduleItem
                    key={i}
                    day={day}
                    hour={hour}
                    handleClick={updateSlot(day, hour)}
                    isChecked={availableSchedule[day].hours.includes(hour)}
                  />
                )
              )
            )
          }
        </ul>
      </div>
    </section>
  </>
}