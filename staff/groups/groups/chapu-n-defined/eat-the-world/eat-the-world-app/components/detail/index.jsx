function Detail({ restaurant }) {
document.getElementByClassName("detail__header-container").style.backgroundSize = "cover"
document.getElementByClassName("detail__header-container").style.backgroundImage = "url(" + restaurant.url + ")"
document.getElementByClassName("detail__header-container").style.backgroundPosition = "center" 
  
  return (
    <section className='detail'>
      <div className='detail__main-container'>
        <h1 className='detail__title'>{restaurant.name}</h1>
        <div className='detail__header-container'>
          {/* <img src={restaurant.featured_image}/> */}
          <img src={}/>
          <p className='detail__puntuation'>{restaurant.user_rating.aggregate_rating}</p>
        </div>
        <div className='detail__columns-container'>
          <div className='detail__column-container'>
            <h2 className='detail__detail-title'>Tipo de cocina</h2>
            <p className='detail__cuisine'>{restaurant.cuisines}</p>
            <h2 className='detail__detail-title'>Dirección</h2>
            <p className='detail__direction'>{restaurant.location.address}</p>

            <h2 className='detail__detail-title'>Teléfono</h2>
            <p className='detail__telephone'>{restaurant.phone_numbers}</p>
          </div>
          <div className='detail__column-container'>
            <h2 className='detail__detail-title'>Precio medio</h2>
            <p className='detail__price'>{restaurant.costcurrency}</p>
            <h2 className='detail__detail-title'>Establecimiento</h2>
            <p className='detail__web' href="">{restaurant.establishment}</p>
            <h2 className='detail__detail-title'>Horario</h2>
            <p className='detail__time'>{restaurant.timings}</p>
          </div>
          <div className='detail__column-container detail__featured'>
            <h2 className='detail__detail-title'>Destacados</h2>
            {/* {restaurant.highlights.map((value) => {
               <p>{value}</p>
              })} */}
              <p>{restaurant.highlights[0]}</p>
              <p>{restaurant.highlights[1]}</p>
              <p>{restaurant.highlights[2]}</p>
              <p>{restaurant.highlights[3]}</p>
              <p>{restaurant.highlights[4]}</p>
              <p>{restaurant.highlights[5]}</p>
              <p>{restaurant.highlights[6]}</p>
              <p>{restaurant.highlights[7]}</p>
              <p>{restaurant.highlights[8]}</p>
          </div>
        </div>
      </div>
    </section>
  )
}