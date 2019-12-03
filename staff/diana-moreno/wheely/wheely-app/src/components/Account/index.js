import React, { Fragment } from 'react'
import './index.sass'
import Navbar from '../Navbar'
import NavigationLinksInstructor from './NavigationLinksInstructor'
import NavigationLinksStudent from './NavigationLinksStudent'
import Feedback from '../Feedback'
import { Link } from 'react-router-dom'

export default class InstructorAccount extends React.Component {
  state = {
    isStudent: true,
    isAdmin: false,
    isInstructor: false
  }

  render() {
    return <Fragment>
      <Navbar />
      <section className='account'>

          <div>
            <Link to="/profile">
              <i className="material-icons detail-user__icon">create</i>
            </Link>
            <p>Profile</p>
          </div>

          { this.state.isStudent && <NavigationLinksStudent /> }

          { this.state.isInstructor && <NavigationLinksInstructor /> }

      </section>
    </Fragment>
  }
}
