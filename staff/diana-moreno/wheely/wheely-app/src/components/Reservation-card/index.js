import React from 'react'
import './index.sass'

export default function () {
  return <>
    <li className='reservation'>
      <div className='reservation__icon'>
        <i className="material-icons">hourglass_empty</i>
      </div>
      <div className='reservation__detail'>
        <p>Lun 24 de abril de 2020</p>
        <p>17:00</p>
        <p>Paco García</p>
      </div>
    </li>
  </>
}