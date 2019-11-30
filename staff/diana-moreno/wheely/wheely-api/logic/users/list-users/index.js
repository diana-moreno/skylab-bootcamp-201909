const { validate, errors: { NotFoundError, ConflictError } } = require('wheely-utils')
const { ObjectId, models: { User, Practice, Instructor } } = require('wheely-data')

module.exports = function(id, query) {
  validate.string(id)
  validate.string.notVoid('id', id)
  if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)

  if (query) {
    validate.string(query)
    validate.string.notVoid('query', query)
  }

  return (async () => {
    let student = await User.findOne({ _id: id, role: 'student' })
    let instructor = await User.findOne({ _id: id, role: 'instructor' })
    let admin = await User.findOne({ _id: id, role: 'admin' })
    if (student) throw new ConflictError(`user with id ${id} has no permision`)
    if (!student && !instructor && !admin) {
      throw new NotFoundError(`user with id ${id} not found`)
    }

    let users

    // the result returned depends on the user who is demanding (permission control)
    if (admin && !query) {
      users = await User
        .find()
        .lean()
    } else if (admin && query === 'instructors') {
      users = await User
        .find({ "role": "instructor" })
        .lean()
    } else if (instructor) {
      users = await Practice
        .find({ "instructorId": ObjectId(id), "status": 'pending' }, { "studentId": 1 })
        .populate('studentId')
        .lean()
    }

    return users
  })()
}
