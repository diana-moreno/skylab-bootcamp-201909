const https = require('https')
const url = require('url')

module.exports = function (method, _url, headers, body, callback) {

    const { hostname, pathname } = new URL(_url)

    const request = https.request({ method, hostname, headers, path: pathname }, callback)

    body && request.write(JSON.stringify(body))
    request.end()
}
