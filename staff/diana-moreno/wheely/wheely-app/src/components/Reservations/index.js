import React, { useState, useEffect } from 'react';
import './index.sass'
import Navbar from '../Navbar'
import ReservationCard from '../Reservation-card'
import { retrieveUser, listPractices, retrieveOtherUser } from '../../logic'
/*import SearchOptions from '../Search-options'*/
const moment = require('moment')

export default function({ id, onBack }) {
  const [practices, setPractices] = useState(undefined)
  const [role, setRole] = useState()
  const { token } = sessionStorage

  useEffect(() => {
    (async () => {
      try {
        if (token) {
          const user = await retrieveOtherUser(token, id)
          const { user: { role } } = user
          setRole(role)
          const result = await listPractices(token, id)
          const { practices } = result
          setPractices(practices)

          if (practices) {
            practices.length === 0 ? setPractices(undefined) : setPractices(practices)
          }
        }
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  return < >
    <div className='title'>
      <i onClick={onBack} className="material-icons">undo</i>
      <h3>Reservations</h3>
    </div> <
    section className = 'reservations' >
    <form action="">
        <select name="role" className='reservations__search'>
     {/*     <SearchOptions />*/}
        </select>
        <button>Filter</button>
      </form>
    <div className = 'reservations__container' >
      <ul>
        { practices && practices
          .sort((a, b) =>  moment(b.date).diff(moment(a.date)))
          .map((practice, i) =>
            <ReservationCard key={i} practice={practice} role={role} /> )
        }
      </ul>
    </div>
  </section>
  </>
}
