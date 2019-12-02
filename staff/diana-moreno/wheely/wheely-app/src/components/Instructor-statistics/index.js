import React from 'react'
import './index.sass'
import Navbar from '../Navbar'

export default function () {
  return <>
    <Navbar />
    <section class='statistics'>
      <section>
        <h4>Your anual ratio coverage in practices</h4>
        <div class='statistics__period statistics__period--title'>
          <p class='statistics__month'>Period</p>
          <p class='statistics__percentage'>%</p>
          <p class='statistics__absolut'>absolut</p>
        </div>
        <div class='statistics__period'>
          <p class='statistics__month'>Annual</p>
          <p class='statistics__percentage'>78%</p>
          <p>78/100</p>
        </div>
      </section>
      <section>
        <h4>Your ratio coverage month by month</h4>
        <div class='statistics__period'>
          <p class='statistics__month'>January</p>
          <p class='statistics__percentage'>60%</p>
          <p class='statistics__absolut'>90/120</p>
        </div>
        <div class='statistics__period'>
          <p class='statistics__month'>February</p>
          <p class='statistics__percentage'>60%</p>
          <p class='statistics__absolut'>90/120</p>
        </div>
        <div class='statistics__period'>
          <p class='statistics__month'>March</p>
          <p class='statistics__percentage'>60%</p>
          <p class='statistics__absolut'>90/120</p>
        </div>
        <div class='statistics__period'>
          <p class='statistics__month'>April</p>
          <p class='statistics__percentage'>60%</p>
          <p class='statistics__absolut'>90/120</p>
        </div>
        <div class='statistics__period'>
          <p class='statistics__month'>May</p>
          <p class='statistics__percentage'>60%</p>
          <p class='statistics__absolut'>90/120</p>
        </div>
        <div class='statistics__period'>
          <p class='statistics__month'>June</p>
          <p class='statistics__percentage'>60%</p>
          <p class='statistics__absolut'>90/120</p>
        </div>
        <div class='statistics__period'>
          <p class='statistics__month'>July</p>
          <p class='statistics__percentage'>60%</p>
          <p class='statistics__absolut'>90/120</p>
        </div>
        <div class='statistics__period'>
          <p class='statistics__month'>August</p>
          <p class='statistics__percentage'>60%</p>
          <p class='statistics__absolut'>90/120</p>
        </div>
        <div class='statistics__period'>
          <p class='statistics__month'>September</p>
          <p class='statistics__percentage'>60%</p>
          <p class='statistics__absolut'>90/120</p>
        </div>
        <div class='statistics__period'>
          <p class='statistics__month'>October</p>
          <p class='statistics__percentage'></p>
          <p class='statistics__absolut'></p>
        </div>
        <div class='statistics__period'>
          <p class='statistics__month'>November</p>
          <p class='statistics__percentage'></p>
          <p class='statistics__absolut'></p>
        </div>
        <div class='statistics__period'>
          <p class='statistics__month'>December</p>
          <p class='statistics__percentage'></p>
          <p class='statistics__absolut'></p>
        </div>
      </section>
      <div>
      </div>
    </section>
  </>
}



