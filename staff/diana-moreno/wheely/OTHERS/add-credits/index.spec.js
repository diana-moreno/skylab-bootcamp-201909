require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const { random } = Math
const addCredits = require('.')
const { errors: { NotFoundError, ContentError } } = require('wheely-utils')
const { database, models: { User, Student } } = require('wheely-data')

describe('logic - add credits', () => {
  before(() => database.connect(TEST_DB_URL))

  let studentId, adminId, student, name, surname, email, password, role, fakeId = '012345678901234567890123', credits = 5

  beforeEach(async () => {
    name = `name-${random()}`
    surname = `surname-${random()}`
    email = `email-${random()}@mail.com`
    password = `password-${random()}`
    role = 'student'

    await User.deleteMany()

    student = await User.create({ name, surname, email, password, role })
    student.profile = new Student()
    await student.save()
    studentId = student.id

    // create an admin
    role = 'admin'
    let admin = await User.create({ name, surname, email, password, role })
    adminId = admin.id
  })

  it('should succeed on correct users id', async () => {
    await addCredits(adminId, studentId, credits)
    student = await User.findOne({ _id: studentId })

    expect(student).to.exist
    expect(student.id).to.equal(studentId)
    expect(student.name).to.equal(name)
    expect(student.surname).to.equal(surname)
    expect(student.email).to.equal(email)
    expect(student.password).to.equal(password)
    expect(student.role).to.equal('student')
    expect(student.profile).to.exist
    expect(student.profile.credits).to.equal(credits)
  })

  it('should fail on wrong admin id and correct student id', async () => {
    try {
      await addCredits(fakeId, studentId, credits)
      throw Error('should not reach this point')

    } catch (error) {
      expect(error).to.exist
      expect(error).to.be.an.instanceOf(NotFoundError)
      expect(error.message).to.equal(`user with id ${fakeId} not found or not a valid user`)
    }
  })

  it('should fail on wrong student id and correct admin id', async () => {
    try {
      await addCredits(adminId, fakeId, credits)
      throw Error('should not reach this point')

    } catch (error) {
      expect(error).to.exist
      expect(error).to.be.an.instanceOf(NotFoundError)
      expect(error.message).to.equal(`user with id ${fakeId} not found or not a valid user`)
    }
  })

  it('should fail on incorrect adminId, studentId and query expression type and content', () => {
    expect(() => addCredits('1')).to.throw(ContentError, '1 is not a valid id')
    expect(() => addCredits(adminId, '1')).to.throw(ContentError, '1 is not a valid id')
    expect(() => addCredits(1)).to.throw(TypeError, '1 is not a string')
    expect(() => addCredits(true)).to.throw(TypeError, 'true is not a string')
    expect(() => addCredits([])).to.throw(TypeError, ' is not a string')
    expect(() => addCredits({})).to.throw(TypeError, '[object Object] is not a string')
    expect(() => addCredits(undefined)).to.throw(TypeError, 'undefined is not a string')
    expect(() => addCredits(null)).to.throw(TypeError, 'null is not a string')

    expect(() => addCredits(adminId, 1)).to.throw(TypeError, '1 is not a string')
    expect(() => addCredits(adminId, true)).to.throw(TypeError, 'true is not a string')
    expect(() => addCredits(adminId, [])).to.throw(TypeError, ' is not a string')
    expect(() => addCredits(adminId, {})).to.throw(TypeError, '[object Object] is not a string')
    expect(() => addCredits(adminId, undefined)).to.throw(TypeError, 'undefined is not a string')
    expect(() => addCredits(adminId, null)).to.throw(TypeError, 'null is not a string')

    expect(() => addCredits(adminId, '')).to.throw(ContentError, 'studentId is empty or blank')
    expect(() => addCredits(adminId, ' \t\r')).to.throw(ContentError, 'studentId is empty or blank')

    expect(() => addCredits(adminId, studentId, 'abc')).to.throw(TypeError, 'abc is not a number')
    expect(() => addCredits(adminId, studentId, true)).to.throw(TypeError, 'true is not a number')
    expect(() => addCredits(adminId, studentId, [])).to.throw(TypeError, ' is not a number')
    expect(() => addCredits(adminId, studentId, {})).to.throw(TypeError, '[object Object] is not a number')
  })

  after(() => User.deleteMany().then(database.disconnect))
})
