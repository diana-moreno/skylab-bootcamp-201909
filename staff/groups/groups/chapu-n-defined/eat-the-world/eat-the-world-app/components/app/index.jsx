const { Component } = React

class App extends Component {
  state = {view: 'login'}


  llamada = () => {
    pruebaCall(result => {
      console.log(result)
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
    const { state: {view}, handleRegister, handleLogin, llamada, handleBackToSearch, handleGoToRegister} = this
    return<>
        {view == 'search' && <Search search={llamada}/>}
        {view == 'login' && <Login onLogin={handleLogin} onBack={handleBackToSearch} onRegister={handleGoToRegister}/>}
        {view == 'register' && <Register onRegister={handleRegister} onBack={handleBackToSearch}/>}
      </>

  }
}