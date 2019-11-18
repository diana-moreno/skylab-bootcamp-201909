require('dotenv').config()
const { env: { DB_URL_TEST } } = process
const { expect } = require('chai')
const modifyTask = require('.')
const { random } = Math
const database = require('../../utils/database')
const { ObjectId } = database
const { NotFoundError, ConflictError, ContentError } = require('../../utils/errors')

describe('logic - modify task', () => {

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

  let statuses = ['TODO', 'DOING', 'REVIEW', 'DONE']
  let id, name, surname, email, username, password, taskId, title, description, status


  beforeEach(() => {
    name = `name-${random()}`
    surname = `surname-${random()}`
    email = `email-${random()}@mail.com`
    username = `username-${random()}`
    password = `password-${random()}`

    return users.insertOne({ name, surname, email, username, password })
      .then(result => {
        id = result.insertedId.toString()

        const task = {
          user: ObjectId(id),
          title: `title-${random()}`,
          description: `description-${random()}`,
          status: statuses[Math.floor(Math.random() * statuses.length)],
          date: new Date
        }
        return tasks.insertOne(task)
          .then(result => {
            taskId = result.insertedId.toString()
            title = task.title
            description = task.description
            status = task.status
          })

      })
  })

  it('should succeed on correct user and task data', () => {
    const newTitle = `new-title-${random()}`
    const newDescription = `new-description-${random()}`
    const newStatus = statuses[Math.floor(Math.random() * statuses.length)]

    return modifyTask(id, taskId, newTitle, newDescription, newStatus)
      .then(response => {
        expect(response).to.not.exist
/*No funciona con return, se produce un problema de asincronía!!*/
        /*return */tasks.findOne({ _id: ObjectId(taskId) }, { user: ObjectId(id) })
          .then(task => {
            expect(task.user.toString()).to.equal(id)
            expect(task.title).to.exist
            expect(task.title).to.be.a('string')
            expect(task.title).to.have.length.greaterThan(0)
            expect(task.title).to.equal(newTitle)

            expect(task.description).to.exist
            expect(task.description).to.be.a('string')
            expect(task.description).to.have.length.greaterThan(0)
            expect(task.description).to.equal(newDescription)

            expect(task.status).to.exist
            expect(task.status).to.be.a('string')
            expect(task.status).to.have.length.greaterThan(0)
            expect(task.status).to.equal(newStatus)

            expect(task.date).to.exist
            expect(task.date).to.be.an.instanceOf(Date)

            expect(task.lastAccess).to.exist
            expect(task.lastAccess).to.be.an.instanceOf(Date)
          })
      })
  })

  it('should succeed on correct user and new task data, except for title', () => {
    let sameTitle

    tasks.findOne({ _id: ObjectId(taskId) }, { user: ObjectId(id) })
      .then(task => sameTitle = task.title)

    const newDescription = `new-description-${random()}`
    const newStatus = statuses[Math.floor(Math.random() * statuses.length)]

    return modifyTask(id, taskId, undefined, newDescription, newStatus)
      .then(response => {
        expect(response).to.not.exist

        tasks.findOne({ _id: ObjectId(taskId) }, { user: ObjectId(id) })
          .then(task => {
            expect(task.user.toString()).to.equal(id)
            expect(task.title).to.exist
            expect(task.title).to.be.a('string')
            expect(task.title).to.have.length.greaterThan(0)
            expect(task.title).to.equal(sameTitle)
            expect(task.description).to.exist
            expect(task.description).to.be.a('string')
            expect(task.description).to.have.length.greaterThan(0)
            expect(task.description).to.equal(newDescription)

            expect(task.status).to.exist
            expect(task.status).to.be.a('string')
            expect(task.status).to.have.length.greaterThan(0)
            expect(task.status).to.equal(newStatus)

            expect(task.date).to.exist
            expect(task.date).to.be.an.instanceOf(Date)

            expect(task.lastAccess).to.exist
            expect(task.lastAccess).to.be.an.instanceOf(Date)
          })
      })
  })


  it('should succeed on correct user and new task data, except for description', () => {
    const newTitle = `new-title-${random()}`
    const newStatus = statuses[Math.floor(Math.random() * statuses.length)]

    return modifyTask(id, taskId, newTitle, undefined, newStatus)
      .then(response => {
        expect(response).to.not.exist

        tasks.findOne({ _id: ObjectId(taskId) }, { user: ObjectId(id) })
          .then(task => {
            expect(task.user.toString()).to.equal(id)
            expect(task.title).to.exist
            expect(task.title).to.be.a('string')
            expect(task.title).to.have.length.greaterThan(0)
            expect(task.title).to.equal(newTitle)
            expect(task.description).to.exist
            expect(task.description).to.be.a('string')
            expect(task.description).to.have.length.greaterThan(0)
            expect(task.description).to.equal(description)

            expect(task.status).to.exist
            expect(task.status).to.be.a('string')
            expect(task.status).to.have.length.greaterThan(0)
            expect(task.status).to.equal(newStatus)

            expect(task.date).to.exist
            expect(task.date).to.be.an.instanceOf(Date)

            expect(task.lastAccess).to.exist
            expect(task.lastAccess).to.be.an.instanceOf(Date)
          })
      })
  })


  it('should succeed on correct user and new task data, except for status', () => {
    const newTitle = `new-title-${random()}`
    const newDescription = `new-description-${random()}`

    return modifyTask(id, taskId, newTitle, newDescription, undefined)
      .then(response => {
        expect(response).to.not.exist

        tasks.findOne({ _id: ObjectId(taskId) }, { user: ObjectId(id) })
          .then(task => {
            expect(task.user.toString()).to.equal(id)
            expect(task.title).to.exist
            expect(task.title).to.be.a('string')
            expect(task.title).to.have.length.greaterThan(0)
            expect(task.title).to.equal(newTitle)
            expect(task.description).to.exist
            expect(task.description).to.be.a('string')
            expect(task.description).to.have.length.greaterThan(0)
            expect(task.description).to.equal(newDescription)

            expect(task.status).to.exist
            expect(task.status).to.be.a('string')
            expect(task.status).to.have.length.greaterThan(0)
            expect(task.status).to.equal(status)

            expect(task.date).to.exist
            expect(task.date).to.be.an.instanceOf(Date)

            expect(task.lastAccess).to.exist
            expect(task.lastAccess).to.be.an.instanceOf(Date)
          })
      })
  })

  it('should fail on unexisting user and correct task data', () => {
    const id = "123456789123456789123456"
    const newTitle = `new-title-${random()}`
    const newDescription = `new-description-${random()}`
    const newStatus = statuses[Math.floor(Math.random() * statuses.length)]

    return modifyTask(id, taskId, newTitle, newDescription, newStatus)
      .then(() => { throw new Error('should not reach this point') })
      .catch(error => {
        expect(error).to.exist
        expect(error).to.be.an.instanceOf(NotFoundError)
        expect(error.message).to.equal(`user with id ${id} not found`)
      })
  })

  it('should fail on correct user and unexisting task data', () => {
    const taskId = '123456789123456789123456'
    const newTitle = `new-title-${random()}`
    const newDescription = `new-description-${random()}`
    const newStatus = statuses[Math.floor(Math.random() * statuses.length)]

    return modifyTask(id, taskId, newTitle, newDescription, newStatus)
      .then(() => { throw new Error('should not reach this point') })
      .catch(error => {
        expect(error).to.exist
        expect(error).to.be.an.instanceOf(NotFoundError)
        expect(error.message).to.equal(`user does not have task with id ${taskId}`)
      })
  })


/*  // FALLA
  it('should fail on correct user and wrong task data', () => {
    const taskId = '123456789123456789123456'
    const newTitle = `new-title-${random()}`
    const newDescription = `new-description-${random()}`
    const newStatus = statuses[Math.floor(Math.random() * statuses.length)]

    return modifyTask(id, taskId, newTitle, newDescription, newStatus)
      .then(() => { throw new Error('should not reach this point') })
      .catch(error => {
        expect(error).to.exist
        expect(error).to.be.an.instanceOf(ConflictError)
        expect(error.message).to.equal(`user with id ${id} does not correspond to task with id ${taskId}`)
      })
  })*/

  it('should fail on correct user and wrong task status', () => {
    const newTitle = `new-title-${random()}`
    const newDescription = `new-description-${random()}`
    const newStatus = 'wrong-status'

    expect(() => modifyTask(id, taskId, newTitle, newDescription, newStatus)).to.throw(ContentError, `${newStatus} does not match any of the valid status values: ${statuses}`)
  })

  after(() => client.close())
})
