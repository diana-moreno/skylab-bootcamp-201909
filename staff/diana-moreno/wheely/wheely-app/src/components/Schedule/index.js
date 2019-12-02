import React from 'react'
import './index.sass'
import Navbar from '../Navbar'
import ScheduleItem from '../Schedule-item'

export default function () {
  return <>
    <Navbar />
    <section className='schedule'>
      <p>Here you can edit the schedule of: </p>
      <p><b>Paco García</b></p>
      <div className='timetable'>
        <div className="week-names">
          <p>M</p>
          <p>T</p>
          <p>W</p>
          <p>T</p>
          <p>F</p>
          <p>S</p>
          <p>S</p>
        </div>
        <div className="time-interval">
          <p>08:00</p>
          <p>09:00</p>
          <p>10:00</p>
          <p>11:00</p>
          <p>12:00</p>
          <p>13:00</p>
          <p>14:00</p>
          <p>15:00</p>
          <p>16:00</p>
          <p>17:00</p>
          <p>18:00</p>
          <p>19:00</p>
          <p>20:00</p>
          <p>21:00</p>
          <p>22:00</p>
        </div>
        <form className="content" action="">
          <ScheduleItem />
          <ScheduleItem />
          <ScheduleItem />
          <ScheduleItem />
          <ScheduleItem />
          <ScheduleItem />
          <ScheduleItem />
          <ScheduleItem />
          <ScheduleItem />
          <ScheduleItem />
        </form>
      </div>
    </section>
  </>
}
