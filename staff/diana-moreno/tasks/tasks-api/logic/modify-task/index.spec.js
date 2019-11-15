const { expect } = require('chai')
const users = require('../../data/users')('test')
const tasks = require('../../data/tasks')('test')
const modifyTask = require('.')
const { random } = Math
const uuid = require('uuid')

describe('logic - modify task', () => {
  before(() => Promise.all([users.load(), tasks.load()]))

  let id, name, surname, email, username, password, title, description, status, date, user, taskId

  beforeEach(() => {
    id = uuid()
    name = `name-${random()}`
    surname = `surname-${random()}`
    email = `email-${random()}@mail.com`
    username = `username-${random()}`
    password = `password-${random()}`

    users.data.push({ id, name, surname, email, username, password })

    taskId = uuid()
    description = `description-${random()}`
    title = `title-${random()}`

    tasks.data.push({
      id: taskId,
      user: id,
      title,
      description,
      status: 'REVIEW',
      date: new Date
    })
  })

// it.only
  it('should succeed on modify title', () => {
    title = `title-${random()}`

    return modifyTask(taskId, title, description)
    .then(result => {
      expect(result).to.exist
      expect(result).to.be.a('string')
      expect(result).to.have.length.greaterThan(0)

      const task = tasks.data.find(({ id }) => id === taskId)

      expect(task).to.exist
      expect(task.user).to.equal(id)
      expect(task.title).to.equal(title) // cambia title
      expect(task.status).to.equal('REVIEW')
      expect(task.date).to.exist
      expect(task.date).to.be.instanceOf(Date)
    })
  })

  it('should succeed on modify description', () => {
    description = `description-${random()}`

    return modifyTask(taskId, title, description)
    .then(result => {
      expect(result).to.exist
      expect(result).to.be.a('string')
      expect(result).to.have.length.greaterThan(0)

      const task = tasks.data.find(({ id }) => id === taskId)

      expect(task).to.exist
      expect(task.user).to.equal(id)
      expect(task.description).to.equal(description) // cambia description
      expect(task.status).to.equal('REVIEW')
      expect(task.date).to.exist
      expect(task.date).to.be.instanceOf(Date)
    })
  })

  it('should succeed on modify title and description', () => {
    title = `title-${random()}`
    description = `description-${random()}`

    return modifyTask(taskId, title, description)
    .then(result => {
      expect(result).to.exist
      expect(result).to.be.a('string')
      expect(result).to.have.length.greaterThan(0)

      const task = tasks.data.find(({ id }) => id === taskId)

      expect(task).to.exist
      expect(task.user).to.equal(id)
      expect(task.title).to.equal(title) // cambia title
      expect(task.description).to.equal(description) // cambia description
      expect(task.status).to.equal('REVIEW')
      expect(task.date).to.exist
      expect(task.date).to.be.instanceOf(Date)
    })
  })
})
