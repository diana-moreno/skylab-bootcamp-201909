import React from 'react'

export default function ({ instructor, id  }) {
  const { name, surname} = instructor
  return <>
    <option value={id}>{name} {surname}</option>
  </>
}

