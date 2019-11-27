const { validate, errors: { NotFoundError, ConflictError } } = require('wheely-utils')
const { ObjectId, models: { User, Practice, Reservation, Instructor } } = require('wheely-data')

module.exports = function (instructorId, studentId, price, date) {
  // validate sincronous errors
  validate.string(instructorId)
  validate.string.notVoid('instructorId', instructorId)
  if (!ObjectId.isValid(instructorId)) throw new ContentError(`${instructorId} is not a valid id`)

  validate.string(studentId)
  validate.string.notVoid('studentId', studentId)
  if (!ObjectId.isValid(studentId)) throw new ContentError(`${studentId} is not a valid id`)

  validate.number(price)
  validate.date(date)

  return (async () => {

    // check if student exists
    let student = await User.findOne({ _id: studentId, role: 'student' })
    if (!student) throw new NotFoundError(`user with id ${id} not found`)

    // check if the student has credits available
    if(student.profile.credits > 0) {

      // check if instructor exists
      let instructor = await User.findOne({ _id: instructorId, role: 'instructor' })
      if (!instructor) throw new NotFoundError(`user with id ${instructorId} not found`)

      // check if a practice with the same date exists
      let existingDate = await Practice.findOne({ date: date })
      if(existingDate) throw new ConflictError(`practice with date ${date} already exists`)

      // create the practice with a reservation embebed
      let reservation = await Reservation.create({ price, instructorId, studentId })
      let practice = await Practice.create({ date, reservation })

      // update instructor to add the new practice
      // update student profile with the new practice and a credit less
      student.profile.credits = student.profile.credits - 1
      student.profile.practices = [...student.profile.practices, practice.id]
      instructor.profile.practices = [...instructor.profile.practices, practice.id]

      await User.update({ _id: studentId }, { $set: {'profile.practices': student.profile.practices, 'profile.credits': student.profile.credits}  }, { multi: true })
      await User.update({ _id: instructorId }, { $set: {'profile.practices': instructor.profile.practices}  }, { multi: true })
debugger

/*      await student.save()
      await instructor.save()
*/
      return practice.id
    } else {
      throw new ConflictError(`user has no credits`)
    }
  })()
}
