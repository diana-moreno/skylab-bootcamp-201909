function Results({ restaurants }) {
  return(
    <section className="container">
      <ul className="results">
      {restaurants && restaurants.map((restaurant) => (
        <ResultsItem key={restaurant.id} restaurant={restaurant}/>
        ))
      }
      </ul>
    </section>
  )
}