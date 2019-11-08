module.exports = function ({ item: { id, title, imageUrl, price, isFav }, favPath }) {
  return(
    `<li class="duck duck--clicked">
      <i class="${isFav
        ? 'duck__favorite fas fa-heart'
        : 'duck__favorite far fa-heart' }">
      </i>
      <h1 class='duck__title'>${title}</h1>
      <img class='duck__image' src="${imageUrl}"/>
      <button class='duck__button'>${price}</button>
    </li>`
  )
}



/*
React:
function ResultsItem({ duck, item, add, handleFavorite }) {
  return(
    <li className="duck duck--clicked">
      <i className={duck.isFav
                    ? "duck__favorite fas fa-heart"
                    : 'duck__favorite far fa-heart'}
      onClick={event => handleFavorite(duck.id)}></i>
      <h1 className='duck__title'>{duck.title}</h1>
      <img onClick={event => item(duck)}
        className='duck__image' src={duck.imageUrl}/>
      <button className='duck__button'>{duck.price}</button>
    </li>
  )
}
*/