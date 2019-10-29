
function call(method, url, token, body, callback) {

    let headers = {}
    if (body) headers['Content-Type'] = 'application/json;charset=UTF-8'
    if (token) headers['Authorization'] = `Bearer ${token}`
    if (!body && !token) headers['user-key'] = '20fa610b558218a2ba8a9d490fbd2a3a'


  fetch(method, url, headers, body, response => {
    if (response.readyState == 4) { // && response.status == 201 to make all responses correct
      const result = JSON.parse(response.responseText)

      callback(result)
    }
  })
}
