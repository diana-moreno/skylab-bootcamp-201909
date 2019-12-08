import React from 'react'
import './index.sass'
const moment = require('moment')

export default function ({ practice }) {
  let { date, feedback, valoration } = practice
  date = moment(date).format('DD-MM-YYYY')

  let color
  if(valoration === 'bad') {
    color = 'red'
  } else if(valoration === 'regular') {
    color = 'orange'
  } else if(valoration === 'good') {
    color = 'green'
  }

  return <>
    <li className="timeline__item">
      <div className={`timeline__bullet timeline__bullet--${color}`}>1</div>
      <div className="timeline__date">{date}</div>
      <div className="timeline__feedback">
        <p>{feedback}</p>
      </div>
    </li>
  </>
}
