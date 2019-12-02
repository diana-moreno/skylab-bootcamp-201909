import React from 'react'
import './index.sass'
import Navbar from '../Navbar'
import NavigationLinks from './NavigationLinks'


export default function () {
  let state = {
    isEditMode: false,
    name: {
      value: 'Carlos',
      edit: false,
    }
  }

  return <React.Fragment>
    <Navbar />
    <section class='detail-user'>
      <div>
        <a href="#" onClick={() => state.name.edit = true}>
          <i class="material-icons detail-user__icon">create</i>
        </a>
        <p><b>Name:</b>{' '}{ state.name.edit
          ? <input type='text' placeholder={ state.name.value } />
          : <span>{ state.name.value }</span>
        }
        </p>
      </div>
      <div>
        <a href="">
          <i class="material-icons detail-user__icon">create</i>
        </a>
        <p><b>Surname: </b><span>López</span></p>
      </div>
      <div>
        <a href="">
          <i class="material-icons detail-user__icon">create</i>
        </a>
        <p><b>Email: </b><span>carlos@gmail.com</span></p>
      </div>
      { !state.isEditMode && <NavigationLinks /> }
      {
        state.isEditMode &&
        <React.Fragment>
          <button>Submit</button>
        </React.Fragment>
      }
    </section>

  </React.Fragment>
}
