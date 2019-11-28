const { validate, errors: { NotFoundError, ConflictError } } = require('wheely-utils')
const { ObjectId, models: { User, Practice, Reservation, Instructor } } = require('wheely-data')

module.exports = function(userId) {
  // sincronous validate
  validate.string(userId)
  validate.string.notVoid('userId', userId)
  if (!ObjectId.isValid(userId)) throw new ContentError(`${userId} is not a valid id`)

  return (async () => {

    //check if the user exists
    let student = await User.findOne({ _id: userId, role: 'student' })
    let instructor = await User.findOne({ _id: userId, role: 'instructor' })
    let admin = await User.findOne({ _id: userId, role: 'admin' })
    if (admin) {
      throw new ConflictError(`admin has no practices`)
    }
    if (!student && !instructor && !admin) {
      throw new NotFoundError(`user with id ${userId} not found`)
    }

    let pendingPractices

    if (student) {
      pendingPractices = await Practice.find({ "reservation.studentId": ObjectId(userId), "status": 'pending' })
    } else if (instructor) {
      pendingPractices = await Practice.find({ "reservation.instructorId": ObjectId(userId), "status": 'pending' })
    }
debugger
    return pendingPractices
  })()
}
