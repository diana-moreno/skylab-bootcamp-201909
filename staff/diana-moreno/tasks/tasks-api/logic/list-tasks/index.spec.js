require('dotenv').config()
const { env: { DB_URL_TEST } } = process
const { expect } = require('chai')
const listTasks = require('.')
const { random } = Math
const database = require('../../utils/database')
const { ObjectId } = database
const { ContentError, CredentialsError, NotFoundError } = require('../../utils/errors')

const uuid = require('uuid')

describe.only('logic - list tasks', () => {

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

  let id, name, surname, email, username, password

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
        tasks.insertOne(task1)

        const task2 = {
          user: ObjectId(id),
          title: `title-${random()}`,
          description: `description-${random()}`,
          status: 'TODO',
          date: new Date
        }
        tasks.insertOne(task2)
      })
  })

  it('should succeed on correct user and task data', () =>
    listTasks(id)
    .then(result => {
      expect(result).to.exist
      expect(result).to.have.length.greaterThan(0)
      expect(result).to.be.an.instanceOf(Array)
      expect(result.length).to.be.equal(2)

      result.forEach(task => {
        expect(task._id.toString()).to.exist
        expect(task.user.toString()).to.equal(id)

        expect(task.status).to.be.a('string')
        expect(task.date).to.be.an.instanceOf(Date)

        expect(task.title).to.exist
        expect(task.title).to.be.a('string')

        expect(task.description).to.exist
        expect(task.description).to.be.a('string')
        expect(task.description).to.have.length.greaterThan(0)

        expect(task.status).to.exist
        expect(task.status).to.be.a('string')
        expect(task.status).to.have.length.greaterThan(0)
        expect(task.lastAccess).to.exist
        expect(task.lastAccess).to.be.an.instanceOf(Date)
      })
    })
  )

  it('should fail on incorrect user', () => {
    const id = '123456789123456789123456'
    return listTasks(id)
      .then(() => { throw new Error('should not reach this point') })
      .catch(error => {
        expect(error).to.exist
        expect(error).to.be.an.instanceOf(NotFoundError)
        expect(error.message).to.equal(`user with id ${id} not found`)
      })
  })

  it('should fail on incorrect id type', () => {
    expect(() => listTasks(1)).to.throw(TypeError, '1 is not a string')
    expect(() => listTasks(true)).to.throw(TypeError, 'true is not a string')
    expect(() => listTasks([])).to.throw(TypeError, ' is not a string')
    expect(() => listTasks({})).to.throw(TypeError, '[object Object] is not a string')
    expect(() => listTasks(undefined)).to.throw(TypeError, 'undefined is not a string')
    expect(() => listTasks(null)).to.throw(TypeError, 'null is not a string')

    expect(() => listTasks('')).to.throw(ContentError, 'id is empty or blank')
    expect(() => listTasks(' \t\r')).to.throw(ContentError, 'id is empty or blank')
  })
})
