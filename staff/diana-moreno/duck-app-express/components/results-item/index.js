module.exports = function ({ item: { id, title, imageUrl, price, isFav }, favPath }) {
  return(
    `<li class="duck duck--clicked">
      <i></i>
      <h1 class='duck__title'>${title}</h1>
      <img class='duck__image' src="${imageUrl}"/>
      <button class='duck__button'>${price}</button>
    </li>`
  )
}
