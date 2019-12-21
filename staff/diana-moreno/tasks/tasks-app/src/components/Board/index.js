import React from 'react'
import './index.sass'
import Card from '../Card'

export default function ({ user, onLogout }) {
    return <>
      <header>
        <h1>Tasksboard</h1>
      </header>
      <main>
        <section className='tasks'>
          <section className='tasks__column tasks__column-todo'>
            <h2 className='tasks__title'>TODO</h2>
            <ul className='tasks__task'>
              <li className='task task__add task__add--todo'>
                <h3 className='task__title'>+ Add new card</h3>
              </li>
              <Card title={'this is a title1'} modifier={'todo'}/>
            </ul>
          </section>
          <section className='tasks__column tasks__column-doing'>
            <h2 className='tasks__title'>DOING</h2>
            <ul className='tasks__task'>
              <li className='task task__add task__add--doing'>
                <h3 className='task__title task__title--doing'>+ Add new card</h3>
              </li>
              <Card title={'this is a title1'} modifier={'doing'}/>
            </ul>
          </section>
          <section className='tasks__column tasks__column-review'>
            <h2 className='tasks__title'>REVIEW</h2>
            <ul className='tasks__task'>
              <li className='task task__add task__add--review'>
                <h3 className='task__title task__title--review'>+ Add new card</h3>
              </li>
              <Card title={'this is a title1'} modifier={'review'}/>
            </ul>
          </section>
          <section className='tasks__column tasks__column-done'>
            <h2 className='tasks__title'>DONE</h2>
            <ul className='tasks__task'>
              <li className='task task__add task__add--done'>
                <h3 className='task__title task__title--done'>+ Add new card</h3>
              </li>
              <Card title={'this is a title1'} modifier={'done'}/>
            </ul>
          </section>
        </section>
      </main>
    </>
}