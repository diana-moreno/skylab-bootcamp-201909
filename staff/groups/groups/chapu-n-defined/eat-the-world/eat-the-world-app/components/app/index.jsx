const { Component } = React

class App extends Component {
  state = {
    view: 'search',
    restaurants: [],
    restaurant: undefined,
    favorites: []
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

            this.setState({ view: 'search', user: name })

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
        this.setState({ view: 'search' })
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

  handleBackToSearch = () => {
    this.setState({ view: 'search', error: undefined })
  }

  handleRestaurants = (city, query) => {
    const { id, token } = sessionStorage
    searchRestaurants(city, query, id, token, (error, results) => {
      if (error) {
        console.log(error.message)
      } else {
        this.setState({
          ...this.state,
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

  handleDetail = (restaurant) => {   
    this.setState({ view: 'detail', error: undefined, restaurant })
  }

  render() {

    const { state: { view, restaurants, restaurant }, handleRegister, handleLogin, handleBackToSearch, handleGoToRegister, handleGoToLogin, handleRestaurants, handleFavorite, handleDetail } = this

    return ( <> 
      { view === 'search' && <Search search={handleRestaurants} onLogin={handleGoToLogin} onRegister={handleGoToRegister}/> }
      { view === 'login' && <Login onLogin={handleLogin} onBack={handleBackToSearch} onRegister={handleGoToRegister}/> } 
      { view === 'register' && <Register onRegister={handleRegister} onBack={handleBackToSearch}/> }
      <Results restaurants={restaurants} handleFavorite={handleFavorite} handleDetail={handleDetail}/> 
      { view === 'detail' && <Detail restaurant={restaurant}/>}

      </>
    )
  }
}