import React from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import './index.sass'
import Column from '../Column'


export default function ({ user, onLogout }) {
  const columns = ['TODO', 'DOING', 'REVIEW', 'DONE']


  function onDragEnd(result) {
    // TODO reorder

  }
    return <>
      <header>
        <h1>Tasksboard</h1>
      </header>
      <main>
        <DragDropContext onDragEnd={onDragEnd}>
          <ul className='tasks'>
            {columns.map((status, i) =>
              <Column key={status} status={status} index={i} />
            )}
          </ul>
        </DragDropContext>
      </main>
    </>
}