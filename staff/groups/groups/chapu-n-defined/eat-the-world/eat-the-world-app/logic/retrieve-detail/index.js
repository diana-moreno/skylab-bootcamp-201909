function retrieveDetail(restId, callback) {
  if (typeof restId !== 'string') throw new TypeError(restId + ' is not a string')
  if (!restId.trim().length) throw new ContentError('restId is empty or blank')
  if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function')

  call('GET', `https://developers.zomato.com/api/v2.1/restaurant?res_id=${restId}`, undefined, undefined, restaurant => {
    restaurant.error ? callback(new Error(restaurant.error)) : callback(undefined, restaurant)

    const { id, token } = sessionStorage
    if (id && token) {
      call('GET', `https://skylabcoders.herokuapp.com/api/user/${id}`, token, undefined, dataUser => {
        if (dataUser.error) return callback(new Error(dataUser.error))

        const { data: { favs = [] } } = dataUser

          restaurant.isFav = favs.includes(restaurant.id)

        callback(undefined, restaurant)
      })
    } else {
      callback(undefined, restaurant)
    }
  })
}