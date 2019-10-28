const { Component } = React

class App extends Component {
  state = {}


  handleRestaurants = (city, query) => {
    searchRestaurants(city, query, (error, results) => {
      if(error) {
        console.log(error.message)
      } else {
        results.forEach(elem => console.log(elem))
      }

    })
  }

  render() {
    return(
      <>
        <Search search={this.handleRestaurants}/>
        <Results />
        <Detail />
      </>
    )
  }
}