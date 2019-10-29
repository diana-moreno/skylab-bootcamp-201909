const { Component } = React

class App extends Component {
<<<<<<< HEAD
  state = {view: 'login'}
=======
  state = {
    restaurants: []
  }
>>>>>>> eat-the-world-develop


  handleRestaurants = (city, query) => {
    searchRestaurants(city, query, (error, results) => {
      if(error) {
        console.log(error.message)
      } else {
        this.setState({
          ...this.state,
          restaurants: results
        })
      }
    })
  }

  handleLogin(email, password) {
    try {
        authenticateUser(email, password, (error, data) => {
            if (error) this.setState({ error: error.message })
            else console.log(data)
        })
    } catch (error) {
        this.setState({ error: error.message })
    }
}

handleRegister(name, surname, email, password) {
  try {
    registerUser(name, surname, email, password, (error, data) => {
        if (error) this.setState({ error: error.message })
        else console.log(data)
    })
} catch (error) {
    this.setState({ error: error.message })
}
}

handleGoToRegister = () => {
  this.setState({view: 'register', error: undefined})
}

handleBackToSearch = () => {
  this.setState({ view: 'search', error: undefined })
}

  render() {
<<<<<<< HEAD
    const { state: {view}, handleRegister, handleLogin, llamada, handleBackToSearch, handleGoToRegister} = this
    return<>
        {view == 'search' && <Search search={llamada}/>}
        {view == 'login' && <Login onLogin={handleLogin} onBack={handleBackToSearch} onRegister={handleGoToRegister}/>}
        {view == 'register' && <Register onRegister={handleRegister} onBack={handleBackToSearch}/>}
=======

    const { state: { restaurants }, handleRestaurants } = this

    return(
      <>
        <Search search={handleRestaurants}/>
        <Results restaurants={restaurants}/>
        <Detail />
>>>>>>> eat-the-world-develop
      </>

  }
}