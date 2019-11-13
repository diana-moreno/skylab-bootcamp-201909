const validate = require('../../utils/validate')
const users = require('../../data/users')()
const { NotFoundError } = require('../../utils/errors')

module.exports = function(id) {
  validate.string(id) // 400
  validate.string.notVoid('id', id) // 400

  return new Promise((resolve, reject) => {
    const user = users.data.find(user => user.id === id)

    //401
    if (!user) return reject(new NotFoundError(`user with id ${id} not found`))

    user.lastAccess = new Date

    users.persist()
      .then(() => {
        const { name, surname, email, username } = user
        resolve({ id, name, surname, email, username })
      })
      //.catch(reject) // 500
  })
}
