require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const listUsers = require('.')
const { random, floor } = Math
const { errors: { ContentError } } = require('wheely-utils')
const { database, models: { User } } = require('wheely-data')

describe('logic - list users', () => {
  before(() => database.connect(TEST_DB_URL))

  let roles = ['admin', 'instructor', 'student']
  let name, surname, email, password, role, names, surnames, emails, passwords, ids

  beforeEach(async () => {
    await Promise.all([User.deleteMany()])

    ids = []
    names = []
    surnames = []
    emails = []
    passwords = []
    const insertions = []

    for (let i = 0; i < 10; i++) {
      const user = {
        name: `name-${random()}`,
        surname: `surname-${random()}`,
        email: `email-${random()}@mail.com`,
        password: `password-${random()}`,
        role: roles[floor(random() * 2)]
      }
      let currentUser = await User.create(user)
      insertions.push(currentUser)
      names.push(currentUser.name)
      surnames.push(currentUser.surname)
      emails.push(currentUser.email)
      passwords.push(currentUser.password)
      ids.push(currentUser._id.toString())

    }
    await Promise.all(insertions)

  })

  it('should succeed on correct user', async () => {
    // we need the id of the user who want to list
    let id = ids[0]
    const users = await listUsers(id)

    expect(users).to.exist
    expect(users).to.have.lengthOf(10)

    users.forEach(user => {
      expect(user._id).to.exist

      expect(user.name).to.exist
      expect(user.name).to.be.a('string')
      expect(user.name).to.have.length.greaterThan(0)
      expect(user.name).be.oneOf(names)

      expect(user.surname).to.exist
      expect(user.surname).to.be.a('string')
      expect(user.surname).to.have.length.greaterThan(0)
      expect(user.surname).be.oneOf(surnames)

      expect(user.password).to.exist
      expect(user.password).to.be.a('string')
      expect(user.password).to.have.length.greaterThan(0)
      expect(user.password).be.oneOf(passwords)

      expect(user.email).to.exist
      expect(user.email).to.be.a('string')
      expect(user.email).to.have.length.greaterThan(0)
      expect(user.email).be.oneOf(emails)

    })
  })

  it('should fail on unexisting user', async () => {
    let fakeId = '012345678901234567890123'
    try {
      await listUsers(fakeId)

      throw Error('should not reach this point')

    } catch (error) {
      expect(error).to.exist
      expect(error.message).to.exist
      expect(typeof error.message).to.equal('string')
      expect(error.message.length).to.be.greaterThan(0)
      expect(error.message).to.equal(`user with id ${fakeId} not found`)
    }
  })

  describe('on user is a student', () => {
    let studentId

    beforeEach(async () => {
      await Promise.all([User.deleteMany()])

      const user = {
        name: `name-${random()}`,
        surname: `surname-${random()}`,
        email: `email-${random()}@mail.com`,
        password: `password-${random()}`,
        role: 'student'
      }
      const student = await User.create(user)
      studentId = student._id.toString()

    })

    it('should fail on student user', async () => {
      try {
        await listUsers(studentId)

        throw Error('should not reach this point')

      } catch (error) {
        expect(error).to.exist
        expect(error.message).to.exist
        expect(typeof error.message).to.equal('string')
        expect(error.message.length).to.be.greaterThan(0)
        expect(error.message).to.equal(`user with id ${studentId} has no permision`)
      }
    })
  })

  it('should fail on incorrect id type or content', () => {
    expect(() => listUsers(1)).to.throw(TypeError, '1 is not a string')
    expect(() => listUsers(true)).to.throw(TypeError, 'true is not a string')
    expect(() => listUsers([])).to.throw(TypeError, ' is not a string')
    expect(() => listUsers({})).to.throw(TypeError, '[object Object] is not a string')
    expect(() => listUsers(undefined)).to.throw(TypeError, 'undefined is not a string')
    expect(() => listUsers(null)).to.throw(TypeError, 'null is not a string')

    expect(() => listUsers('')).to.throw(ContentError, 'id is empty or blank')
    expect(() => listUsers(' \t\r')).to.throw(ContentError, 'id is empty or blank')
  })

  after(() => Promise.all([User.deleteMany()]).then(database.disconnect))
})
