require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const retrievePractices = require('.')
const { random } = Math
const { database, models: { User, Practice, Student, Instructor, Reservation, Feedback } } = require('wheely-data')
/*const moment = require('moment')
const now = moment().format('MMMM Do YYYY, h:mm:ss a')*/

describe('logic - retrieve practices', () => {
  before(() => database.connect(TEST_DB_URL))

  let studentId, instructorId, name, surname, email, password, role, price, date, status, practId, credits, student, adminId, valoration, feedback

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

    // create 2 practices
    price = 1
    status = 'pending'
    date = new Date("Wed, 27 July 2016 13:30:00")
    await Practice.create({ date, instructorId, studentId, status })

    status = 'done'
    valoration = 'bad'
    feedback = 'no respecting the traffic lights'
    date = new Date("Wed, 28 July 2016 13:30:00")
    await Practice.create({ date, instructorId, studentId, status, feedback, valoration })
  })

  it('should succeed on retrieve the student practices', async () => {
    const date1 = new Date("Wed, 27 July 2016 13:30:00")
    const date2 = new Date("Wed, 28 July 2016 13:30:00")

    practices = await retrievePractices(studentId)
    expect(practices).to.exist
    expect(practices[0].status).to.equal('pending')
    expect(practices[0].date).to.exist
    expect(practices[0].date).to.be.instanceOf(Date)
    expect(practices[0].date.getTime()).to.equal(date1.getTime())
    expect(practices[0].status).to.equal('pending')
    expect(practices[0].date).to.exist
    expect(practices[0].price).to.equal(price)
    expect(practices[0].instructorId.toString()).to.exist
    expect(practices[0].studentId.toString()).to.exist
    expect(practices[0].feedback).to.equal(undefined)
    expect(practices[1].status).to.equal('done')
    expect(practices[1].date).to.exist
    expect(practices[1].date).to.be.instanceOf(Date)
    expect(practices[1].date.getTime()).to.equal(date2.getTime())
    expect(practices[1].status).to.equal('done')
    expect(practices[1].date).to.exist
    expect(practices[1].price).to.equal(price)
    expect(practices[1].instructorId.toString()).to.exist
    expect(practices[1].studentId.toString()).to.exist
    expect(practices[1].feedback).to.equal(feedback)
    expect(practices[1].valoration).to.equal(valoration)
  })

  it('should succeed on retrieve the student practices', async () => {
    const date1 = new Date("Wed, 27 July 2016 13:30:00")
    const date2 = new Date("Wed, 28 July 2016 13:30:00")

    practices = await retrievePractices(instructorId)
    expect(practices).to.exist
    expect(practices[0].status).to.equal('pending')
    expect(practices[0].date).to.exist
    expect(practices[0].date).to.be.instanceOf(Date)
    expect(practices[0].date.getTime()).to.equal(date1.getTime())
    expect(practices[0].status).to.equal('pending')
    expect(practices[0].date).to.exist
    expect(practices[0].price).to.equal(price)
    expect(practices[0].instructorId.toString()).to.exist
    expect(practices[0].studentId.toString()).to.exist
    expect(practices[0].feedback).to.equal(undefined)
    expect(practices[1].status).to.equal('done')
    expect(practices[1].date).to.exist
    expect(practices[1].date).to.be.instanceOf(Date)
    expect(practices[1].date.getTime()).to.equal(date2.getTime())
    expect(practices[1].status).to.equal('done')
    expect(practices[1].date).to.exist
    expect(practices[1].price).to.equal(price)
    expect(practices[1].instructorId.toString()).to.exist
    expect(practices[1].studentId.toString()).to.exist
    expect(practices[1].feedback).to.equal(feedback)
    expect(practices[1].valoration).to.equal(valoration)
  })

  it('should fail on unexisting user', async () => {
    let fakeId = '012345678901234567890123'
    try {
      await retrievePractices(fakeId)

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
      await retrievePractices(adminId)

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
