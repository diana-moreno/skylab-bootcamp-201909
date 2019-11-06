module.exports = function() {
  return(
    `<li class="duck duck--clicked">
      <i></i>
      <h1 class='duck__title'>{duck.title}</h1>
      <img onClick={event => item(duck)}
        class='duck__image' src={duck.imageUrl}/>
      <button class='duck__button'>{duck.price}</button>
    </li>``
  )
}
