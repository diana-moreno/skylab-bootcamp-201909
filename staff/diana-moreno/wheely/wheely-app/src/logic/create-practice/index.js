const call = require('../../utils/call')
const { validate, errors: { NotFoundError, CredentialsError } } = require('wheely-utils')
const API_URL = process.env.REACT_APP_API_URL

module.exports = function(token, instructorId, dateTime) {
  debugger
  validate.string(token)
  validate.string.notVoid('token', token)

  validate.string(instructorId)
  validate.string.notVoid('instructorId', instructorId)

/*  validate.date(dateTime)*/
// como validar la fecha?


  return (async () => {
    const res = await call(`${API_URL}/practices`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ instructorId, dateTime })
    })

    if (res.status === 201) return JSON.parse(res.body).id

    if (res.status === 401) throw new CredentialsError(JSON.parse(res.body).message)

    if (res.status === 404) throw new NotFoundError(JSON.parse(res.body).message)

    throw new Error(JSON.parse(res.body).message)
  })()
}
