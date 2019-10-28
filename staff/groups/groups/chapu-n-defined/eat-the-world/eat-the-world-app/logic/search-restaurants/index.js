function searchRestaurants(city, query, callback) {

  if(typeof query !== 'string') throw new TypeError(query + ' is not a string')
  if(typeof callback !== 'function') throw new TypeError(callback + ' is not a function')

  call('GET', "https://developers.zomato.com/api/v2.1/locations?query=" + city, undefined, undefined, result => {

    if (result.error) return callback(new Error(result.error))
    let cityId = result['location_suggestions'][0]['entity_id']

    call('GET', `https://developers.zomato.com/api/v2.1/search?cuisines=55&entity_id=${cityId}&entity_type=city&q=${query}`, undefined, undefined, result2 => {

      if (result2.error) return callback(new Error(result2.error))

      console.log(result2)

      result2 = result2.restaurants.map(
        ({restaurant:{ average_cost_for_two, currency, cuisines, highlights, location, name, url, featured_image, timings }})=>
          ({ average_cost_for_two, currency, cuisines, highlights, location, name, url, featured_image, timings }))

      console.log(result2)
      callback(undefined, result2)
    })
  })
}

/*
94741
average_cost_for_two
currency
cuisines
highlights
location
name
url
featured_image
timings*/