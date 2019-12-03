import React, { Fragment } from 'react'
import './index.sass'
import Navbar from '../Navbar'
import NavigationLinksInstructor from './NavigationLinksInstructor'
import NavigationLinksStudent from './NavigationLinksStudent'
import Feedback from '../Feedback'
import { Redirect } from 'react-router-dom'

export default class InstructorAccount extends React.Component {
  state = {
    isEditMode: false,
    firstName: {
      value: 'Carlos',
      edit: false,
    },
    lastName: {
      value: 'Sanz',
      edit: false
    },
    email: {
      value: 'carlos@gmail.com',
      edit: false
    },
    isStudent: true,
    isAdmin: false,
    isInstructor: false
  }

  edit = (str) => {
    this.setState({
      ...this.state,
      isEditMode: true,
      [str]: {
        ...this.state[str],
        edit: true
      }
    })
  }

  cancel = () => {
    this.setState({
      ...this.state,
      isEditMode: false,
      firstName: {
        ...this.state.firstName,
        edit: false
      },
      lastName: {
        ...this.state.lastName,
        edit: false
      },
      email: {
        ...this.state.email,
        edit: false
      }
    })
  }

  render() {
    return <Fragment>
      <Navbar />
      <section className='detail-user'>
        <form>

          <div>
            <a href="#" onClick={() => this.edit('firstName')}>
              <i className="material-icons detail-user__icon">create</i>
            </a>
            <p className={this.state.firstName.edit ? 'detail-user__input--separation' : ''}><b>First name: </b>
              { this.state.firstName.edit
              ? <input className='detail-user__input' type='text' placeholder={ this.state.firstName.value } />
              : <span>{ this.state.firstName.value }</span>}
            </p>
          </div>

          <div>
            <a href="#" onClick={() => this.edit('lastName')}>
              <i className="material-icons detail-user__icon">create</i>
            </a>
            <p className={this.state.lastName.edit
              ? 'detail-user__input--separation'
              : ''}><b>Last name: </b>{ this.state.lastName.edit
              ? <input className='detail-user__input' type='text' placeholder={ this.state.lastName.value } />
              : <span>{ this.state.lastName.value }</span>}
            </p>
          </div>

          <div>
            <a href="#" onClick={() => this.edit('email')}>
              <i className="material-icons detail-user__icon">create</i>
            </a>
            <p className={this.state.email.edit
              ? 'detail-user__input--separation'
              : ''}><b>e-mail: </b>{ this.state.email.edit
              ? <input className='detail-user__input' type='text' placeholder={ this.state.email.value } />
              : <span>{ this.state.email.value }</span>}
            </p>
          </div>

          <div>
            <p className={this.state.email.edit
              ? 'detail-user__input--separation detail-user__input--separation-no-icon'
              : 'detail-user__input--separation-no-icon'}><b>DNI: </b><span>78569987W</span>
            </p>
          </div>


          {!this.state.isEditMode && this.state.isStudent &&
             <NavigationLinksStudent />
          }

          {!this.state.isEditMode && this.state.isInstructor &&
             <NavigationLinksInstructor />
          }

          {this.state.isEditMode
            && <Fragment>
                <p>Introduce your password to confirm changes</p>
                <input className='detail-user__input--password' placeholder='password'/>
              </Fragment>
          }

          {this.state.isEditMode &&
            <div>
              <button className='detail-user__button detail-user__button--cancel' onClick={this.cancel}>Cancel</button>
              <button className='detail-user__button detail-user__button--submit'>Submit</button>
            </div>
          }

        </form>
        {this.props.error && <Feedback message={this.props.error} />}
      </section>
    </Fragment>
  }
}



{/*              <Link to="/instructor-account" className='detail-user__button detail-user__button--cancel'>Cancel</Link>*/}