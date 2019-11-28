const { validate, errors: { NotFoundError, ConflictError } } = require('wheely-utils')
const { ObjectId, models: { User, Practice, Instructor } } = require('wheely-data')

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
    if (admin || instructor) {
      throw new ConflictError(`user with id ${userId} has no progression`)
    }
    if (!student && !instructor && !admin) {
      throw new NotFoundError(`user with id ${userId} not found`)
    }

    let practices

    // retrieves only the practices of the student that has been done and has a feedback
    if (student) {
      practices = await Practice.find({ "studentId": ObjectId(userId), "status": 'done', "feedback": { $exists: true, $ne: null } }).populate('instructorId').populate('studentId').lean()
    }
    return practices
  })()
}