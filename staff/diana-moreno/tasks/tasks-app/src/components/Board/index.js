import React from 'react'
import './index.sass'

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
              <li className='task task--todo'>
                <div className='task__buttons'>
                  <i className="material-icons">keyboard_arrow_left</i>
                  <i className="material-icons">keyboard_arrow_right</i>
                  <i className="material-icons">clear</i>
                </div>
                <h3 className='task__title task__title--todo'>Title</h3>
                <p className='task__description'>Bla bla bla Bla bla blaBla bla blaBla bla blaBla bla blaBla bla blaBla bla blaBla bla blaBla bla bla </p>
              </li>
              <li className='task task--todo'>
                <div className='task__buttons'>
                  <i className="material-icons">keyboard_arrow_left</i>
                  <i className="material-icons">keyboard_arrow_right</i>
                  <i className="material-icons">clear</i>
                </div>
                <h3 className='task__title task__title--todo'>Title</h3>
                <p className='task__description'>Bla bla bla Bla bla blaBla bla blaBla bla blaBla bla blaBla bla blaBla bla blaBla bla blaBla bla bla </p>
              </li>
            </ul>
          </section>
          <section className='tasks__column tasks__column-doing'>
            <h2 className='tasks__title'>DOING</h2>
            <ul className='tasks__task'>
              <li className='task task--doing'>
                <div className='task__buttons'>
                  <i className="material-icons">keyboard_arrow_left</i>
                  <i className="material-icons">keyboard_arrow_right</i>
                  <i className="material-icons">clear</i>
                </div>
                <h3 className='task__title task__title--doing'>Title</h3>
                <p className='task__description'>Bla bla bla Bla bla blaBla bla blaBla bla blaBla bla blaBla bla blaBla bla blaBla bla blaBla bla bla </p>
              </li>
              <li className='task task--doing'>
                <div className='task__buttons'>
                  <i className="material-icons">keyboard_arrow_left</i>
                  <i className="material-icons">keyboard_arrow_right</i>
                  <i className="material-icons">clear</i>
                </div>
                <h3 className='task__title task__title--doing'>Title</h3>
                <p className='task__description'>Bla bla bla Bla bla blaBla bla blaBla bla blaBla bla blaBla bla blaBla bla blaBla bla blaBla bla bla </p>
              </li>
            </ul>
          </section>
          <section className='tasks__column tasks__column-review'>
            <h2 className='tasks__title'>REVIEW</h2>
            <ul className='tasks__task'>
              <li className='task task--review'>
                <div className='task__buttons'>
                  <i className="material-icons">keyboard_arrow_left</i>
                  <i className="material-icons">keyboard_arrow_right</i>
                  <i className="material-icons">clear</i>
                </div>
                <h3 className='task__title task__title--review'>Title</h3>
                <p className='task__description'>Bla bla bla Bla bla blaBla bla blaBla bla blaBla bla blaBla bla blaBla bla blaBla bla blaBla bla bla </p>
              </li>
              <li className='task task--review'>
                <div className='task__buttons'>
                  <i className="material-icons">keyboard_arrow_left</i>
                  <i className="material-icons">keyboard_arrow_right</i>
                  <i className="material-icons">clear</i>
                </div>
                <h3 className='task__title task__title--review'>Title</h3>
                <p className='task__description'>Bla bla bla Bla bla blaBla bla blaBla bla blaBla bla blaBla bla blaBla bla blaBla bla blaBla bla bla </p>
              </li>
            </ul>
          </section>
          <section className='tasks__column tasks__column-done'>
            <h2 className='tasks__title'>DONE</h2>
            <ul className='tasks__task'>
              <li className='task task--done'>
                <div className='task__buttons'>
                  <i className="material-icons">keyboard_arrow_left</i>
                  <i className="material-icons">keyboard_arrow_right</i>
                  <i className="material-icons">clear</i>
                </div>
                <h3 className='task__title task__title--done'>Title</h3>
                <p className='task__description'>Bla bla bla Bla bla blaBla bla blaBla bla blaBla bla blaBla bla blaBla bla blaBla bla blaBla bla bla </p>
              </li>
              <li className='task task--done'>
                <div className='task__buttons'>
                  <i className="material-icons">keyboard_arrow_left</i>
                  <i className="material-icons">keyboard_arrow_right</i>
                  <i className="material-icons">clear</i>
                </div>
                <h3 className='task__title task__title--done'>Title</h3>
                <p className='task__description'>Bla bla bla Bla bla blaBla bla blaBla bla blaBla bla blaBla bla blaBla bla blaBla bla blaBla bla bla </p>
              </li>
            </ul>
          </section>
        </section>
      </main>
    </>
}