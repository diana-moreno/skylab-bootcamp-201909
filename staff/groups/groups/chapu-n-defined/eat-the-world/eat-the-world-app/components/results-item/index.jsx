function ResultsItem({ restaurant }) {
  return(
    <li className="results__item">
      <a href="#" className="item">
        <div>
          <img className="item__image" src={restaurant.featured_image} />
        </div>
        <div className="item__contdata">
          <h5 className="item__contdata-category">{restaurant.cuisines}</h5>
          <h2 className="item__contdata-title">{restaurant.name}</h2>
          <h4 className="item__contdata-zone">{restaurant.location.city}</h4>
          <p className="item__contdata-address">{restaurant.location.address}</p>
        </div>
        <p className="item__contvotes-vote">4.7</p>
      </a>
    </li>
  )
}