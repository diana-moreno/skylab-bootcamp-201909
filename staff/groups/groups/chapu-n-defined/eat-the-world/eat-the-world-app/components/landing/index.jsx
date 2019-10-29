function Landing({search, onLogin, onRegister}) {
  return (
    <header className="header header--landing">
      <section className="header__options header__options--landing">
        <a className="header__options-login" href="#" onClick={event =>{
          event.preventDefault()

          onLogin()}}>Login</a>
        <a className="header__options-register" href="#" onClick={event =>{
          event.preventDefault()

          onRegister()
        }}>Create an account</a>
      </section>
      <h1 className="header__title header__title--landing">Eat The World</h1>
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