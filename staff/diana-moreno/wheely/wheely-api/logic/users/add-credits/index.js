const { validate, errors: { ConflictError, NotFoundError } } = require('wheely-utils')
const { ObjectId, models: { User } } = require('wheely-data')

module.exports = function(adminId, studentId, credits) {
  validate.string(adminId)
  validate.string.notVoid('adminId', adminId)
  if (!ObjectId.isValid(adminId)) throw new ContentError(`${adminId} is not a valid id`)

  validate.string(studentId)
  validate.string.notVoid('studentId', studentId)
  if (!ObjectId.isValid(studentId)) throw new ContentError(`${studentId} is not a valid id`)

  validate.number(credits) // en react poner un selector de números que empiece en el 0, así no se podrán elegir números decimales ni negativos

  return (async () => {
    // checks if admin is an admin
    let admin = await User.findOne({ _id: adminId, role: 'admin' })
    if (!admin) throw new NotFoundError(`user with id ${adminId} not found`)

    // checks if student exists
    let student = await User.findOne({ _id: studentId, role: 'student' })
    if (!student) throw new NotFoundError(`user with id ${studentId} not found or not a valid user`)

    // add credits
    await User.updateOne({ _id: studentId }, { $set: { 'profile.credits': credits } }, { multi: true })
  })()
}
