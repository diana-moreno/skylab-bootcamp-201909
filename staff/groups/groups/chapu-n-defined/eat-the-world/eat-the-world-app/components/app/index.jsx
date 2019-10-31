const { Component } = React

class App extends Component {
  state = {
    view: 'landing',
    restaurants: [],
    restaurant: undefined,
    favorites: [],
    isLanding: true,
    isDetail: false,
    user: undefined,
    error: { city: false}
  }

  UNSAFE_componentWillMount() {
    const { id, token } = sessionStorage
    if(id && token) {
      retrieveUser(id, token, (error, user) => {
        if (error) return this.setState({ error: error.message })

        const { name } = user

        this.setState({
          user: name
        })

      })
    }
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
              view: this.state.isLanding ? 'landing' : 'results',
              user: name,
              error: { city: false}
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
        this.setState({ view: 'login', error: { city: false} })
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

  handleBack = () => { //cambiar
    this.setState({
      ...this.state,
      view: this.state.isLanding ? 'landing' : this.state.isDetail ? 'detail': 'results' ,
      user: name,
      error: { city: false}
    })

  }

  handleRestaurants = (city, query) => {
    const { id, token } = sessionStorage
    searchRestaurants(city, query, id, token, (error, results) => {
      if (error) {
        console.log(error.message)
        this.setState({
          ...this.state,
          view: 'feedback'
        })
      } else {
        this.setState({
          ...this.state,
          isLanding: false,
          view: results.length !== 0 ? 'results' : 'feedback',
          restaurants: results,
          error: { city: false}
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
    this.handleBack()
  }

  handleDetail = (restaurant) => {
    this.setState({view: 'detail', error: undefined, restaurant, isDetail: true, error: { city: false}})
  }

  handleFavorites = () => {
            console.log('pene')

    const { id, token } = sessionStorage
    try {
      retrieveFavs(id, token, (error, favs) => {
        if (error) return this.setState({ error: error.message })
          favs.forEach(fav => {
            fav.isFav = true
          })
          this.setState({
            ...this.state,
            view: 'favorites',
            favorites: favs
          })
      })
    } catch (error) {
      this.setState({ error: error.message })
    }
  }

  validateInputs = (city, criteria) => {
    if(city === '') {
      this.setState({
        ...this.state,
        error: {
          city: city === '' ? true : false,
        }
      })
    } else {
      this.handleRestaurants(city, criteria)
    }
  }

  render() {
    const { state: { view, restaurants, user, favorites, restaurant }, handleRegister, handleLogin, handleBack, handleGoToRegister, handleGoToLogin, handleFavorite, handleLogout, handleFavorites, handleDetail, validateInputs } = this

    return (
      <div className='main-container'>
      { view === 'landing' && <Landing onBack={handleLogout} user={user} onLogin={handleGoToLogin} onRegister={handleGoToRegister} onFavorites={handleFavorites} validateInputs={validateInputs} error={this.state.error.city}/>}
      { (view === 'feedback' || view === 'results' || view === 'favorites' || view === 'detail') && <Search onBack={handleLogout} user={user} onLogin={handleGoToLogin} onRegister={handleGoToRegister} onFavorites={handleFavorites} validateInputs={validateInputs} error={this.state.error.city} /> }
      { view === 'login' && <Login onLogin={handleLogin} onBack={handleBack} onRegister={handleGoToRegister}/> }
      { view === 'register' && <Register onRegister={handleRegister} onBack={handleBack}/> }
      { view === 'results' && <Results restaurants={restaurants} handleFavorite={handleFavorite} handleDetail={handleDetail}/>}
      { view === 'favorites' && <Results view={view} restaurants={favorites} handleFavorite={handleFavorite} handleDetail={handleDetail} />}
      { view === 'detail' && <Detail restaurant={restaurant}/>}
      { view === 'feedback' && <Feedback />}
      { (view !== 'landing' && view !== 'login' && view !== 'register') && <Footer/>}
      </div>
      )
  }
}