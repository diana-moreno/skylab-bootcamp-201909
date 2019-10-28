const { Component } = React

class App extends Component {
  state = {view: 'register'}


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
  console.log('register')
}

  render() {
    const { state: { view}, handleRegister, handleLogin, llamada} = this
    return<>
        {view == 'search' && <Search search={llamada}/>}
        {view == 'login' && <Login onLogin={handleLogin}/>}
        {view == 'register' && <Register onRegister={handleRegister}/>}
      </>

  }
}