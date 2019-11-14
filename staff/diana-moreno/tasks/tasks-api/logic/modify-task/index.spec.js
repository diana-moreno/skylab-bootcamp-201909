const { expect } = require('chai')
const users = require('../../data/users')('test')
const tasks = require('../../data/tasks')('test')
const modifyTask = require('.')
const { random } = Math
const uuid = require('uuid')

describe('logic - modify task', () => {
  before(() => Promise.all([users.load(), tasks.load()]))

  let id, name, surname, email, username, password, title, description

  beforeEach(() => {
    id = uuid()
    name = `name-${random()}`
    surname = `surname-${random()}`
    email = `email-${random()}@mail.com`
    username = `username-${random()}`
    password = `password-${random()}`

    users.data.push({ id, name, surname, email, username, password })

    tasks.data.push({
      id: uuid(),
      user: id,
      title: `title-${random()}`,
      description: `description-${random()}`,
      status: 'REVIEW',
      date: new Date
    })
    let task = tasks[0]
    let newTitle = task.data.title
    newDescription = `description-${random()}`
  })


  it('should succeed on modify title', () =>
    modifyTask(id, newTitle, newDescription)
    .then(taskId => {
      expect(taskId).to.exist
      expect(taskId).to.be.a('string')
      expect(taskId).to.have.length.greaterThan(0)

      const task = tasks.data.find(({ id }) => id === taskId)

      expect(task).to.exist
      expect(task.user).to.equal(id)
      //expect(task.title).not.equal(newTitle) // cambia title
      expect(task.description).not.equal(newDescription) // cambia description
      expect(task.status).to.equal('REVIEW')
      expect(task.date).to.exist
      expect(task.date).to.be.instanceOf(Date)
    })
  )
  // TODO other test cases
})



  /*    it('should succeed on modify title', () =>
          modifyTask(id, title, description)
              .then(taskId => {
                  expect(taskId).to.exist
                  expect(taskId).to.be.a('string')
                  expect(taskId).to.have.length.greaterThan(0)

                  const task = tasks.data.find(({ id }) => id === taskId)

                  expect(task).to.exist
                  expect(task.user).to.equal(id)
                  expect(task.title)not.equal(title) // cambia title
                  expect(task.description).to.equal(description)
                  expect(task.status).to.equal('TODO')
                  expect(task.date).to.exist
                  expect(task.date).to.be.instanceOf(Date)
              })
      )

      it('should succeed on modify description', () =>
          modifyTask(id, title, description)
              .then(taskId => {
                  expect(taskId).to.exist
                  expect(taskId).to.be.a('string')
                  expect(taskId).to.have.length.greaterThan(0)

                  const task = tasks.data.find(({ id }) => id === taskId)

                  expect(task).to.exist
                  expect(task.user).to.equal(id)
                  expect(task.title)to.equal(title)
                  expect(task.description).not.equal(description) // cambia description
                  expect(task.status).to.equal('TODO')
                  expect(task.date).to.exist
                  expect(task.date).to.be.instanceOf(Date)
              })
      )*/