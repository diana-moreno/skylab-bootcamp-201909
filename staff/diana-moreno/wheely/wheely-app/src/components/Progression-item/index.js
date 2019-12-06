import React from 'react'
import './index.sass'

export default function ({ practice }) {
  const { date, feedback } = practice
  return <>
    <li className="timeline__item">
      <div className="timeline__bullet timeline__bullet--red">1</div>
      <div className="timeline__date">{date}</div>
      <div className="timeline__feedback">
        <p>{feedback}</p>
      </div>
    </li>
  </>
}
