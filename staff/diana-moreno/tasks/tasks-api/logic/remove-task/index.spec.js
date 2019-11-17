require('dotenv').config()
const { env: { DB_URL_TEST } } = process
const { expect } = require('chai')
const removeTask = require('.')
const { random } = Math
const database = require('../../utils/database')
const { ObjectId } = database
const { ContentError, CredentialsError, NotFoundError } = require('../../utils/errors')

describe('logic - remove tasks', () => {

  let client, users, tasks

  before(() => {
    client = database(DB_URL_TEST)

    return client.connect()
      .then(connection => {
        const db = connection.db()

        users = db.collection('users')
        tasks = db.collection('tasks')
      })
  })

  let id, taskId, name, surname, email, username, password

  beforeEach(() => {
    name = `name-${random()}`
    surname = `surname-${random()}`
    email = `email-${random()}@mail.com`
    username = `username-${random()}`
    password = `password-${random()}`

    return users.insertOne({ name, surname, email, username, password })
      .then(user => {
        id = user.insertedId.toString()
        const task1 = {
          user: ObjectId(id),
          title: `title-${random()}`,
          description: `description-${random()}`,
          status: 'TODO',
          date: new Date
        }
        return tasks.insertOne(task1)
          .then(task => taskId = task.insertedId.toString())
      })
  })

  it('should succeed deleting on correct user and task data', () =>
    removeTask(id, taskId)
    .then(response => {
      expect(response).to.be.undefined
      expect(response).not.to.have.length

      return tasks.findOne({ _id: ObjectId(taskId) })
        .then(task => {
          expect(task).to.be.null
        })

    })
  )

  it('should fail on incorrect user', () => {
    const id = '123456789123456789123456'
    return removeTask(id, taskId)
      .then(() => { throw new Error('should not reach this point') })
      .catch(error => {
        expect(error).to.exist
        expect(error).to.be.an.instanceOf(NotFoundError)
        expect(error.message).to.equal(`user with id ${id} not found`)
      })
  })

  it('should fail on incorrect id or taskId type', () => {
    expect(() => removeTask(1)).to.throw(TypeError, '1 is not a string')
    expect(() => removeTask(true)).to.throw(TypeError, 'true is not a string')
    expect(() => removeTask([])).to.throw(TypeError, ' is not a string')
    expect(() => removeTask({})).to.throw(TypeError, '[object Object] is not a string')
    expect(() => removeTask(undefined)).to.throw(TypeError, 'undefined is not a string')
    expect(() => removeTask(null)).to.throw(TypeError, 'null is not a string')

    expect(() => removeTask('')).to.throw(ContentError, 'id is empty or blank')
    expect(() => removeTask(' \t\r')).to.throw(ContentError, 'id is empty or blank')

    expect(() => removeTask(id, 1)).to.throw(TypeError, '1 is not a string')
    expect(() => removeTask(id, true)).to.throw(TypeError, 'true is not a string')
    expect(() => removeTask(id, [])).to.throw(TypeError, ' is not a string')
    expect(() => removeTask(id, {})).to.throw(TypeError, '[object Object] is not a string')
    expect(() => removeTask(id, undefined)).to.throw(TypeError, 'undefined is not a string')
    expect(() => removeTask(id, null)).to.throw(TypeError, 'null is not a string')

    expect(() => removeTask(id, '')).to.throw(ContentError, 'task id is empty or blank')
    expect(() => removeTask(id, ' \t\r')).to.throw(ContentError, 'task id is empty or blank')
  })
})
