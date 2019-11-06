const https = require('https')
require('url')

module.exports = function (method, _url, headers, body, callback) {

    console.log('ENTRA EN FETCH')
    const { hostname, pathname } = new URL(_url) // por qué _?

    const request = https.request({ method, hostname, headers, path: pathname }, callback)

    body && request.write(JSON.stringify(body))
    request.end()
}
