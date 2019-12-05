import React from 'react'
import './index.sass'
import Navbar from '../Navbar'
import ReservationCard from '../Reservation-card'
import SearchOptions from '../Search-options'

export default function ({ onBack }) {
  return <>
    <div className='title'>
      <i onClick={onBack} className="material-icons">undo</i>
      <h3>Reservations</h3>
    </div>
    <section className='reservations'>
      <form action="">
        <select name="role" className='reservations__search'>
          <SearchOptions />
        </select>
        <button>Filter</button>
      </form>
        <div className='reservations__container'>
          <ul>
            <ReservationCard />
            <ReservationCard />
          </ul>
        </div>
    </section>
  </>
}
