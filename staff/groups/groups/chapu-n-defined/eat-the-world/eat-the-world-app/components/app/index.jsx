const { Component } = React

class App extends Component {
  state = {}


  llamada = () => {
    pruebaCall(result => {
      console.log(result)
    })
  }

  render() {
    return(
      <>
        <Search search={this.llamada}/>
        <Results />
        <Detail />
      </>
    )
  }
}