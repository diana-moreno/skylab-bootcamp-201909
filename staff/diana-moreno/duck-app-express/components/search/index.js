module.exports = function({ name, query, path, logout }) {
  return (
    `<header class='header view__header'>
      <div class='nav'>
        <div class='nav__links-container'>
        <a class='nav__elems nav__button'

        >Favorites</a>

        <form method="post" action="${logout}">
          <button class='nav__elems nav__button'>Logout</button>
        </form>

        </div>
        <p class='nav__elems'>Hello, ${name}</p>
      </div>
      <h1 class='header__title'>Duck Store</h1>
      <form class='header__form form' method ='get' action='${path}'>
        <input class='form__input' type="text" name="query" placeholder="search..." ${query? `value=${query}` : '' } />
        <button class='form__button'>
          <i class="fas fa-search"></i>
        </button>
      </form>
    </header>`
  )
}
