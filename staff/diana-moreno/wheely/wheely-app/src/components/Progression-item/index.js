import React from 'react'
import './index.sass'

export default function () {
  return <>
    <li className="timeline__item">
      <div className="timeline__bullet timeline__bullet--red">1</div>
      <div className="timeline__date">25-09-2019</div>
      <div className="timeline__feedback">
        <p>Se ha saltado un semáforo.</p>
      </div>
    </li>
  </>
}
