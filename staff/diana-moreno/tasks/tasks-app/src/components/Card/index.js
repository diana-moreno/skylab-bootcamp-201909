import React from 'react'
/*import './index.sass'*/

export default function({ title, modifier }) {
  return <>
    <li className='task task--doing'>
      <h3 className={`task__title task__title--${modifier}`}>{title}</h3>
    </li>
  </>
}