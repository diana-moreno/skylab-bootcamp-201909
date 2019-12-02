const { validate, errors: { ConflictError, NotFoundError, ContentError } } = require('wheely-utils')
const { ObjectId, models: { User } } = require('wheely-data')

module.exports = function(id, name, surname, email) {
  validate.string(id)
  validate.string.notVoid('id', id)
  if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)

  if (name) {
    validate.string(name)
    validate.string.notVoid('name', name)
  }
  if (surname) {
    validate.string(surname)
    validate.string.notVoid('surname', surname)
  }
  if (email) {
    validate.string.notVoid('e-mail', email)
    validate.email(email)
  }

  return (async () => {
    // check if user exists
    const user = await User.findById(id)
    if (!user) throw new NotFoundError(`user with id ${id} not found`)

    //update data
    const update = {}

    name && (update.name = name)
    surname && (update.surname = surname)
    email && (update.email = email)
/*    password && (update.password = password)*/
    update.lastAccess = new Date

    await User.updateOne({ _id: ObjectId(id) }, { $set: update })
  })()
}
