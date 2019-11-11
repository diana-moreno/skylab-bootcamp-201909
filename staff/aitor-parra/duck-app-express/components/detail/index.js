module.exports = function ({ item: { id, title, image, description, price, link, isFav }, favPath  }) {

    return `
    <section class="view detail">
        <h2 class="detail__title">${title}</h2>
        <img class="detail__image" src=${image}>
        <p class="detail__description">${description}</p>
        <a class="detail__store" href="#">${link}</a>
        <span class="detail__price">${price}</span>
        <span class="detail_fav">
            <form method="post" action="${favPath}">
                <input type="hidden" name="id" value="${id}">
                <button type="submit">${isFav ? '❤️' : '🖤'}</button>
            </form>
        </span>
    </section>`
}
