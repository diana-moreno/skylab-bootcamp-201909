module.exports = function({ item, path, favDetailPath, id, isFav }) {
  return (
    `<div class='duck duck--litle'>


      <div class='duck'>
        <form class='duck__favorite duck__favorite--litle' method="post" action="${favDetailPath}">
            <input type="hidden" name="id" value="${item.id}">
            <button class='duck__favorite duck__favorite--litle' type="submit">
              <i class="${item.isFav
                ? 'fas fa-heart'
                : 'far fa-heart' }">
              </i>
            </button>
        </form>
        <h1 class='duck__title'>${item.title}</h1>
        <img class='duck__image' src=${item.imageUrl} />
        <p class='duck__description duck__description--litle'>${item.description}</p>
        <div class='duck__container-buttons'>
          <p class='duck__button'>${item.price}</p>
          <a href="${path}">
            <button class='duck__button duck__button--back'>◀</button>
          </a>
        </div>
      </div>


    </div>`
  )
}


{/*      <i class=${item.isFav
                    ? "duck__favorite duck__favorite--litle fas fa-heart"
                    : 'duck__favorite duck__favorite--litle far fa-heart'}
      ></i>*/}