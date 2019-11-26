require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const registerUser = require('.')
const { random, floor } = Math
const { errors: { ContentError } } = require('wheely-utils')
const { database, models: { User } } = require('wheely-data')

describe('logic - register user', () => {
  before(() => database.connect(TEST_DB_URL))

  let roles = ['student', 'admin', 'instructor']
  let name, surname, email, password, role

  beforeEach(() => {
    name = `name-${random()}`
    surname = `surname-${random()}`
    email = `email-${random()}@mail.com`
    password = `password-${random()}`
    role = roles[floor(random() * roles.length)]

    return User.deleteMany()
  })

  it('should succeed on correct credentials for common data between users', async () => {
    const response = await registerUser(name, surname, email, password, role)

    expect(response).to.be.undefined

    const user = await User.findOne({ email })

    expect(user).to.exist
    expect(user.name).to.equal(name)
    expect(user.surname).to.equal(surname)
    expect(user.email).to.equal(email)
    expect(user.password).to.equal(password)
    expect(user.role).to.equal(role)
  })

  describe('when user is a student', () => {
    beforeEach(() => {
      name = `name-${random()}`
      surname = `surname-${random()}`
      email = `email-${random()}@mail.com`
      password = `password-${random()}`
      role = 'student'

      return User.deleteMany()
    })

    it('should succeed on correct credentials ', async () => {
      const response = await registerUser(name, surname, email, password, role)

      expect(response).to.be.undefined

      const user = await User.findOne({ email })

      expect(user).to.exist
      expect(user.name).to.equal(name)
      expect(user.surname).to.equal(surname)
      expect(user.email).to.equal(email)
      expect(user.password).to.equal(password)
      expect(user.role).to.equal(role)
      expect(user.profile).to.exist
      expect(user.profile.credits).to.exist
      expect(user.profile.practices).to.exist
      expect(user.profile.schedule).to.equal(undefined)
      expect(user.profile.statistics).to.equal(undefined)
      expect(user.profile.students).to.equal(undefined)
    })
  })

  describe('when user is an instructor', () => {
    beforeEach(() => {
      name = `name-${random()}`
      surname = `surname-${random()}`
      email = `email-${random()}@mail.com`
      password = `password-${random()}`
      role = 'instructor'

      return User.deleteMany()
    })

    it('should succeed on correct credentials ', async () => {
      const response = await registerUser(name, surname, email, password, role)

      expect(response).to.be.undefined

      const user = await User.findOne({ email })

      expect(user).to.exist
      expect(user.name).to.equal(name)
      expect(user.surname).to.equal(surname)
      expect(user.email).to.equal(email)
      expect(user.password).to.equal(password)
      expect(user.role).to.equal(role)
      expect(user.profile).to.exist
      expect(user.profile.schedule).to.exist
      expect(user.profile.statistics).to.exist
      expect(user.profile.practices).to.exist
      expect(user.profile.students).to.exist
      expect(user.profile.credits).to.equal(undefined)
    })
  })

  describe('when user is an admin', () => {
    beforeEach(() => {
      name = `name-${random()}`
      surname = `surname-${random()}`
      email = `email-${random()}@mail.com`
      password = `password-${random()}`
      role = 'admin'

      return User.deleteMany()
    })

    it('should succeed on correct credentials ', async () => {
      const response = await registerUser(name, surname, email, password, role)

      expect(response).to.be.undefined

      const user = await User.findOne({ email })

      expect(user).to.exist
      expect(user.name).to.equal(name)
      expect(user.surname).to.equal(surname)
      expect(user.email).to.equal(email)
      expect(user.password).to.equal(password)
      expect(user.role).to.equal(role)
      expect(user.profile).to.exist
      expect(user.profile.schedule).to.equal(undefined)
      expect(user.profile.statistics).to.equal(undefined)
      expect(user.profile.practices).to.equal(undefined)
      expect(user.profile.students).to.equal(undefined)
      expect(user.profile.credits).to.equal(undefined)
      expect(user.profile.practices).to.equal(undefined)
    })
  })

  describe('when user already exists', () => {
    beforeEach(() => User.create({ name, surname, email, password, role }))

    it('should fail on already existing user', async () => {
      try {
        await registerUser(name, surname, email, password, role)

        throw Error('should not reach this point')
      } catch (error) {
        expect(error).to.exist

        expect(error.message).to.exist
        expect(typeof error.message).to.equal('string')
        expect(error.message.length).to.be.greaterThan(0)
        expect(error.message).to.equal(`user with email ${email} already exists`)
      }
    })
  })

  it('should fail on incorrect name, surname, email, password, or expression type and content', () => {
    expect(() => registerUser(1)).to.throw(TypeError, '1 is not a string')
    expect(() => registerUser(true)).to.throw(TypeError, 'true is not a string')
    expect(() => registerUser([])).to.throw(TypeError, ' is not a string')
    expect(() => registerUser({})).to.throw(TypeError, '[object Object] is not a string')
    expect(() => registerUser(undefined)).to.throw(TypeError, 'undefined is not a string')
    expect(() => registerUser(null)).to.throw(TypeError, 'null is not a string')

    expect(() => registerUser('')).to.throw(ContentError, 'name is empty or blank')
    expect(() => registerUser(' \t\r')).to.throw(ContentError, 'name is empty or blank')

    expect(() => registerUser(name, 1)).to.throw(TypeError, '1 is not a string')
    expect(() => registerUser(name, true)).to.throw(TypeError, 'true is not a string')
    expect(() => registerUser(name, [])).to.throw(TypeError, ' is not a string')
    expect(() => registerUser(name, {})).to.throw(TypeError, '[object Object] is not a string')
    expect(() => registerUser(name, undefined)).to.throw(TypeError, 'undefined is not a string')
    expect(() => registerUser(name, null)).to.throw(TypeError, 'null is not a string')

    expect(() => registerUser(name, '')).to.throw(ContentError, 'surname is empty or blank')
    expect(() => registerUser(name, ' \t\r')).to.throw(ContentError, 'surname is empty or blank')

    expect(() => registerUser(name, surname, 1)).to.throw(TypeError, '1 is not a string')
    expect(() => registerUser(name, surname, true)).to.throw(TypeError, 'true is not a string')
    expect(() => registerUser(name, surname, [])).to.throw(TypeError, ' is not a string')
    expect(() => registerUser(name, surname, {})).to.throw(TypeError, '[object Object] is not a string')
    expect(() => registerUser(name, surname, undefined)).to.throw(TypeError, 'undefined is not a string')
    expect(() => registerUser(name, surname, null)).to.throw(TypeError, 'null is not a string')

    expect(() => registerUser(name, surname, '')).to.throw(ContentError, 'e-mail is empty or blank')
    expect(() => registerUser(name, surname, ' \t\r')).to.throw(ContentError, 'e-mail is empty or blank')

    expect(() => registerUser(name, surname, email, '')).to.throw(ContentError, 'password is empty or blank')
    expect(() => registerUser(name, surname, email, ' \t\r')).to.throw(ContentError, 'password is empty or blank')
  })

  after(() => User.deleteMany().then(database.disconnect))
})
