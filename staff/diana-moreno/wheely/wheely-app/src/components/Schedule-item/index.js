import React from 'react'
import './index.sass'

export default function ({day, hour, handleClick, checked}) {

  return <>
    <label className="container">
      <input type="checkbox" checked={checked}/>
      <span className="checkmark" onClick={() => handleClick(day, hour)}>{day}: {hour} {checked}</span>
    </label>
  </>
}
