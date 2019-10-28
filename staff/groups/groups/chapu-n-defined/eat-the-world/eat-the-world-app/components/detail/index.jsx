function Detail() {
  return (
    <section className='detail'>
      <div className='detail__main-container'>
        <h1 className='detail__title'>NOMBRE DEL RESTAURANTE</h1>
        <div className='detail__header-container'>
          <img src="./images/restaurant.png"/>
          <p className='detail__puntuation'>4.5</p>
        </div>
        <div className='detail__columns-container'>
          <div className='detail__column-container'>
            <h2 className='detail__detail-title'>Tipo de cocina</h2>
            <p className='detail__cuisine'>Maroccan</p>
            <h2 className='detail__detail-title'>Dirección</h2>
            <p className='detail__direction'>W 53rd Street & 7th Ave New York, NY 10019</p>
            <h2 className='detail__detail-title'>Teléfono</h2>
            <p className='detail__telephone'>(347) 527-1505</p>
          </div>
          <div className='detail__column-container'>
            <h2 className='detail__detail-title'>Precio medio</h2>
            <p className='detail__price'>25$ para dos personas</p>
            <h2 className='detail__detail-title'>Sitio Web</h2>
            <a className='detail__web' href="">Sitio Web</a>
            <h2 className='detail__detail-title'>Horario</h2>
            <p className='detail__time'>11am a 2am</p>
          </div>
          <div className='detail__column-container detail__featured'>
            <h2 className='detail__detail-title'>Destacados</h2>
              <p>Dinner</p>
              <p>Takeaway Available</p>
              <p>Lunch</p>
              <p>Serves Alcohol</p>
              <p>Cash</p>
              <p>Credit Card</p>
              <p>Michelin Starred</p>
              <p>Indoor Seating</p>
              <p>Table booking recommended</p>
              <p>Lunch menu</p>
              <p>Fullbar</p>
          </div>
        </div>
      </div>
    </section>
  )
}