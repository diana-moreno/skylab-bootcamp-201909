const call = require('../../utils/call')
const { validate, errors: { ConflictError } } = require('wheely-utils')
const API_URL = process.env.REACT_APP_API_URL

export default () => {

  const token = sessionStorage.token
  validate.string(token)
  validate.string.notVoid('token', token)

    return (async () => {
        const res = await call(`${API_URL}/users/user`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })


        if (res.status === 200) {
          const { user: { role }} = JSON.parse(res.body)
          return role
        }

        if (res.status === 409) throw new ConflictError(JSON.parse(res.body).message)

        throw new Error(JSON.parse(res.body).message)
    })()
}