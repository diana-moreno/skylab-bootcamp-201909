const call = require('../../utils/call')
const { validate, errors: { CredentialsError, NotFoundError, ConflictError } } = require('tasks-util')
const API_URL = process.env.REACT_APP_API_URL

module.exports = function(token, status, title) {
  validate.string(token)
  validate.string.notVoid('token', token)
  validate.string(status)
  validate.string.notVoid('status', status)
  validate.string(title)
  validate.string.notVoid('title', title)

  return (async () => {
    const res = await call(`${API_URL}/tasks`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status, title })
    })

    if (res.status === 200) return JSON.parse(res.body).task
    if (res.status === 401) throw new CredentialsError(JSON.parse(res.body).message)
    if (res.status === 404) throw new NotFoundError(JSON.parse(res.body).message)
    if (res.status === 409) throw new ConflictError(JSON.parse(res.body).message)
  })()
}

/*
fetch('http://192.168.0.41:8000/tasks', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZGQyYjhlMTllYWQ1ZWFiNDllYzRjZTIiLCJpYXQiOjE1NzQwOTEwMzIsImV4cCI6MTU3NDE3NzQzMn0.Q574vZOvPhAjB6yBtjAhKeCe2MUwDmdE6CRoQdP9Oog',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ title: 'hello world', description: 'blah blah blah' })
})
  .then(res => res.json())
  .then(res => { debugger })
*/
