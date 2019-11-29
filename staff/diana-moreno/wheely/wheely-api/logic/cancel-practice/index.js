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
    if (!practice) throw new ConflictError(`practice with id ${practiceId} does not exists`)

    // check if the practice is pending (otherside is not possible to cancel)
    if (practice.status !== 'pending') {
      throw new ConflictError(`practice with id ${practiceId} is not possible to cancel`)
    } else {

    }

    //delete practice from practices collection
    await Practice.deleteOne({ _id: ObjectId(practiceId) })

    // delete practice from users collection, for student and instructor
debugger
    let a = await User.findOne({ _id: ObjectId(studentId)})
    const index = a.profile.practices.findIndex(practice=>practice===practiceId)
    if(index<0) throw new Error('ha ido mal')
    a.profile.practices.splice(index, 1)

    debugger
/*    await a.save()
console.log(a)
debugger*/

/*          student.profile.credits = student.profile.credits - practice.price
      student.profile.practices.push(practice.id)
      instructor.profile.practices.push(practice.id)
      instructor.profile.students.push(studentId)*/

      await User.updateOne({ _id: studentId }, { $set: { 'profile.practices': a.profile.practices} }, { multi: true })
debugger

  })()
}


// al alumno hay que eliminarle la practica
// al profesor hay que eliminarle la practica
// al profesor hay que eliminarle el alumno si no tiene más prácticas con él

/*
    let a = await User.updateOne(
      { _id: ObjectId(studentId) },
      { $set: { "profile.$practices" : practices} },
      { $pull: { practices: practiceId }}
    )*/