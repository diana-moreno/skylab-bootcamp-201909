import React, { Fragment, useContext, useState, useEffect } from 'react'
import './index.sass'
import Navbar from '../Navbar'
import Feedback from '../Feedback'
import { Link } from 'react-router-dom'
import Context from '../CreateContext'
import { retrieveOtherUser, deleteUser, editUser } from '../../logic'

const LabelField = (props) => (
  <div>
    <button {...props.btnProps} onClick={props.handleClick}>
      <i className="material-icons detail-user__icon">create</i>
    </button>
    <p className={props.isEditMode ? 'detail-user__input--separation' : ''}>
      <b>{props.label}: </b> { props.children }
    </p>
  </div>
)

const DNIField = (props) => {
  const klassName = 'detail-user__input'

  const editComponent = (
    <div>
      <button {...props.btnProps} onClick={props.handleClick}>
        <i className="material-icons detail-user__icon">create</i>
      </button>

      <p className={props.isEditMode ? `${klassName}--separation` : ''}>
        <b>DNI: </b> { props.isEditMode
          ? <input
              className={klassName}
              type="text"
              placeholder={ props.value }
              name='dni'
              value={props.value}
              onChange={props.handleOnChange} />
          : <span>{ props.value }</span>
        }
      </p>
    </div>
  )

  const displayComponent = (
    <div className={`${klassName}--separation-no-icon`}>
      <p><b>DNI: </b>{props.value}</p>
    </div>
  )

  return (
    <Fragment>
      { props.canEdit ? editComponent : displayComponent }
    </Fragment>
  )
}


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
      } catch (error) {
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
      disableEditMode()
    } catch (error) {
        console.log(error)
    }
  }

  const editFirstName = (
    isFirstNameEdit
      ? (<input
          className='detail-user__input'
          type='text'
          placeholder={ firstName }
          name='name'
          value={firstName}
          onChange={event => setFirstName(event.target.value)}
        />)
      : <span>{ firstName }</span>
  )
  const editLastName = (
    isLastNameEdit
      ? (<input
          className='detail-user__input'
          type='text'
          placeholder={ lastName }
          name='surname'
          value={lastName}
          onChange={event => setLastName(event.target.value)}
        />)
      : <span>{ lastName }</span>
  )
  const editEmail = ( isEmailEdit
    ? (<input
        className='detail-user__input'
        type='text'
        placeholder={ email }
        name='email'
        value={email}
        onChange={event => setEmail(event.target.value)}
      />)
    : <span>{ email }</span>)
  const btnProps = {
    type: "button",
    className: 'detail-user__button--hidden',
  }
  const editIcon = (<i className="material-icons detail-user__icon">create</i>)

  const editCredits = (
    roleOwner === 'admin' && role === 'student' && <div>
      <button {...btnProps} onClick={() => enableEditMode('credits')}>
        { editIcon }
      </button>
      <p className={isCreditsEdit ? 'detail-user__input--separation': ''}>
        <b>credits: </b> { isCreditsEdit
          ? (<input
              className='detail-user__input'
              type="number"
              pattern="[0-9]*"
              placeholder={credits}
              name='credits'
              min='0'
              value={credits}
              onChange={event => setCredits(Number(event.target.value))}
            />)
          : <span>{ credits }</span>}
      </p>
    </div>)

  return <Fragment>
    <div className='title'>
      <i onClick={onBack} className="material-icons">undo</i>
      <h3>Profile</h3>
    </div>
    <section className='detail-user'>
      <form onSubmit={handleSubmit} >
        <LabelField
          btnProps={btnProps}
          handleClick={() => enableEditMode('firstName')}
          isEditMode={isFirstNameEdit}
          label={'First name'}
        >{ editFirstName }</LabelField>
        <LabelField
          btnProps={btnProps}
          handleClick={() => enableEditMode('lastName')}
          isEditMode={isLastNameEdit}
          label={'Last name'}
        >{ editLastName }</LabelField>
        <LabelField
          btnProps={btnProps}
          handleClick={() => enableEditMode('email')}
          isEditMode={isEmailEdit}
          label={'e-mail'}
        >{ editEmail }</LabelField>

        { editCredits }

        <DNIField
          canEdit={roleOwner === 'admin'}
          handleClick={() => enableEditMode('dni')}
          btnProps={btnProps}
          isEditMode={isDniEdit}
          value={dni}
          handleOnChange={event => setDni(event.target.value)}
        />

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
