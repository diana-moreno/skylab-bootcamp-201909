import React from 'react'
import './index.sass'
import Navbar from '../Navbar'

export default function () {
  return <>
    <Navbar />
    <section class='reservations'>
      <div class='reservations__category-container'>
        <div class='reservations__category'>
          <ul class='reservations__category-list'>
            <li class='category__item'>
              <div class='category__item-icon'>
                <i class="material-icons">create</i>
              </div>
              <div class='category__item-detail'>
                <p>Lun 24 de abril de 2020</p>
                <p>17:00</p>
                <p>Paco García</p>
              </div>
            </li>
          </ul>
            <form action="" class='form'>
              <textarea class='form__message' name="" id="" cols="30" rows="10" placeholder="Please, write an accurate feedback to your student. Keep in mind that once sent, it won't be possible to edit."></textarea>
              <h4>How has he/she done?</h4>
              <div class="form__puntuation">
                <label class="radio">
                  <input type="radio" name="answer"/>
                  Bad
                </label>
                <label class="radio">
                  <input type="radio" name="answer"/>
                  Regular
                </label>
                <label class="radio">
                  <input type="radio" name="answer"/>
                  Good
                </label>
              </div>
              <button class='form__button'>Send</button>
            </form>
        </div>
      </div>
    </section>
  </>
}



