function Results({ restaurants, handleFavorite, handleDetail}) {
  return(
    <section className="container">
      <ul className="results">
      {restaurants && restaurants.map((restaurant) => (
        <ResultsItem key={restaurant.id} restaurant={restaurant} handleFavorite={handleFavorite} handleDetail={handleDetail}/>
        ))
      }
      </ul>
    </section>
  )
}