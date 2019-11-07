const fetch = require('../utils')

module.exports= function (method, token, url, body, callback) {
    let headers= {}
    if (token) headers['Authorization'] = `Bearer ${token}`
    if (body) headers['Content-Type'] = 'application/json;charset=UTF-8'

    fetch (method, url, headers, body, function (response) {
        response.pipe(callback(JSON.parse(content)))
    })
}