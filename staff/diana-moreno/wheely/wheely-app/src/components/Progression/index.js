import React from 'react'
import './index.sass'
import Navbar from '../Navbar'
import ProgressionItem from '../Progression-item'

export default function ({ onBack }) {
  return <>
    <div className='title'>
      <i onClick={onBack} className="material-icons">undo</i>
      <h3>Progression</h3>
    </div>
    <section className="timeline">
      <ul className='timeline__list'>
        <ProgressionItem />
        <ProgressionItem />
      </ul>
    </section>
  </>
}
