function Results({ restaurants, handleFavorite }) {
  return(
    <section className="container">
      <ul className="results">
      {restaurants && restaurants.map((restaurant) => (
        <ResultsItem key={restaurant.id} restaurant={restaurant} handleFavorite={handleFavorite}/>
        ))
      }
      </ul>
    </section>
  )
}