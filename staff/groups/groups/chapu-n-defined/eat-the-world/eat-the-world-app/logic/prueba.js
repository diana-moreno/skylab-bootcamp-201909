
function pruebaCall(callback) {
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function')

    call('GET', "https://developers.zomato.com/api/v2.1/search?cuisines=55&entity_id=94741&entity_type=zone", undefined, undefined, result => {
        if (result.error) return callback(new Error(result.error))
        console.log(result)

    })
}
