import React from 'react'
import './index.sass'
import Navbar from '../Navbar'

export default function () {
  return <>
    <Navbar />
    <section className='reservations'>
      <div className='reservations__category-container'>
        <div className='reservations__category'>
          <ul className='reservations__category-list'>
            <li className='category__item'>
              <div className='category__item-icon'>
                <i className="material-icons">create</i>
              </div>
              <div className='category__item-detail'>
                <p>Lun 24 de abril de 2020</p>
                <p>17:00</p>
                <p>Paco García</p>
              </div>
            </li>
          </ul>
            <form action="" className='form'>
              <textarea className='form__message' name="" id="" cols="30" rows="10" placeholder="Please, write an accurate feedback to your student. Keep in mind that once sent, it won't be possible to edit."></textarea>
              <h4>How has he/she done?</h4>
              <div className="form__puntuation">
                <label className="radio">
                  <input type="radio" name="answer"/>
                  Bad
                </label>
                <label className="radio">
                  <input type="radio" name="answer"/>
                  Regular
                </label>
                <label className="radio">
                  <input type="radio" name="answer"/>
                  Good
                </label>
              </div>
              <button className='form__button'>Send</button>
            </form>
        </div>
      </div>
    </section>
  </>
}



