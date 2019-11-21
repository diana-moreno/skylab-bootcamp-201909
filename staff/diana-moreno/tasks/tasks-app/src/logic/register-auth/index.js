const call = require('../../utils/call')
const { validate } = require('tasks-util')
const { env: { REACT_APP_API_URL: API_URL } } = process

module.exports = function(username, password) {
  validate.string(username)
  validate.string.notVoid('username', username)
  validate.string(password)
  validate.string.notVoid('password', password)

  return (async () => {
    const res = await call(`${API_URL}/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })

    if (res.status === 200) return res.json()

    throw new Error(JSON.parse(res.body).message)
  })()
}
