const { Component } = React

class App extends Component {
  state = {
    view: 'landing',
    restaurants: [],
    restaurant: undefined,
    favorites: [],
    isLanding: true,
    user: undefined
  }

  handleLogin = (email, password) => {
    try {
      authenticateUser(email, password, (error, data) => {
        if (error) return this.setState({ error: error.message })
        try {
          const { id, token } = data

          sessionStorage.id = id
          sessionStorage.token = token

          retrieveUser(id, token, (error, user) => {
            if (error) return this.setState({ error: error.message })

            const { name } = user

            this.setState({
              view: this.state.isLanding ? 'landing' : 'search',
              user: name
            })

          })

        } catch (error) {
          this.setState({ error: error.message })
        }

      })
    } catch (error) {
      this.setState({ error: error.message })
    }
  }


  handleRegister = (name, surname, email, password) => {
    try {
      registerUser(name, surname, email, password, error => {
        if (error) return this.setState({ error: error.message })
        this.setState({ view: 'login' })
      })
    } catch (error) {
      this.setState({ error: error.message })
    }
  }

  handleGoToRegister = () => {
    this.setState({ view: 'register', error: undefined })
  }

  handleGoToLogin = () => {
    this.setState({ view: 'login', error: undefined })
  }

  handleBackToLanding = () => { //cambiar
    this.setState({ view: 'landing', error: undefined })
  }

  handleRestaurants = (city, query) => {
    const { id, token } = sessionStorage
    searchRestaurants(city, query, id, token, (error, results) => {
      if (error) {
        console.log(error.message)
      } else {
        this.setState({
          ...this.state,
          isLanding: false,
          view: 'search',
          restaurants: results
        })
      }
    })
  }

  paintHeartsFav(id) {
    let allRestaurants = [...this.state.restaurants, ...this.state.favorites]
    if (this.state.restaurant) allRestaurants = [...allRestaurants, this.state.restaurant]

    allRestaurants.forEach(restaurant => {
      if (restaurant.id === id && !restaurant.isFav) {
        restaurant.isFav = true; //true es favorito
      } else if (restaurant.id === id && restaurant.isFav) {
        restaurant.isFav = false;
      }
      this.setState({
        ...this.state
      })
    })
  }

  handleFavorite = (idItem) => {
    const { id, token } = sessionStorage
    this.paintHeartsFav(idItem)
    toggleFavs(id, token, idItem, (error, result) => {})
    //retrieveFavs(id, token, (error, result) => {})
  }


  handleLogout = () => {
    sessionStorage.clear()
    this.setState({
      ...this.state,
      user: undefined
    })
    this.handleBackToLanding()
  }

  handleDetail = (restaurant) => {   
    this.setState({ view: 'detail', error: undefined, restaurant })
  }

  render() {

    const { state: { view, restaurants, user, restaurant }, handleRegister, handleLogin, handleBackToLanding, handleGoToRegister, handleGoToLogin, handleRestaurants, handleFavorite, handleLogout, handleDetail } = this

    return (
      <>
      { view === 'landing' && <Landing onBack={handleLogout} user={user} search={handleRestaurants} onLogin={handleGoToLogin} onRegister={handleGoToRegister}/>}
      { view === 'search' || view === 'detail' && <Search onBack={handleLogout} user={user} search={handleRestaurants} onLogin={handleGoToLogin} onRegister={handleGoToRegister}/> }
      { view === 'login' && <Login onLogin={handleLogin} onBack={handleBackToLanding} onRegister={handleGoToRegister}/> }
      { view === 'register' && <Register onRegister={handleRegister} onBack={handleBackToLanding}/> }
      { view === 'search' && <Results restaurants={restaurants} handleFavorite={handleFavorite} handleDetail={handleDetail} />}
      { view === 'detail' && <Detail restaurant={restaurant}/>}
      </>
    )
  }
}