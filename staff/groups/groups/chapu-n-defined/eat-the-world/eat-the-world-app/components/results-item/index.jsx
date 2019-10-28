function ResultsItem() {
  return(
    <li className="results__item">
      <a href="#" className="item">
        <img className="item__image" src="https://dummyimage.com/140x110/3d4f91/ffffff"/>
        <div className="item__contdata">
          <h5 className="item__contdata-category">PIZZERIA</h5>
          <h2 className="item__contdata-title">Grimaldi's Pizzeria</h2>
          <h4 className="item__contdata-zone">Greenwich</h4>
          <p className="item__contdata-address">314 West 11th Street 10014</p>
        </div>
        <div className="item__contvotes">
          <p className="item__contvotes-vote">4.7</p>
          <p className="item__contvotes-numvotes">2456 votes</p>
        </div>
      </a>
    </li>
  )
}