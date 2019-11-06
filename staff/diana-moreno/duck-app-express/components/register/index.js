module.exports = function() {
  return(
    `<section class='view view__register'>
      <img class='view__register--image' src="pato-goma-amarillo-plano-brillante_23-2148275403.jpg" alt="" />
      <h2 class='view__register--title'>Please, introduce your details</h2>
      <form class="form form--login" method="POST"
      >
        <input class='form__input' type="text" name="name"
          placeholder="name" />
        <input class='form__input' type="text" name="surname"
          placeholder="surname" />
        <input class='form__input' type="text" name="email"
          placeholder="email" />
        <input class='form__input' type="password" name="password"
          placeholder="password" />
        <button class='form__button form__button--register'>Create account</button>
      </form>
      <button class='form__button form__button--register-back'
      >Back to login
      </button>
      <div class='feedback'>

      </div>
    </section>`
  )
}
