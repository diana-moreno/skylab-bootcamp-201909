function Search( {user, search, onLogin, onRegister, onBack}) {
  return (
    <header className="header">
      {user ?
        <section className="header__options">
           <a className="header__options-login" href="#" onClick={event =>{
              event.preventDefault()

            }}>Favorites</a>
            <a className="header__options-register" href="#" onClick={event =>{
              event.preventDefault()
              onBack()
            }}>Logout</a>
          <p className='header__options--greeting'>Hello, {user}!</p>
        </section>
        :
      <section className="header__options">
        <a className="header__options-login" href="#" onClick={event =>{
          event.preventDefault()

          onLogin()}}>Login</a>
        <a className="header__options-register" href="#" onClick={event =>{
          event.preventDefault()

          onRegister()
        }}>Create an account</a>
      </section> }
      <h1 className="header__title">Eat The World</h1>
      <h2 className="header__slogan">Lorem ipsum dolor sit amet, consectetur adipiscing elit</h2>
      <form onSubmit={event => {
              event.preventDefault()
              const city = event.target.city.value
              const criteria = event.target.criteria.value
              search(city, criteria)
            }}
        className="header__form">
        <input type="search" className="header__form-search" name="city" placeholder="introduce a city name"/>
        <input type="search" className="header__form-search" name="criteria" placeholder="cuisine type or restaurant name"/>
        <button className="header__form-button">
          <i className="fas fa-utensils"></i>
        </button>
      </form>
    </header>
  )
}