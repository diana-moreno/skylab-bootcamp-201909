import React from 'react'

const LabelOrInput = (props) => (
  <p className={props.isEditting && 'detail-user__input--separation'}>
    <b>{props.label}</b>
    { props.isEditting ? props.children : <span>{props.content}</span> }
  </p>
)

export default LabelOrInput