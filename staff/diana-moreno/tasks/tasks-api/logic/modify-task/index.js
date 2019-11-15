const validate = require('../../utils/validate')
const users = require('../../data/users')()
const tasks = require('../../data/tasks')()
const uuid = require('uuid/v4')
const { NotFoundError } = require('../../utils/errors')

module.exports = function(id, title, description) {
  validate.string(id)
  validate.string.notVoid('id', id)
  validate.string(title)
  validate.string.notVoid('title', title)
  validate.string(description)
  validate.string.notVoid('description', description)

  return new Promise((resolve, reject) => {
    const task = tasks.data.find(task => task.id === id)
    if (!task) return reject(new NotFoundError(`task with id ${id} not found`))

    task.title = title
    task.description = description
    task.lastAccess = new Date // actualiza último acceso


    tasks.persist()
      .then(() => resolve(task.id)) // devuelve el id de la tarea
      .catch(reject) // peta con error
  })
}
