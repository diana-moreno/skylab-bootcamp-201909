import React, { useState, useEffect, useContext } from 'react'
import './index.sass'
import Navbar from '../Navbar'
import { withRouter } from 'react-router-dom'
import Context from '../CreateContext'
import { listUsers } from '../../logic'


export default function ({ hour  }) {
  return <>
    <option value={hour}>{hour}</option>
  </>
}

