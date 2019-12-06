import React, { Fragment, useContext, useState, useEffect } from 'react'
import './index.sass'
import NavigationLinksInstructor from './NavigationLinksInstructor'
import NavigationLinksStudent from './NavigationLinksStudent'
import Feedback from '../Feedback'
import Context from '../CreateContext'
import { Link, withRouter } from 'react-router-dom'
import { retrieveOtherUser } from '../../logic'

export default withRouter(function({ id, history }) {
  const { roleOwner } = useContext(Context)
  const [role, setRole] = useState()

  useEffect(() => {
    (async () => {
      const { token } = sessionStorage
      try {
        const user = await retrieveOtherUser(token, id)
        const { user: { role } } = user
        setRole(role)
      }catch (error) {
        console.log(error)
      }
    })()
  }, [])

  return (
    <Fragment>
      <div className='title'>
        <i onClick={() => history.goBack()} className="material-icons">undo</i>
        <h3 className='title'>Your account</h3>
      </div>
      <section className='account'>
        <Link to={`/profile/${id}`}>
          <i className="material-icons detail-user__icon">create</i>
          <p>Profile</p>
        </Link>

        { role === 'student' && <NavigationLinksStudent id={id} /> }
        { role === 'instructor' && <NavigationLinksInstructor id={id} /> }
      </section>
    </Fragment>
  )
})
