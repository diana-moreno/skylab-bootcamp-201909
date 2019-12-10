import React, { Fragment, useContext, useState, useEffect } from 'react'
import './index.sass'
import Navbar from '../Navbar'
import Feedback from '../Feedback'
import { Link } from 'react-router-dom'
import Context from '../CreateContext'
import { retrieveOtherUser, deleteUser, editUser } from '../../logic'

export default function ({ onBack, id  }) {
  const [isEditMode, setEditMode] = useState(false)
  const [isFirstNameEdit, setFirstNameEdit] = useState(false)
  const [isLastNameEdit, setLastNameEdit] = useState(false)
  const [isEmailEdit, setEmailEdit] = useState(false)
  const [isCreditsEdit, setCreditsEdit] = useState(false)
  const [isDniEdit, setDniEdit] = useState(false)
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [role, setRole] = useState()
  const [credits, setCredits] = useState()
  const [dni, setDni] = useState()

  const { roleOwner } = useContext(Context)
  const { token } = sessionStorage

  useEffect(() => {
    (async () => {
      try {

        const user = await retrieveOtherUser(token, id)

        const { user: { name, surname, email, dni, role, profile: { credits } } } = user
        setDni(dni)
        setFirstName(name)
        setLastName(surname)
        setEmail(email)
        setRole(role)
        setCredits(credits)
      }catch (error) {
        console.log(error)
      }
    })()
  }, [])

  const enableEditMode = (str) => {
    if(str === 'firstName') {
      setFirstNameEdit(!isFirstNameEdit)
    } else if(str === 'lastName') {
      setLastNameEdit(!isLastNameEdit)
    } else if (str === 'email') {
      setEmailEdit(!isEmailEdit)
    } else if(str === 'credits') {
      setCreditsEdit(!isCreditsEdit)
    } else if(str === 'dni') {
      setDniEdit(!isDniEdit)
    }
    setEditMode(true)
  }

  const disableEditMode = () => {
    setEditMode(false)
    setFirstNameEdit(false)
    setLastNameEdit(false)
    setEmailEdit(false)
    setCreditsEdit(false)
    setDniEdit(false)
  }

  const handleDeleteUser = async () => {
    try {
      await deleteUser(token, id)
    } catch (error) {
        console.log(error)
    }
  }

  const handleSubmit = event => {
    event.preventDefault()
    handleEditUser(firstName, lastName, email, dni, credits, password)
  }

  const handleEditUser = async (firstName, lastName, email, dni, credits, password) => {
    try {
      await editUser(token, id, firstName, lastName, email, dni, credits, password)
    } catch (error) {
        console.log(error)
    }
  }

  return <Fragment>
    <div className='title'>
      <i onClick={onBack} className="material-icons">undo</i>
      <h3>Profile</h3>
    </div>
    <section className='detail-user'>
      <form onSubmit={handleSubmit} >
        <div>
          <button type="button" className='detail-user__button--hidden' onClick={() => enableEditMode('firstName')}>
            <i className="material-icons detail-user__icon">create</i>
          </button>
          <p className={isFirstNameEdit ? 'detail-user__input--separation' : ''}><b>First name: </b>
            { isFirstNameEdit
            ? <input className='detail-user__input' type='text' placeholder={ firstName } name='name' value={firstName} onChange={event => setFirstName(event.target.value)} />
            : <span>{ firstName }</span>}
          </p>
        </div>
        <div>
          <button type="button" className='detail-user__button--hidden' onClick={() => enableEditMode('lastName')}>
            <i className="material-icons detail-user__icon">create</i>
          </button>
          <p className={isLastNameEdit
            ? 'detail-user__input--separation'
            : ''}><b>Last name: </b>{ isLastNameEdit
            ? <input className='detail-user__input' type='text' placeholder={ lastName } name='surname' value={lastName} onChange={event => setLastName(event.target.value)} />
            : <span>{ lastName }</span>}
          </p>
        </div>

        <div>
          <button type="button" className='detail-user__button--hidden' onClick={() => enableEditMode('email')}>
            <i className="material-icons detail-user__icon">create</i>
          </button>
          <p className={isEmailEdit
            ? 'detail-user__input--separation'
            : ''}><b>e-mail: </b>{ isEmailEdit
            ? <input className='detail-user__input' type='text' placeholder={ email } name='email' value={email} onChange={event => setEmail(event.target.value)} />
            : <span>{ email }</span>}
          </p>
        </div>

        {roleOwner === 'admin' && role === 'student' &&
          <div>
            <button type="button" className='detail-user__button--hidden' onClick={() => enableEditMode('credits')}>
              <i className="material-icons detail-user__icon">create</i>
            </button>
            <p className={isCreditsEdit
              ? 'detail-user__input--separation'
              : ''}><b>credits: </b>{ isCreditsEdit
              ? <input className='detail-user__input' type="number" pattern="[0-9]*" placeholder={credits} name='credits' min='0' value={credits} onChange={event => setCredits(Number(event.target.value))} />
              : <span>{ credits }</span>}
            </p>
          </div>
        }

        {roleOwner === 'admin' &&
        <div>
          <button type="button" className='detail-user__button--hidden' onClick={() => enableEditMode('dni')}>
            <i className="material-icons detail-user__icon">create</i>
          </button>

          <p className={isDniEdit
            ? 'detail-user__input--separation'
            : ''}><b>DNI: </b>{ isDniEdit
            ? <input className='detail-user__input' type="text" placeholder={ dni } name='dni' value={dni} onChange={event => setDni(event.target.value)} />
            : <span>{ dni }</span>}
          </p>
        </div>
        }

        {roleOwner !== 'admin' &&
          <div className='detail-user__input--separation-no-icon'>
            <p><b>DNI: </b>{dni}</p>
          </div>
        }

        {!isEditMode &&
          <div className='detail-user__input--separation-no-icon'>
            <p><b>Account: </b>{role}</p>
          </div>
        }

        {isEditMode && roleOwner !== 'admin'
          && <Fragment>
              <p>Introduce your password to confirm changes</p>
              <input className='detail-user__input--password' type='password' placeholder='password' name='password' value={password} onChange={event => setPassword(event.target.value)} />
            </Fragment>
        }


      {isEditMode &&
        <div>
          <button type="button" className='detail-user__button detail-user__button--cancel' onClick={disableEditMode}>Cancel</button>
          <button type='submit' className='detail-user__button detail-user__button--submit'>Submit</button>
        </div>
      }
      </form>
 {/*       {this.state.isEditMode && <Feedback feedback={feedback} />}*/}


      {roleOwner === 'admin' && !isEditMode &&
        <button type="button" onClick={handleDeleteUser} className='detail-user__button detail-user__button--delete'>Delete user</button>}
    </section>
  </Fragment>

}