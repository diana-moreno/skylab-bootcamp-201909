function retrieveFavs(id, token, callback) {
/*  validate.string(id)
  validate.string.notVoid('id', id)
  validate.string(token)
  validate.string.notVoid('token', token)
  validate.function(callback)*/

  call('GET', 'https://skylabcoders.herokuapp.com/api/user/' + id, token, undefined, result => {

    if (result.error) return callback(new Error(result.error))
    const { data: { favs = [] } } = result
    let counter = 0,
      error

    if (favs.length) {
      favs.forEach((fav, i) => {
        call('GET', `https://developers.zomato.com/api/v2.1/restaurant?res_id=${favs[i]}`, undefined, undefined, result2 => {
          if (result2.error) return callback(error = new Error(result2.error))
          // we change the id of the favorite restaurants from the data base with the restaurants of the API
          favs[i] = result2
          if (++counter === favs.length) callback(undefined, favs) // this condicional solves to repeat the callback in each iteration
        })
      })
    } else {
      callback(undefined, favs)
    }
  })
}