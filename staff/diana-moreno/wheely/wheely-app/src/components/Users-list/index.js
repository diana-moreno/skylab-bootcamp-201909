import React, { useState, useEffect, useContext } from 'react'
import './index.sass'
import Feedback from '../Feedback'
import UsersItem from '../Users-item'
import Context from '../CreateContext'
import { listUsers } from '../../logic'
import './index.sass'


export default function({ onBack, id }) {
  const { roleOwner } = useContext(Context)
  const [usersList, setUsersList] = useState()
  const { token } = sessionStorage
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    (async () => {
      try {
        const { users } = await handleListUsers()
        if(users.studentId) {
          users = users.studentId
        }
        setUsersList(users)
      } catch ({ message }) {
        setNotification({ error: true, message })
      }
    })()
  }, [setUsersList])

  const handleListUsers = async () => {
    try {
      let users
      if (id) {
        users = await listUsers(token, id)
      } else {
        users = await listUsers(token)
      }
      return users
    } catch (error) {

    }
  }

  return <>
    <div className='title'>
      <i onClick={onBack} className="material-icons">undo</i>
      <h3 className='title'>{roleOwner === 'admin' ? 'Users' : 'Your students'}</h3>
    </div>
    <section className='users'>
      <form className='users__searcher' action="">
        <input className='users__searcher-input' type="text" placeholder="search user"/>
        <button className='users__searcher-button'>Search</button>
      </form>
      <ul>
      { usersList && usersList.map(currentUser =>
        <UsersItem currentUser={currentUser} /> )
      }
      </ul>
      {notification && <Feedback {...notification} />}
    </section>
    </>
}
