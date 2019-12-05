import React, { Fragment, useContext } from 'react'
import './index.sass'
import NavigationLinksInstructor from './NavigationLinksInstructor'
import NavigationLinksStudent from './NavigationLinksStudent'
import Feedback from '../Feedback'
import { Link } from 'react-router-dom'
import Context from '../CreateContext'

export default function({ id }) {

  const { role } = useContext(Context)
    return <Fragment>
      <h3 className='title'>Your account</h3>
      <section className='account'>

          <div>
            <Link to={`/profile/${id}`}>
              <i className="material-icons detail-user__icon">create</i>
            </Link>
              <p>Profile</p>
          </div>
          { role === 'student' /*|| role === 'admin'*/ && <NavigationLinksStudent /> }

          { role === 'instructor' && <NavigationLinksInstructor /> }

      </section>
    </Fragment>
}
