require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const retrieveCancelledPractices = require('.')
const bookPractice = require('../book-practice')
const { random } = Math
const { database, models: { User, Practice, Student, Instructor, Reservation, Feedback } } = require('wheely-data')
/*const moment = require('moment')
const now = moment().format('MMMM Do YYYY, h:mm:ss a')*/

describe('logic - retrieve cancelled practices', () => {
  before(() => database.connect(TEST_DB_URL))

  let studentId, instructorId, name, surname, email, password, role, price, status, date, practId, credits, student, adminId

  beforeEach(async () => {
    // create an student
    name = `j-${random()}`
    surname = `surname-${random()}`
    email = `email-${random()}@mail.com`
    password = `password-${random()}`
    role = 'student'

    await Promise.all([User.deleteMany(), Practice.deleteMany()])

    let student = await User.create({ name, surname, email, password, role })
    student.profile = new Student()
    student.profile.credits = 3
    credits = 3

    await student.save()
    studentId = student.id

    // create an instructor
    name = `name-${random()}`
    surname = `surname-${random()}`
    email = `email-${random()}@mail.com`
    password = `password-${random()}`
    role = 'instructor'

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

    // practice's features
    price = 1
    status = 'cancelled'
    date = new Date("Wed, 27 July 2016 13:30:00")
    await Practice.create({ date, instructorId, studentId, status })

    date = new Date("Wed, 28 July 2016 13:30:00")
    await Practice.create({ date, instructorId, studentId, status })
  })

  it('should succeed on retrieve the student practices', async () => {
    practices = await retrieveCancelledPractices(studentId)

    expect(practices).to.exist
    expect(practices[0].status).to.equal('cancelled')
    expect(practices[1].status).to.equal('cancelled')
  })

  it('should succeed on retrieve the instructor practices', async () => {
    practices = await retrieveCancelledPractices(instructorId)

    expect(practices).to.exist
    expect(practices[0].status).to.equal('cancelled')
    expect(practices[1].status).to.equal('cancelled')
  })

  it('should fail on unexisting user', async () => {
    let fakeId = '012345678901234567890123'
    try {
      await retrieveCancelledPractices(fakeId)

      throw Error('should not reach this point')

    } catch (error) {
      expect(error).to.exist
      expect(error.message).to.exist
      expect(typeof error.message).to.equal('string')
      expect(error.message.length).to.be.greaterThan(0)
      expect(error.message).to.equal(`user with id ${fakeId} not found`)
    }
  })

  it('should fail on admin user', async () => {
    try {
      await retrieveCancelledPractices(adminId)

      throw Error('should not reach this point')

    } catch (error) {
      expect(error).to.exist
      expect(error.message).to.exist
      expect(typeof error.message).to.equal('string')
      expect(error.message.length).to.be.greaterThan(0)
      expect(error.message).to.equal(`admin has no practices`)
    }
  })

  after(() => Promise.all([User.deleteMany(), Practice.deleteMany()]).then(database.disconnect))
})