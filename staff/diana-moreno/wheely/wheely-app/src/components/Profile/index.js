import React, { Fragment, useContext } from 'react'
import './index.sass'
import Navbar from '../Navbar'
import Feedback from '../Feedback'
import { Link } from 'react-router-dom'
import Context from '../CreateContext'

export default class Account extends React.Component {
 /* const { role } = useContext(Context)*/
constructor(props) {
  super(props)

  this.state = {
      isEditMode: false,
      firstName: {
        value: '',
        edit: false,
      },
      lastName: {
        value: '',
        edit: false
      },
      email: {
        value: '',
        edit: false
      },
      role: ''
  }
}

  async componentDidMount() {
    /*let user = await this.props.onRetrieveUser()*/
    let user = await this.props.onRetrieveOtherUser(this.props.id)
    let roleOwner = this.props.roleOwner
/*    let user = this.props.user*/
    const { user: { name, surname, email, role } } = user
    this.setState({
      isEditMode: false,
      firstName: {
        value: name,
        edit: false,
      },
      lastName: {
        value: surname,
        edit: false
      },
      email: {
        value: email,
        edit: false
      },
      role,
      roleOwner
    })
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

    const { state: { isEditMode, role, roleOwner, firstName: { value: firstName, edit: isFirstNameEdit }, lastName: { value: lastName, edit: isLastNameEdit }, email: { value: email, edit: isEmailEdit } }, edit, cancel }= this

    return <Fragment>
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
}
