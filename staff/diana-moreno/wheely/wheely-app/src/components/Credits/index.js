import React from 'react'
import './index.sass'
import Navbar from '../Navbar'

export default function () {
  return <>
    <h3 className='title'>Credits</h3>
    <section class='credits'>
      <p class='credits__available'><span>3</span> credits</p>
      <p>You can book as many practices as credits you have.</p>
      <p>To add more credits, please contact with your driving school.</p>
    </section>
  </>
}
