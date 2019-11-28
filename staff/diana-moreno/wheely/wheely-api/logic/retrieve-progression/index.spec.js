require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const retrieveProgression = require('.')
const { random } = Math
const { database, models: { User, Practice, Student, Instructor, Reservation, Feedback } } = require('wheely-data')
/*const moment = require('moment')
const now = moment().format('MMMM Do YYYY, h:mm:ss a')*/

describe('logic - retrieve progression', () => {
  before(() => database.connect(TEST_DB_URL))

  let studentId, instructorId, name, surname, email, password, role, price, status, date, practId, credits, student, adminId, feedback, puntuation

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
    status = 'done'
    date = new Date("Wed, 27 July 2016 13:30:00")
    feedback = 'The student has no respected the traffic light, he did it really bad.'
    valoration = 'bad'
    await Practice.create({ date, instructorId, studentId, status, feedback, valoration })

    feedback = 'He did a little better than the last day but is hard for him to respect the traffic ligth'
    valoration = 'regular'
    date = new Date("Wed, 28 July 2016 13:30:00")
    await Practice.create({ date, instructorId, studentId, status, feedback, valoration })

    date = new Date("Wed, 29 July 2016 13:30:00")
    status = 'pending'
    await Practice.create({ date, instructorId, studentId, status, feedback, valoration })
  })

  it('should succeed on retrieve the student practices', async () => {
    practices = await retrieveProgression(studentId)

    expect(practices).to.exist
    expect(practices[0].status).to.equal('done')
    expect(practices[1].status).to.equal('done')
  })

  it('should fail on instructor user', async () => {
    try {
      await retrieveProgression(instructorId)

      throw Error('should not reach this point')

    } catch (error) {
      expect(error).to.exist
      expect(error.message).to.exist
      expect(typeof error.message).to.equal('string')
      expect(error.message.length).to.be.greaterThan(0)
      expect(error.message).to.equal(`user with id ${instructorId} has no progression`)
    }
  })

  it('should fail on admin user', async () => {
    try {
      await retrieveProgression(adminId)

      throw Error('should not reach this point')

    } catch (error) {
      expect(error).to.exist
      expect(error.message).to.exist
      expect(typeof error.message).to.equal('string')
      expect(error.message.length).to.be.greaterThan(0)
      expect(error.message).to.equal(`user with id ${adminId} has no progression`)
    }
  })

  it('should fail on unexisting user', async () => {
    let fakeId = '012345678901234567890123'
    try {
      await retrieveProgression(fakeId)

      throw Error('should not reach this point')

    } catch (error) {
      expect(error).to.exist
      expect(error.message).to.exist
      expect(typeof error.message).to.equal('string')
      expect(error.message.length).to.be.greaterThan(0)
      expect(error.message).to.equal(`user with id ${fakeId} not found`)
    }
  })

  after(() => Promise.all([User.deleteMany(), Practice.deleteMany()]).then(database.disconnect))
})
