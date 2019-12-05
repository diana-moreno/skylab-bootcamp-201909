import React, { Fragment, useContext } from 'react'
import './index.sass'
import NavigationLinksInstructor from './NavigationLinksInstructor'
import NavigationLinksStudent from './NavigationLinksStudent'
import Feedback from '../Feedback'
import Context from '../CreateContext'
import { Link, withRouter } from 'react-router-dom'

export default withRouter(function({ id, history }) {
  const { roleOwner } = useContext(Context)

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
        { roleOwner === 'student' && <NavigationLinksStudent /> }
        { roleOwner === 'instructor' && <NavigationLinksInstructor /> }
      </section>
    </Fragment>
  )
})
