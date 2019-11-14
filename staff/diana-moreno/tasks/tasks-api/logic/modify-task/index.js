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
    const user = users.data.find(user => user.id === id)

    if (!user) return reject(new NotFoundError(`user with id ${id} not found`))

    const _tasks = tasks.data.filter(({ user }) => user === id)
    const _task = _tasks[0]

    if(title === '' && title !== _task.title) {
      _task.title = title
    }
    if(description === '' && description !== _task.description) {
      _task.description = description
    }

    _task.lastAccess = new Date // actualiza último acceso

    tasks.persist()
      .then(() => resolve(_task.id)) // devuelve el id de la tarea
      .catch(reject) // peta con error
  })
}
