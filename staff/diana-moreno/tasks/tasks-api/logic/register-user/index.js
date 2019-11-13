const validate = require('../../utils/validate')
const users = require('../../data/users')() // aunque se llame varias veces, realmente solo se ha generado una instancia del objeto, porque es un SINGLETONE
const uuid = require('uuid/v4')
const { ConflictError } = require('../../utils/errors')

module.exports = function(name, surname, email, username, password) {
  validate.string(name) // parte de errores síncronos se va al catch de los try
  validate.string.notVoid('name', name)
  validate.string(surname)
  validate.string.notVoid('surname', surname)
  validate.string(email)
  validate.string.notVoid('e-mail', email)
  validate.email(email)
  validate.string(username)
  validate.string.notVoid('username', username)
  validate.string(password)
  validate.string.notVoid('password', password)

  return new Promise((resolve, reject) => {
    // comprueba si el usuario ya existe
    const user = users.data.find(user => user.username === username)

    //si existe, error // 409
    if (user) return reject(new ConflictError(`user with username ${username} already exists`)) // error asíncrono

    const id = uuid() // se instala y requiere para generar id randoms

    // guarda los datos en la sesión
    users.data.push({ id, name, surname, email, username, password })

    // guarda los datos en el disco
    users.persist() // persist es una promise, y se resulve con then catch
      .then(resolve)
      .catch(reject) // intentas guardar en disco y no ha funcionado // 500
  })
}
