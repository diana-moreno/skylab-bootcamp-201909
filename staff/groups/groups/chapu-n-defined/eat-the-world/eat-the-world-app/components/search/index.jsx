function Search( {search}) {
  return (
    <header className="header">
      <section className="header__options">
        <a className="header__options-login" href="#">Login</a>
        <a className="header__options-register" href="#">Create an account</a>
      </section>
      <h1 className="header__title">Eat The World</h1>
      <h2 className="header__slogan">Lorem ipsum dolor sit amet, consectetur adipiscing elit</h2>
      <form className="header__form">
        <input type="search" className="header__form-search" name="query" placeholder="introduce a city name"/>
        <button className="header__form-button">
          <i
          onClick={event => {
            event.preventDefault()
            search('Chicago', 'pizza')
          }}
          className="fas fa-utensils"></i>
        </button>
      </form>
    </header>
  )
}