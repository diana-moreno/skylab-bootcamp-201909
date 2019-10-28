const { Component } = React

class App extends Component {
  state = {}

  render() {
    return(
      <>
        <Search />
        <Results />
        <Detail />
      </>
    )
  }
}