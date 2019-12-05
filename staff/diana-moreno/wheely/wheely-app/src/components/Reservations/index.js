import React from 'react'
import './index.sass'
import Navbar from '../Navbar'
import ReservationCard from '../Reservation-card'
import SearchOptions from '../Search-options'

export default function () {
  return <>
    <h3 className='title'>Reservations</h3>
    <section className='reservations'>
      <form action="">
        <select name="role" class='reservations__search'>
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
