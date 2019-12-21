import React from 'react'
import './index.sass'
import ColumnTasks from '../ColumnTasks'

export default function ({ user, onLogout }) {
  const statuses = ['TODO', 'DOING', 'REVIEW', 'DONE']

    return <>
      <header>
        <h1>Tasksboard</h1>
      </header>
      <main>
        <ul className='tasks'>
          {statuses.map((status, i) =>
            <ColumnTasks status={status} />
          )}
        </ul>
      </main>
    </>
}