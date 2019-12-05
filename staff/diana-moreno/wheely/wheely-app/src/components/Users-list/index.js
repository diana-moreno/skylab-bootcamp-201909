import React, { useState, useEffect, useContext } from 'react'
import './index.sass'
import Navbar from '../Navbar'
import UsersItem from '../Users-item'
import Context from '../CreateContext'

export default function({ onListUsers }) {
  const { role } = useContext(Context)
  const [usersList, setUsersList] = useState()

  useEffect(() => {
    (async () => {
      try {
        const { users } = await onListUsers()
        if(users.studentId) {
          users = users.studentId
        }
        setUsersList(users)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [setUsersList])

  return < >
    <h3 className='title'>{role === 'admin' ? 'Users' : 'Your students'} </h3>
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
    </section>
    </>
}
