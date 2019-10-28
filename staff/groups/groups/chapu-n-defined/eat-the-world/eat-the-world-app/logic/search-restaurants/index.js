function searchRestaurants(city, query, callback) {

  if(typeof query !== 'string') throw new TypeError(query + ' is not a string')
  if(typeof city !== 'string') throw new TypeError(city + ' is not a string')
  if(typeof callback !== 'function') throw new TypeError(callback + ' is not a function')

  call('GET', "https://developers.zomato.com/api/v2.1/locations?query=" + city, undefined, undefined, resultCity => {

    if (resultCity.error) return callback(new Error(resultCity.error))
    let cityId = resultCity['location_suggestions'][0]['entity_id']

    call('GET', `https://developers.zomato.com/api/v2.1/search?cuisines=55&entity_id=${cityId}&entity_type=city&q=${query}`, undefined, undefined, resultRestaurants => {

      if (resultRestaurants.error) return callback(new Error(resultRestaurants.error))

      resultRestaurants = resultRestaurants.restaurants.map(
        ({restaurant:{ id, average_cost_for_two, currency, cuisines, highlights, location, name, url, featured_image, timings, user_rating }})=>
          ({ id, average_cost_for_two, currency, cuisines, highlights, location, name, url, featured_image, timings, user_rating }))

      resultRestaurants.forEach(result => {
        let indexDot = result.location.address.indexOf(',')
        if(indexDot) {
          result.location.address = result.location.address.slice(0, indexDot)
        }
      })
      callback(undefined, resultRestaurants)
    })
  })
}
