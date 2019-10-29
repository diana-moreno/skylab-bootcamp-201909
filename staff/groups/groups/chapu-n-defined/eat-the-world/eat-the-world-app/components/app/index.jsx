const { Component } = React

class App extends Component {
  state = {
    restaurants: [],
    restaurant: undefined,
    favorites: []
  }

  handleRestaurants = (city, query) => {
    searchRestaurants(city, query, (error, results) => {
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
  }

  render() {

    const { state: { restaurants }, handleRestaurants, handleFavorite } = this

    return ( <
      >
      <Search search={handleRestaurants}/>
      <Results restaurants = { restaurants } handleFavorite = { handleFavorite }
      />
      <Detail />
      </>
    )
  }
}