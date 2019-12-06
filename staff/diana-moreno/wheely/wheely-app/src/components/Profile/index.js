import React, { Fragment, useContext, useState, useEffect } from 'react'
import './index.sass'
import Navbar from '../Navbar'
import Feedback from '../Feedback'
import { Link } from 'react-router-dom'
import Context from '../CreateContext'
import { retrieveOtherUser } from '../../logic'

export default function ({ onBack, id  }) {
  const [isEditMode, setEditMode] = useState(false)
  const [isFirstNameEdit, setFirstNameEdit] = useState(false)
  const [isLastNameEdit, setLastNameEdit] = useState(false)
  const [isEmailEdit, setEmailEdit] = useState(false)
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [email, setEmail] = useState()
  const [role, setRole] = useState()

  const { roleOwner } = useContext(Context)

  useEffect(() => {
    (async () => {
      const { token } = sessionStorage
      try {
        const user = await retrieveOtherUser(token, id)
        const { user: { name, surname, email, role } } = user
        setFirstName(name)
        setLastName(surname)
        setEmail(email)
        setRole(role)
      }catch (error) {
        console.log(error)
      }
    })()
  }, [])

  const edit = (str) => {
    if(str === 'firstName') {
      setFirstNameEdit(true)
    } else if(str === 'lastName') {
      setLastNameEdit(true)
    } else if (str === 'email') {
      setEmailEdit(true)
    }
    setEditMode(true)
  }

  const cancel = () => {
    setEditMode(false)
    setFirstNameEdit(false)
    setLastNameEdit(false)
    setEmailEdit(false)
  }

  return <Fragment>
    <div className='title'>
      <i onClick={onBack} className="material-icons">undo</i>
      <h3>Profile</h3>
    </div>
    <section className='detail-user'>
      <form>
        <div>
          <button className='detail-user__button--hidden'onClick={() => edit('firstName')}>
            <i className="material-icons detail-user__icon">create</i>
          </button>
          <p className={isFirstNameEdit ? 'detail-user__input--separation' : ''}><b>First name: </b>
            { isFirstNameEdit
            ? <input className='detail-user__input' type='text' placeholder={ firstName } />
            : <span>{ firstName }</span>}
          </p>
        </div>
        <div>
          <button className='detail-user__button--hidden' onClick={() => edit('lastName')}>
            <i className="material-icons detail-user__icon">create</i>
          </button>
          <p className={isLastNameEdit
            ? 'detail-user__input--separation'
            : ''}><b>Last name: </b>{ isLastNameEdit
            ? <input className='detail-user__input' type='text' placeholder={ lastName } />
            : <span>{ lastName }</span>}
          </p>
        </div>

        <div>
          <button className='detail-user__button--hidden' onClick={() => edit('email')}>
            <i className="material-icons detail-user__icon">create</i>
          </button>
          <p className={isEmailEdit
            ? 'detail-user__input--separation'
            : ''}><b>e-mail: </b>{ isEmailEdit
            ? <input className='detail-user__input' type='text' placeholder={ email } />
            : <span>{ email }</span>}
          </p>
        </div>

        {!isEditMode &&
          <div className='detail-user__input--separation-no-icon'>
            <p><b>DNI: </b>78569987W</p>
          </div>
        }

        {!isEditMode &&
          <div className='detail-user__input--separation-no-icon'>
            <p><b>Account: </b>{role}</p>
          </div>
        }

        {isEditMode
          && <Fragment>
              <p>Introduce your password to confirm changes</p>
              <input className='detail-user__input--password' placeholder='password'/>
            </Fragment>
        }


      </form>
 {/*       {this.state.isEditMode && <Feedback feedback={feedback} />}*/}

      {isEditMode &&
        <div>
          <button className='detail-user__button detail-user__button--cancel' onClick={cancel}>Cancel</button>
          <button className='detail-user__button detail-user__button--submit'>Submit</button>
        </div>
      }

      {roleOwner === 'admin' && !isEditMode &&
        <button className='detail-user__button detail-user__button--delete'>Delete user</button>}
    </section>
  </Fragment>

}
