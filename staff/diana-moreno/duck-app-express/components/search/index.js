module.exports = function({ name }/*{searchDucks, username, onFavs, logout}*/) {
  return (
    `<header class='header view__header'>
      <div class='nav'>
        <div class='nav__links-container'>
        <a class='nav__elems nav__link'

        >Favorites</a>
        <a class='nav__elems nav__link'>Logout

        </a>
        </div>
        <p class='nav__elems'>Hello, ${name}</p>
      </div>
      <h1 class='header__title'>Duck Store</h1>
      <form
        class='header__form form'>
        <input class='form__input' type="text" name="query" placeholder="search..." />
        <button class='form__button'>
          <i class="fas fa-search"></i>
        </button>
      </form>
    </header>`
  )
}
