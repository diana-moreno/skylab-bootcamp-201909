import React from 'react'
import Card from '../Card'

export default function ({status}) {
  const modifier = status.toLowerCase()

  function handleCreateCard() {

  }

  return <>
    <li className={`tasks__column tasks__column-${modifier}`}>
      <h2 className='tasks__title'>{status}</h2>
      <ul className='tasks__task'>
        <li className={`task task__add task__add--${modifier}`} onClick={handleCreateCard}>
          <h3 className='task__title'>+ Add new card</h3>
        </li>
        <Card title={'this is a title1'} modifier={modifier}/>
      </ul>
    </li>
  </>
}