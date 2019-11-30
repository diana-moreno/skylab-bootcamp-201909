require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const { random } = Math
const retrieveUser = require('.')
const { errors: { NotFoundError, ContentError } } = require('wheely-utils')
const { database, models: { User, Student, Instructor } } = require('wheely-data')

describe('logic - retrieve user', () => {
  before(() => database.connect(TEST_DB_URL))

  let roles = ['student', 'admin', 'instructor']
  let id, name, surname, email, password, role

  describe('when user is a student', () => {
    beforeEach(async () => {
      name = `name-${random()}`
      surname = `surname-${random()}`
      email = `email-${random()}@mail.com`
      password = `password-${random()}`
      role = 'student'

      await User.deleteMany()

      const user = await User.create({ name, surname, email, password, role })
      user.profile = new Student()
      await user.save()

      id = user.id
    })

    it('should succeed on correct user id', async () => {
      const user = await retrieveUser(id)

      expect(user).to.exist
      expect(user.id).to.equal(id)
      expect(user._id).to.not.exist
      expect(user.name).to.equal(name)
      expect(user.surname).to.equal(surname)
      expect(user.email).to.equal(email)
      expect(user.password).to.be.undefined
      expect(user.role).to.equal(role)
      expect(user.profile).to.exist
      expect(user.profile.credits).to.equal(0)
    })

    it('should fail on wrong user id', async () => {
      const id = '012345678901234567890123'

      try {
        await retrieveUser(id)

        throw Error('should not reach this point')
      } catch (error) {
        expect(error).to.exist
        expect(error).to.be.an.instanceOf(NotFoundError)
        expect(error.message).to.equal(`user with id ${id} not found`)
      }
    })
  })

  describe('when user is an instructor', () => {
    beforeEach(async () => {
      name = `name-${random()}`
      surname = `surname-${random()}`
      email = `email-${random()}@mail.com`
      password = `password-${random()}`
      role = 'instructor'

      await User.deleteMany()

      const user = await User.create({ name, surname, email, password, role })
      user.profile = new Instructor()
      await user.save()

      id = user.id
    })

    it('should succeed on correct user id', async () => {
      const user = await retrieveUser(id)

      expect(user).to.exist
      expect(user.id).to.equal(id)
      expect(user._id).to.not.exist
      expect(user.name).to.equal(name)
      expect(user.surname).to.equal(surname)
      expect(user.email).to.equal(email)
      expect(user.password).to.be.undefined
      expect(user.role).to.equal(role)
      expect(user.profile).to.exist
      expect(user.profile.credits).to.equal(undefined)
    })

    it('should fail on wrong user id', async () => {
      const id = '012345678901234567890123'

      try {
        await retrieveUser(id)

        throw Error('should not reach this point')
      } catch (error) {
        expect(error).to.exist
        expect(error).to.be.an.instanceOf(NotFoundError)
        expect(error.message).to.equal(`user with id ${id} not found`)
      }
    })
  })

  describe('when user is an admin', () => {
    beforeEach(async () => {
      name = `name-${random()}`
      surname = `surname-${random()}`
      email = `email-${random()}@mail.com`
      password = `password-${random()}`
      role = 'admin'

      await User.deleteMany()

      const user = await User.create({ name, surname, email, password, role })

      id = user.id
    })

    it('should succeed on correct user id', async () => {
      const user = await retrieveUser(id)

      expect(user).to.exist
      expect(user.id).to.equal(id)
      expect(user._id).to.not.exist
      expect(user.name).to.equal(name)
      expect(user.surname).to.equal(surname)
      expect(user.email).to.equal(email)
      expect(user.password).to.be.undefined
      expect(user.role).to.equal(role)
      expect(user.profile).to.equal(undefined)
    })

    it('should fail on wrong user id', async () => {
      const id = '012345678901234567890123'

      try {
        await retrieveUser(id)

        throw Error('should not reach this point')
      } catch (error) {
        expect(error).to.exist
        expect(error).to.be.an.instanceOf(NotFoundError)
        expect(error.message).to.equal(`user with id ${id} not found`)
      }
    })

    it('should fail on incorrect user id', async () => {
      let fakeId = '01234567890123'
      try {
        await retrieveUser(fakeId)
        throw Error('should not reach this point')

      } catch (error) {
        expect(error).to.exist
        expect(error.message).to.exist
        expect(typeof error.message).to.equal('string')
        expect(error.message.length).to.be.greaterThan(0)
        expect(error).to.be.an.instanceOf(ContentError)
        expect(error.message).to.equal(`${fakeId} is not a valid id`)
      }
    })

  })

  after(() => User.deleteMany().then(database.disconnect))
})
