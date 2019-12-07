import React, { useState, useEffect, useContext } from 'react'
import './index.sass'
import Navbar from '../Navbar'
import { withRouter } from 'react-router-dom'
import Context from '../CreateContext'
import { listUsers } from '../../logic'


export default function ({ instructor, id  }) {
  const { name, surname} = instructor
  return <>
      <option value={id}>{name} {surname}</option>
  </>
}

