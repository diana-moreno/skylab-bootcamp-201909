const { validate, errors: { NotFoundError, ConflictError } } = require('wheely-utils')
const { ObjectId, models: { User, Practice, Instructor } } = require('wheely-data')

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

    //delete practice from practices collection
    await Practice.deleteOne({ _id: ObjectId(practiceId) })

    // delete practice in student account

    const index1 = student.profile.practices.findIndex(practice => practice === practiceId)
    if (index1 < 0) throw new NotFoundError(`practice with id ${practiceId} not found`)
    student.profile.practices.splice(index1, 1)

    await User.updateOne({ _id: studentId }, { $set: { 'profile.practices': student.profile.practices } }, { multi: true })

    // delete practice in instructor account

    const index2 = instructor.profile.practices.findIndex(practice => practice === practiceId)
    if (index2 < 0) throw new NotFoundError(`practice with id ${practiceId} not found`)
    instructor.profile.practices.splice(index2, 1)

    await User.updateOne({ _id: instructorId }, { $set: { 'profile.practices': instructor.profile.practices } }, { multi: true })
  })()
}

//realmente es necesrio que usuario tenga prácticas, en su ficha???
//i


// al alumno hay que eliminarle la practica
// al profesor hay que eliminarle la practica
// al profesor hay que eliminarle el alumno si no tiene más prácticas con él

/*
    let a = await User.updateOne(
      { _id: ObjectId(studentId) },
      { $set: { "profile.$practices" : practices} },
      { $pull: { practices: practiceId }}
    )*/
