import React from 'react'
import './index.sass'
import Navbar from '../Navbar'

export default function () {
  return <>
    <Navbar />
    <section class='booking'>
      <div>
        <h3>Do you want to book a practice?</h3>
        <p>You can select the instructor you prefer and the day and time that suits you best!</p>
        <p>Every practice costs 1 credit.</p>
      </div>
      <form action="">
       <select name="role">
          <option value="">-- instructor --</option>
          <option value="instructor1">Aitor Pedos</option>
          <option value="instructor2">Aitor Tilla</option>
          <option value="instructor3">Aitor Menta</option>
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
}

