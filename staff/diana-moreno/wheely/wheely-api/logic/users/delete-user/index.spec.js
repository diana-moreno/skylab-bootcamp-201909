require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const { random, floor } = Math
const deleteUser = require('.')
const { errors: { NotFoundError, ContentError } } = require('wheely-utils')
const { database, models: { User, Student, Instructor } } = require('wheely-data')

describe('logic - delete user', () => {
  before(() => database.connect(TEST_DB_URL))

  let roles = ['student', 'admin', 'instructor']
  let id, name, surname, email, password, role, user, adminId

  beforeEach(async () => {
    //create random user
    name = `name-${random()}`
    surname = `surname-${random()}`
    email = `email-${random()}@mail.com`
    password = `password-${random()}`
    role = roles[floor(random() * roles.length)]

    await User.deleteMany()

    const user = await User.create({ name, surname, email, password, role })
    if (role === 'student') user.profile = new Student()
    if (role === 'instructor') user.profile = new Instructor()
    await user.save()
    id = user.id

    // create an admin
    role = 'admin'
    let admin = await User.create({ name, surname, email, password, role })
    adminId = admin.id
  })

  it('should succeed on correct user id', async () => {
    await deleteUser(adminId, id)
    user = await User.findOne({ id })
    expect(user).to.equal(null)
  })

  it('should fail on wrong user id', async () => {
    const fakeId = '012345678901234567890123'
    try {
      await deleteUser(adminId, fakeId)
      throw Error('should not reach this point')

    } catch (error) {
      expect(error).to.exist
      expect(error).to.be.an.instanceOf(NotFoundError)
      expect(error.message).to.equal(`user with id ${fakeId} not found`)
    }
  })

  it('should fail on wrong id type', async () => {
    const fakeId = '0123890123'
    try {
      await deleteUser(adminId, fakeId)
      throw Error('should not reach this point')

    } catch (error) {
      expect(error).to.exist
      expect(error).to.be.an.instanceOf(ContentError)
      expect(error.message).to.equal(`${fakeId} is not a valid id`)
    }
  })

  after(() => User.deleteMany().then(database.disconnect))
})
