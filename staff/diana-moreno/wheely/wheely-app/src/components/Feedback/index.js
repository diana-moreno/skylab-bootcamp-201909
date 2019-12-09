import React from 'react'
import './index.sass'

export default function({ error, message }) {
  return (
    <section className="feedback">
      <p className={error ? 'feedback__message feedback__message--error' : 'feedback__message feedback__message--success'}>{message}</p>
    </section>
  )
}