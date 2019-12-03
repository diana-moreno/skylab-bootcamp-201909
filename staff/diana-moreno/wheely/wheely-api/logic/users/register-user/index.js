const { validate, errors: { ConflictError, NotFoundError, ContentError } } = require('wheely-utils')
const { ObjectId, models: { User, Student, Instructor } } = require('wheely-data')

module.exports = function(adminId, name, surname, email, password, role) {
  debugger
  validate.string(adminId)
  validate.string.notVoid('adminId', adminId)
  if (!ObjectId.isValid(adminId)) throw new ContentError(`${adminId} is not a valid id`)
  validate.string(name)
  validate.string.notVoid('name', name)
  validate.string(surname)
  validate.string.notVoid('surname', surname)
  validate.string(email)
  validate.string.notVoid('e-mail', email)
  validate.email(email)
  validate.string(password)
  validate.string.notVoid('password', password)
  validate.string(role)
  validate.string.notVoid('role', role)

  return (async () => {
    // checks if admin is an admin
    let admin = await User.findOne({ _id: adminId, role: 'admin' })
    if (!admin) throw new NotFoundError(`user with id ${adminId} not found`)

    // checks if user already exists
    let user = await User.findOne({ email })
    if (user) throw new ConflictError(`user with email ${email} already exists`)

    // create new user depending on the role
    user = await User.create({ name, surname, email, password, role })
    if (role === 'student') user.profile = new Student()
    if (role === 'instructor') user.profile = new Instructor()

    await user.save()
  })()
}




