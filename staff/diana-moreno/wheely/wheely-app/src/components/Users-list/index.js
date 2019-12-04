import React, { useState, useEffect } from 'react'
import './index.sass'
import Navbar from '../Navbar'
import UsersItem from '../Users-item'

export default function({ onListUsers }) {
  const [usersList, setUsersList] = useState()
const a = 'hello'

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
