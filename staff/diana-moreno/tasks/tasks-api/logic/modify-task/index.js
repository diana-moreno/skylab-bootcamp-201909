const validate = require('../../utils/validate')
const database = require('../../utils/database')
const { NotFoundError, ConflictError } = require('../../utils/errors')
const { ObjectId } = database

module.exports = function(id, taskId, title, description, status) {
  validate.string(id)
  validate.string.notVoid('id', id)
  validate.string(taskId)
  validate.string.notVoid('task id', taskId)
  if (title) {
    validate.string(title)
    validate.string.notVoid('title', title)
  }
  if (description) {
    validate.string(description)
    validate.string.notVoid('description', description)
  }
  if (status) {
    validate.string(status)
    validate.string.notVoid('status', status)
    validate.matches('status', status, 'TODO', 'DOING', 'REVIEW', 'DONE')
  }

  const client = database()

  return client.connect()
    .then(connection => {
      const db = connection.db()
      users = db.collection('users')
      tasks = db.collection('tasks')

      return users.findOne({ _id: ObjectId(id) })
        .then(user => {
          if (!user) throw new NotFoundError(`user with id ${id} not found`)

          return tasks.findOne({ _id: ObjectId(taskId) }, { user: ObjectId(id) })
            .then((task) => {
              if (!task) throw new NotFoundError(`user does not have task with id ${taskId}`)

              if(!title) title = task.title
              if(!description) description = task.description
              if(!status) status = task.status

              tasks.updateOne({ _id: ObjectId(taskId) }, { $set: { title: title, description: description, status: status, lastAccess: new Date } })
            })
        })
    })
}

/*              title &&
                tasks.updateOne({ _id: ObjectId(taskId) }, { $set: { title: title, lastAccess: new Date } })
            })
            .then(() => {
              description &&
                tasks.updateOne({ _id: ObjectId(taskId) }, { $set: { description: description, lastAccess: new Date } })

            })
            .then(() => {
              status &&
                tasks.updateOne({ _id: ObjectId(taskId) }, { $set: { status: status, lastAccess: new Date } })
            })*/

/*
    return new Promise((resolve, reject) => {
        const user = users.data.find(user => user.id === id)

        if (!user) return reject(new NotFoundError(`user with id ${id} not found`))

        const task = tasks.data.find(({ id }) => id === taskId)

        if (!task) return reject(new NotFoundError(`user does not have task with id ${taskId}`))

        if (task.user !== id) return reject(new ConflictError(`user with id ${id} does not correspond to task with id ${taskId}`))

        title && (task.title = title)
        description && (task.description = description)
        status && (task.status = status)
        task.lastAccess = new Date

        tasks.persist().then(resolve).catch(reject)
    })*/
