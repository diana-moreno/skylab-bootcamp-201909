const { validate, errors: { ConflictError } } = require('wheely-utils')
const { models: { User, Student, Instructor } } = require('wheely-data')

module.exports = function(name, surname, email, password, role) {
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
    let user = await User.findOne({ email })
    if(user) throw new ConflictError(`user with email ${email} already exists`)

    user = await User.create({ name, surname, email, password, role })
    // create saves in database but new User not.
    if(role === 'student') user.profile = new Student()
    if(role === 'instructor') user.profile = new Instructor()

    await user.save()
  })()
}

/*    if(role === 'admin') new Admin()
    {
      let students = await User.find({role: "student"} , {name:0})
      user.profile = new Admin()

    }*/