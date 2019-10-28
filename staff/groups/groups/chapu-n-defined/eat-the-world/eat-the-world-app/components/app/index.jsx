const { Component } = React

class App extends Component {
  state = {
    restaurants: []
  }


  handleRestaurants = (city, query) => {
    searchRestaurants(city, query, (error, results) => {
      if(error) {
        console.log(error.message)
      } else {
        results.forEach(elem => console.log(elem))
        this.setState({
          ...this.state,
          restaurants: results
        })
      }

    })
  }

  render() {

    const { state: { restaurants }, handleRestaurants } = this

    return(
      <>
        <Search search={handleRestaurants}/>
        <Results restaurants={restaurants}/>
        <Detail />
      </>
    )
  }
}