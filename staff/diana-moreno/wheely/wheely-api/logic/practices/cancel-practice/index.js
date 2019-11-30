const { validate, errors: { NotFoundError, ConflictError, ContentError } } = require('wheely-utils')
const { ObjectId, models: { User, Practice, Instructor } } = require('wheely-data')
const moment = require('moment')

module.exports = function(instructorId, studentId, practiceId) {
  // sincronous validate
  validate.string(instructorId)
  validate.string.notVoid('instructorId', instructorId)
  if (!ObjectId.isValid(instructorId)) throw new ContentError(`${instructorId} is not a valid id`)

  validate.string(studentId)
  validate.string.notVoid('studentId', studentId)
  if (!ObjectId.isValid(studentId)) throw new ContentError(`${studentId} is not a valid id`)

  validate.string(practiceId)
  validate.string.notVoid('practiceId', practiceId)
  if (!ObjectId.isValid(practiceId)) throw new ContentError(`${practiceId} is not a valid id`)

  return (async () => {
    // check if student exists
    let student = await User.findOne({ _id: studentId, role: 'student' })
    if (!student) throw new NotFoundError(`user with id ${studentId} not found`)

    // check if instructor exists
    let instructor = await User.findOne({ _id: instructorId, role: 'instructor' })
    if (!instructor) throw new NotFoundError(`user with id ${instructorId} not found`)

    // check if the practice exists and matches with student and instructor
    let practice = await Practice.findOne({ _id: practiceId, studentId: studentId, instructorId: instructorId })
    if (!practice) throw new NotFoundError(`practice with id ${practiceId} not found`)

    // check if the practice is pending (otherside is not possible to cancel)
    if (practice.status !== 'pending') {
      throw new ConflictError(`practice with id ${practiceId} is not possible to cancel`)
    }

    // check if remain at least 24h to allow cancel the practice
    if(moment(new Date()).add(1,'days') > moment(practice.date)) {
      throw new ConflictError(`practice with id ${practiceId} is not possible to cancel`)
    }

    //delete practice from practices collection
    await Practice.deleteOne({ _id: ObjectId(practiceId) })
  })()
}
