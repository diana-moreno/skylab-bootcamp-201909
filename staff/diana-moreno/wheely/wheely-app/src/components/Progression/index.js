import React from 'react'
import './index.sass'
import Navbar from '../Navbar'
import ProgressionItem from '../Progression-item'

export default function () {
  return <>
    <Navbar />
    <section class="timeline">
      <ul class='timeline__list'>
        <ProgressionItem />
        <ProgressionItem />
      </ul>
    </section>
  </>
}


