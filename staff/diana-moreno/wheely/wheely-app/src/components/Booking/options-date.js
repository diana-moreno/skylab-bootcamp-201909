import React from 'react'

export default function ({ index, day }) {
  return <>
    <option value={index}>{day}</option>
  </>
}

// se pueden unificar los tres options???
//