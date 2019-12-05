import React from 'react'
import './index.sass'
import Navbar from '../Navbar'

export default function ({ onBack }) {
  return <>
    <div className='title'>
      <i onClick={onBack} className="material-icons">undo</i>
      <h3>Credits</h3>
    </div>
    <section className='credits'>
      <p className='credits__available'><span>3</span> credits</p>
      <p>You can book as many practices as credits you have.</p>
      <p>To add more credits, please contact with your driving school.</p>
    </section>
  </>
}
