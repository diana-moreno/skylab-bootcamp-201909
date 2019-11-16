const validate = require('../../utils/validate')
const users = require('../../data/users')()
const { NotFoundError } = require('../../utils/errors')
const database = require('../../utils/database')
const { ObjectId } = database

module.exports = function(id) {
  validate.string(id) // 400
  validate.string.notVoid('id', id) // 400

  const client = database()
  return client.connect()
    .then(connection => {
      const users = connection.db().collection('users')

      return users.findOne({ _id: ObjectId(id) })
        .then(user => {
          if (!user) throw new NotFoundError(`user with id ${id} not found`)
          const { name, surname, email, username } = user // envía user destructurado
          return { id, name, surname, email, username }
        })
    })
}
