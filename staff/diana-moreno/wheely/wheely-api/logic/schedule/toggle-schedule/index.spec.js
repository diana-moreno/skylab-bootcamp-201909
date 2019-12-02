require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const toggleSchedule = require('.')
const { random } = Math
const { database, models: { User, Practice, Student, Instructor } } = require('wheely-data')
const { validate, errors: { ContentError } } = require('wheely-utils')

describe('logic - toogle schedule instructor', () => {
  before(() => database.connect(TEST_DB_URL))

  let studentId, instructorId, name, surname, email, password, role, price, status, date, practId, credits, student, adminId, feedback, puntuation, indexDay = 0

  beforeEach(async () => {
    // create an instructor
    name = `name-${random()}`
    surname = `surname-${random()}`
    email = `email-${random()}@mail.com`
    password = `password-${random()}`
    role = 'instructor'

    await User.deleteMany()
    let instructor = await User.create({ name, surname, email, password, role })
    instructor.profile = new Instructor()
    await instructor.save()
    instructorId = instructor.id

    // create an admin
    name = `name-${random()}`
    surname = `surname-${random()}`
    email = `email-${random()}@mail.com`
    password = `password-${random()}`
    role = 'admin'

    let admin = await User.create({ name, surname, email, password, role })
    adminId = admin.id
  })

  it('should succeed on saving dates to instructor', async () => {
    const day1 = { index: 3, hours: [11] }
    let indexDay1 = 1
    let indexDay2 = 1
    let indexDay3 = 2
    let indexDay4 = 2
    const hour1 = '12:00'
    const hour2 = '11:00'
    const hour3 = '09:00'
    const hour4 = '09:00'

    instructor = await toggleSchedule(adminId, instructorId, indexDay1, hour1)
    instructor = await toggleSchedule(adminId, instructorId, indexDay2, hour2)
    instructor = await toggleSchedule(adminId, instructorId, indexDay3, hour3)
    instructor = await toggleSchedule(adminId, instructorId, indexDay4, hour4)

    expect(instructor).to.exist
    expect(instructor.profile).to.exist
    expect(instructor.profile.schedule).to.exist
  })

  it('should fail on unexisting instructor', async () => {
    const hour4 = '09:00'
    let indexDay4 = 2
    let fakeId = '012345678901234567890123'
    try {
      instructor = await toggleSchedule(adminId, fakeId, indexDay4, hour4)

      throw Error('should not reach this point')

    } catch (error) {
      expect(error).to.exist
      expect(error.message).to.exist
      expect(typeof error.message).to.equal('string')
      expect(error.message.length).to.be.greaterThan(0)
      expect(error.message).to.equal(`user with id ${fakeId} not found`)
    }
  })

  it('should fail on unexisting admin', async () => {
    const hour4 = '09:00'
    let indexDay4 = 2
    let fakeId = '012345678901234567890123'
    try {
      instructor = await toggleSchedule(fakeId, instructorId, indexDay4, hour4)

      throw Error('should not reach this point')

    } catch (error) {
      expect(error).to.exist
      expect(error.message).to.exist
      expect(typeof error.message).to.equal('string')
      expect(error.message.length).to.be.greaterThan(0)
      expect(error.message).to.equal(`user with id ${fakeId} does not have permission`)
    }
  })

    it('should fail on incorrect adminId, instructorId, indexDay or hour valoration type or content', () => {
      expect(() => toggleSchedule('1')).to.throw(ContentError, '1 is not a valid id')
      expect(() => toggleSchedule(1)).to.throw(TypeError, '1 is not a string')
      expect(() => toggleSchedule(true)).to.throw(TypeError, 'true is not a string')
      expect(() => toggleSchedule([])).to.throw(TypeError, ' is not a string')
      expect(() => toggleSchedule({})).to.throw(TypeError, '[object Object] is not a string')
      expect(() => toggleSchedule(undefined)).to.throw(TypeError, 'undefined is not a string')
      expect(() => toggleSchedule(null)).to.throw(TypeError, 'null is not a string')
      expect(() => toggleSchedule('')).to.throw(ContentError, 'adminId is empty or blank')

      expect(() => toggleSchedule(adminId, '1')).to.throw(ContentError, '1 is not a valid id')
      expect(() => toggleSchedule(adminId, 1)).to.throw(TypeError, '1 is not a string')
      expect(() => toggleSchedule(adminId, true)).to.throw(TypeError, 'true is not a string')
      expect(() => toggleSchedule(adminId, [])).to.throw(TypeError, ' is not a string')
      expect(() => toggleSchedule(adminId, {})).to.throw(TypeError, '[object Object] is not a string')
      expect(() => toggleSchedule(adminId, undefined)).to.throw(TypeError, 'undefined is not a string')
      expect(() => toggleSchedule(adminId, null)).to.throw(TypeError, 'null is not a string')
      expect(() => toggleSchedule(adminId, '')).to.throw(ContentError, 'instructorId is empty or blank')
      expect(() => toggleSchedule(adminId, ' \t\r')).to.throw(ContentError, 'instructorId is empty or blank')

      expect(() => toggleSchedule(adminId, instructorId, '1')).to.throw(TypeError, '1 is not a number')
      expect(() => toggleSchedule(adminId, instructorId, true)).to.throw(TypeError, 'true is not a number')
      expect(() => toggleSchedule(adminId, instructorId, [])).to.throw(TypeError, ' is not a number')
      expect(() => toggleSchedule(adminId, instructorId, {})).to.throw(TypeError, '[object Object] is not a number')
      expect(() => toggleSchedule(adminId, instructorId, undefined)).to.throw(TypeError, 'undefined is not a number')
      expect(() => toggleSchedule(adminId, instructorId, null)).to.throw(TypeError, 'null is not a number')

      expect(() => toggleSchedule(adminId, instructorId, indexDay, 1)).to.throw(TypeError, '1 is not a string')
      expect(() => toggleSchedule(adminId, instructorId, indexDay, true)).to.throw(TypeError, 'true is not a string')
      expect(() => toggleSchedule(adminId, instructorId, indexDay, [])).to.throw(TypeError, ' is not a string')
      expect(() => toggleSchedule(adminId, instructorId, indexDay, {})).to.throw(TypeError, '[object Object] is not a string')
      expect(() => toggleSchedule(adminId, instructorId, indexDay, undefined)).to.throw(TypeError, 'undefined is not a string')
      expect(() => toggleSchedule(adminId, instructorId, indexDay, null)).to.throw(TypeError, 'null is not a string')

    })

  after(() => Promise.all([User.deleteMany(), Practice.deleteMany()]).then(database.disconnect))
})
