const { validate, errors: { NotFoundError, ContentError } } = require('wheely-utils')
const { ObjectId, models: { User, Student, Instructor } } = require('wheely-data')

module.exports = function(id) {
  validate.string(id)
  validate.string.notVoid('id', id)
  if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)

  return (async () => {
    const user = await User.findById(id)

    if (!user) throw new NotFoundError(`user with id ${id} not found`)

    user.lastAccess = new Date

    await user.save()
    const { name, surname, email, profile, role, lastAccess } = user.toObject()// toObject breaks the connection with the data base to avoid possible modifications

    return { id, name, surname, email, profile, role, lastAccess }
    // we don't want to retrieve the password, it's private!
  })()
}
