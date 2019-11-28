const { validate, errors: { NotFoundError, ConflictError } } = require('wheely-utils')
const { ObjectId, models: { User, Practice, Instructor } } = require('wheely-data')

module.exports = function(instructorId, studentId, date) {
  // sincronous validate
  validate.string(instructorId)
  validate.string.notVoid('instructorId', instructorId)
  if (!ObjectId.isValid(instructorId)) throw new ContentError(`${instructorId} is not a valid id`)

  validate.string(studentId)
  validate.string.notVoid('studentId', studentId)
  if (!ObjectId.isValid(studentId)) throw new ContentError(`${studentId} is not a valid id`)

  return (async () => {

    // check if student exists
    let student = await User.findOne({ _id: studentId, role: 'student' })
    if (!student) throw new NotFoundError(`user with id ${id} not found`)

    // check if the student has credits available
    if (student.profile.credits > 0) { // change to >0, this is only a test

      // check if instructor exists
      let instructor = await User.findOne({ _id: instructorId, role: 'instructor' })
      if (!instructor) throw new NotFoundError(`user with id ${instructorId} not found`)

      // check if a practice with the same date exists
      let existingDate = await Practice.findOne({ date: date })
      if (existingDate) throw new ConflictError(`practice with date ${date} already exists`)

      // create the practice with a reservation embebed
  /*    let reservation = await Reservation.create({ instructorId, studentId })*/
      let practice = await Practice.create({ date, instructorId, studentId })

      // update instructor to add the new practice and the student
      // update student profile with the new practice and a credit less
      student.profile.credits = student.profile.credits - practice.price
      student.profile.practices.push(practice.id)
      instructor.profile.practices.push(practice.id)
      instructor.profile.students.push(studentId)

      await User.updateOne({ _id: studentId }, { $set: { 'profile.practices': student.profile.practices, 'profile.credits': student.profile.credits } }, { multi: true })
      await User.updateOne({ _id: instructorId }, { $set: { 'profile.practices': instructor.profile.practices, 'profile.students': instructor.profile.students } }, { multi: true })

      // returns the practice-id
      return practice.id
    } else {
      throw new ConflictError(`user has no credits`)
    }
  })()
}
// falta comprobar si la hora está disponible en el array de schedule del profesor, por ahora no la añado porque el profesor no tiene horarios aún