const { validate, errors: { NotFoundError, ConflictError } } = require('wheely-utils')
const { ObjectId, models: { User, Practice, Reservation } } = require('wheely-data')

module.exports = function (instructorId, studentId, price, date) {
  validate.string(instructorId)
  validate.string.notVoid('instructorId', instructorId)
  if (!ObjectId.isValid(instructorId)) throw new ContentError(`${instructorId} is not a valid id`)

  validate.string(studentId)
  validate.string.notVoid('studentId', studentId)
  if (!ObjectId.isValid(studentId)) throw new ContentError(`${studentId} is not a valid id`)

  validate.number(price)
/*  validate.date(date)*/

  return (async () => {
    debugger
    const student = await User.findOne({ _id: studentId, role: 'student' })
    if (!student) throw new NotFoundError(`user with id ${id} not found`)

    const instructor = await User.findOne({ _id: instructorId, role: 'instructor' })
    if (!instructor) throw new NotFoundError(`user with id ${instructorId} not found`)

    let existingDate = await Practice.findOne({ date: date })
    if(existingDate) throw new ConflictError(`practice with date ${date} already exists`)


    let reservation = await Reservation.create({ price, instructorId, studentId })
    let practice = await Practice.create({ date, reservation })

    return practice.id
  })()
}
