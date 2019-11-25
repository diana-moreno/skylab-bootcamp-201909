const { validate, errors: { ConflictError } } = require('tasks-util')
const { models: { User } } = require('tasks-data')

module.exports = function(name, surname, email, password) {
  validate.string(name)
  validate.string.notVoid('name', name)
  validate.string(surname)
  validate.string.notVoid('surname', surname)
  validate.string(email)
  validate.string.notVoid('e-mail', email)
  validate.email(email)
  validate.string(password)
  validate.string.notVoid('password', password)

  return (async () => {
    const user = await User.findOne({ email })
    if(user) throw new ConflictError(`user with email ${email} already exists`)

    rol === 'student' && user.detail = new Student() // ?????


    await User.create({ name, surname, email, password })
  })()
}
