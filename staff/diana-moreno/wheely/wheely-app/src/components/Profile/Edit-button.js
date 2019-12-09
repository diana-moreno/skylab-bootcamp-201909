import React, { Fragment, useContext, useState, useEffect } from 'react'
import './index.sass'
import Navbar from '../Navbar'
import Feedback from '../Feedback'
import { Link } from 'react-router-dom'
import Context from '../CreateContext'
import { retrieveOtherUser, deleteUser, editUser } from '../../logic'

export default function ({ elem, permission, onEditMode }) {
  const { roleOwner } = useContext(Context)
  return <>
      <div className={roleOwner === permission ? '' : 'detail-user__input--separation-no-icon'}>
        { roleOwner === permission &&
        <button
          type="button"
          className='detail-user__button--hidden'
          onClick={() => onEditMode(elem)}>
          <i className="material-icons detail-user__icon">create</i>
        </button>}
      </div>
  </>

}