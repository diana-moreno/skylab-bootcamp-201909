require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const { random } = Math
const editUser = require('.')
const { errors: { NotFoundError, ContentError } } = require('wheely-utils')
const { database, models: { User, Student, Instructor } } = require('wheely-data')

describe('logic - edit user', () => {
  before(() => database.connect(TEST_DB_URL))

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

      id = user.id // por que no es _id??
    })

    it('should succeed on edit name and correct user id', async () => {
      newName = `name-${random()}`
      newSurname = undefined
      newEmail = undefined

      await editUser(id, newName, newSurname, newEmail)
      const user = await User.findById(id)

      expect(user).to.exist
      expect(user.id).to.equal(id)
      expect(user.name).to.equal(newName)
      expect(user.surname).to.equal(surname)
      expect(user.email).to.equal(email)
      expect(user.password).to.equal(password)
      expect(user.role).to.equal(role)
      expect(user.profile).to.exist
      expect(user.profile.credits).to.equal(0)
    })

    it('should succeed on edit surname and correct user id', async () => {
      newName = undefined
      newSurname = `surname-${random()}`
      newEmail = undefined

      await editUser(id, newName, newSurname, newEmail)
      const user = await User.findById(id)

      expect(user).to.exist
      expect(user.id).to.equal(id)
      expect(user.name).to.equal(name)
      expect(user.surname).to.equal(newSurname)
      expect(user.email).to.equal(email)
      expect(user.password).to.equal(password)
      expect(user.role).to.equal(role)
      expect(user.profile).to.exist
      expect(user.profile.credits).to.equal(0)
    })

    it('should succeed on edit email and correct user id', async () => {
      newName = undefined
      newSurname = undefined
      newEmail = `email-${random()}@mail.com`

      await editUser(id, newName, newSurname, newEmail)
      const user = await User.findById(id)

      expect(user).to.exist
      expect(user.id).to.equal(id)
      expect(user.name).to.equal(name)
      expect(user.surname).to.equal(surname)
      expect(user.email).to.equal(newEmail)
      expect(user.password).to.equal(password)
      expect(user.role).to.equal(role)
      expect(user.profile).to.exist
      expect(user.profile.credits).to.equal(0)
    })

    it('should fail on wrong user id', async () => {
      const id = '012345678901234567890123'
      try {
        await editUser(id)
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

    it('should succeed on edit name and correct user id', async () => {
      newName = `name-${random()}`
      newSurname = undefined
      newEmail = undefined

      await editUser(id, newName, newSurname, newEmail)
      const user = await User.findById(id)

      expect(user).to.exist
      expect(user.id).to.equal(id)
      expect(user.name).to.equal(newName)
      expect(user.surname).to.equal(surname)
      expect(user.email).to.equal(email)
      expect(user.password).to.equal(password)
      expect(user.role).to.equal(role)
      expect(user.profile).to.exist
      expect(user.profile.credits).to.equal(undefined)
    })

    it('should succeed on edit surname and correct user id', async () => {
      newName = undefined
      newSurname = `surname-${random()}`
      newEmail = undefined

      await editUser(id, newName, newSurname, newEmail)
      const user = await User.findById(id)

      expect(user).to.exist
      expect(user.id).to.equal(id)
      expect(user.name).to.equal(name)
      expect(user.surname).to.equal(newSurname)
      expect(user.email).to.equal(email)
      expect(user.password).to.equal(password)
      expect(user.role).to.equal(role)
      expect(user.profile).to.exist
      expect(user.profile.credits).to.equal(undefined)
    })

    it('should succeed on edit email and correct user id', async () => {
      newName = undefined
      newSurname = undefined
      newEmail = `email-${random()}@mail.com`

      await editUser(id, newName, newSurname, newEmail)
      const user = await User.findById(id)

      expect(user).to.exist
      expect(user.id).to.equal(id)
      expect(user.name).to.equal(name)
      expect(user.surname).to.equal(surname)
      expect(user.email).to.equal(newEmail)
      expect(user.password).to.equal(password)
      expect(user.role).to.equal(role)
      expect(user.profile).to.exist
      expect(user.profile.credits).to.equal(undefined)
    })

    it('should fail on wrong user id', async () => {
      const id = '012345678901234567890123'
      try {
        await editUser(id)
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

    it('should succeed on edit name and correct user id', async () => {
      newName = `name-${random()}`
      newSurname = undefined
      newEmail = undefined

      await editUser(id, newName, newSurname, newEmail)
      const user = await User.findById(id)

      expect(user).to.exist
      expect(user.id).to.equal(id)
      expect(user.name).to.equal(newName)
      expect(user.surname).to.equal(surname)
      expect(user.email).to.equal(email)
      expect(user.password).to.equal(password)
      expect(user.role).to.equal(role)
    })

    it('should succeed on edit surname and correct user id', async () => {
      newName = undefined
      newSurname = `surname-${random()}`
      newEmail = undefined

      await editUser(id, newName, newSurname, newEmail)
      const user = await User.findById(id)

      expect(user).to.exist
      expect(user.id).to.equal(id)
      expect(user.name).to.equal(name)
      expect(user.surname).to.equal(newSurname)
      expect(user.email).to.equal(email)
      expect(user.password).to.equal(password)
      expect(user.role).to.equal(role)
    })

    it('should succeed on edit email and correct user id', async () => {
      newName = undefined
      newSurname = undefined
      newEmail = `email-${random()}@mail.com`

      await editUser(id, newName, newSurname, newEmail)
      const user = await User.findById(id)

      expect(user).to.exist
      expect(user.id).to.equal(id)
      expect(user.name).to.equal(name)
      expect(user.surname).to.equal(surname)
      expect(user.email).to.equal(newEmail)
      expect(user.password).to.equal(password)
      expect(user.role).to.equal(role)
    })

    it('should fail on wrong user id', async () => {
      const id = '012345678901234567890123'
      try {
        await editUser(id)
        throw Error('should not reach this point')

      } catch (error) {
        expect(error).to.exist
        expect(error).to.be.an.instanceOf(NotFoundError)
        expect(error.message).to.equal(`user with id ${id} not found`)
      }
    })
  })

  it('should fail on incorrect id type or content', () => {
    expect(() => editUser('1')).to.throw(ContentError, '1 is not a valid id')
    expect(() => editUser(1)).to.throw(TypeError, '1 is not a string')
    expect(() => editUser(true)).to.throw(TypeError, 'true is not a string')
    expect(() => editUser([])).to.throw(TypeError, ' is not a string')
    expect(() => editUser({})).to.throw(TypeError, '[object Object] is not a string')
    expect(() => editUser(undefined)).to.throw(TypeError, 'undefined is not a string')
    expect(() => editUser(null)).to.throw(TypeError, 'null is not a string')
    expect(() => editUser('')).to.throw(ContentError, 'id is empty or blank')
    expect(() => editUser(' \t\r')).to.throw(ContentError, 'id is empty or blank')
  })

  after(() => User.deleteMany().then(database.disconnect))
})
