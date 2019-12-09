import './index.sass'
import Navbar from '../Navbar'
import ProgressionItem from '../Progression-item'
import { retrieveUser, listPractices } from '../../logic'
import React, { useState, useEffect } from 'react';
import Feedback from '../Feedback'
const moment = require('moment')

export default function ({ id, user, onBack }) {
  const [practices, setPractices] = useState(undefined)
  const [notification, setNotification] = useState(null)
  const { token } = sessionStorage

  useEffect(() => {
    (async () => {
      try {
        if(token) {
          const result = await listPractices(token, id)
          const { practices } = result
          setPractices(practices)
          if(practices) {
            practices.length === 0 ? setPractices(undefined) : setPractices(practices)
          }
        }
      } catch ({ message }) {
        setNotification({ error: true, message })
      }
    })()
  }, [])

  return <>
    <div className='title'>
      <i onClick={onBack} className="material-icons">undo</i>
      <h3>Progression</h3>
    </div>
    <section className="timeline">
      <ul className='timeline__list'>
        { practices && practices.filter(pract => {
/*          return pract.status === 'done'*/
          return pract.valoration
        })
        .sort((a, b) =>  moment(a.date).diff(moment(b.date)))
        .map((practice, i) =>
          <ProgressionItem practice={practice} key={i} i={i + 1} /> )
        }
      </ul>
      {notification && <Feedback {...notification} />}
    </section>
  </>
}
