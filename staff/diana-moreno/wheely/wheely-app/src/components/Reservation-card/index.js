import React from 'react'
import './index.sass'

export default function () {
  return <>
    <li class='reservation'>
      <div class='reservation__icon'>
        <i class="material-icons">hourglass_empty</i>
      </div>
      <div class='reservation__detail'>
        <p>Lun 24 de abril de 2020</p>
        <p>17:00</p>
        <p>Paco García</p>
      </div>
    </li>
  </>
}