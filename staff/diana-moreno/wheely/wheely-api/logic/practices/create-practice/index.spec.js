require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const createPractice = require('.')
const { random } = Math
const { database, models: { User, Practice, Student, Instructor, Feedback } } = require('wheely-data')
const { validate, errors: { NotFoundError, ConflictError, ContentError } } = require('wheely-utils')
const moment = require('moment')


describe('logic - book a practice', () => {
  before(() => database.connect(TEST_DB_URL))

  let studentId, instructorId, name, surname, email, password, role, price, status, date, practId, credits, student

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

    // practice's features
    price = 1
    status = 'pending'
    date = moment().day(8)

  })

  it('should succeed when student has credits', async () => {
    // calculate the newCredits the student should have after doing a reservation
    student = await User.findOne({ _id: studentId, role: 'student' })
    let newCredits = student.profile.credits - 1

    const practiceId = await createPractice(instructorId, studentId, date)
    expect(practiceId).to.exist
    expect(practiceId).to.be.a('string')
    expect(practiceId).to.have.length.greaterThan(0)

    const practice = await Practice.findById(practiceId)

    expect(practice).to.exist
    expect(practice.date).to.exist
    expect(practice.date).to.be.instanceOf(Date)
    expect(practice.date.getTime()).to.equal(new Date(date).getTime())
    expect(practice.status).to.equal(status)
    expect(practice.date).to.exist
    expect(practice.price).to.equal(price)
    expect(practice.instructorId.toString()).to.equal(instructorId)
    expect(practice.studentId.toString()).to.equal(studentId)
    expect(practice.feedback).to.equal(undefined)

    // retrieve the student to check how many credits has after doing a reservation
    student = await User.findOne({ _id: studentId, role: 'student' })
    expect(student.profile.credits).to.equal(newCredits)
  })

  it('should fail on unexisting student', async () => {
    let fakeId = '012345678901234567890123'
    try {
      await createPractice(instructorId, fakeId, date)

      throw Error('should not reach this point')

    } catch (error) {
      expect(error).to.exist
      expect(error.message).to.exist
      expect(typeof error.message).to.equal('string')
      expect(error.message.length).to.be.greaterThan(0)
      expect(error).to.be.an.instanceOf(NotFoundError)
      expect(error.message).to.equal(`user with id ${fakeId} not found`)
    }
  })

  it('should fail on expired date', async () => {
    let expiredDate = moment().day(-1)
    try {
      await createPractice(instructorId, studentId, expiredDate)
      throw Error('should not reach this point')

    } catch (error) {
      expect(error).to.exist
      expect(error.message).to.exist
      expect(typeof error.message).to.equal('string')
      expect(error.message.length).to.be.greaterThan(0)
      expect(error.message).to.equal(`practice with date ${expiredDate} has expired`)
    }
  })

  it('should fail on unexisting instructor', async () => {
    let fakeId = '012345678901234567890123'
    try {
      await createPractice(fakeId, studentId, date)

      throw Error('should not reach this point')

    } catch (error) {
      expect(error).to.exist
      expect(error.message).to.exist
      expect(typeof error.message).to.equal('string')
      expect(error.message.length).to.be.greaterThan(0)
      expect(error.message).to.equal(`user with id ${fakeId} not found`)
    }
  })

  describe('logic - when user has no credits', () => {
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

      // practice's features
      price = 1
      status = 'pending'
      date = new Date()

    })

    it('should fail when user has no credits available', async () => {
      try {
        await createPractice(instructorId, studentId, date)
        throw Error('should not reach this point')

      } catch (error) {
        expect(error).to.exist
        expect(error.message).to.exist
        expect(typeof error.message).to.equal('string')
        expect(error.message.length).to.be.greaterThan(0)
        expect(error.message).to.equal(`user has no credits`)
      }
    })
  })

  describe('when practice already exists', () => {
    beforeEach(async () => {
      // create an student
      name = `name-${random()}`
      surname = `surname-${random()}`
      email = `email-${random()}@mail.com`
      password = `password-${random()}`
      role = 'student'

      await Promise.all([User.deleteMany(), Practice.deleteMany()])

      const student = await User.create({ name, surname, email, password, role })
      student.profile = new Student()
      student.profile.credits = 3
      await student.save()
      studentId = student.id

      // create an instructor
      name = `name-${random()}`
      surname = `surname-${random()}`
      email = `email-${random()}@mail.com`
      password = `password-${random()}`
      role = 'instructor'

      const instructor = await User.create({ name, surname, email, password, role })
      instructor.profile = new Instructor()
      await instructor.save()
      instructorId = instructor.id

      // practice's features
      price = 1
      status = 'pending'
      date = new Date()

    })
    beforeEach(async () => {
      date = new Date("Wed, 27 July 2016 13:30:00")
/*      let reservation = await Reservation.create({ instructorId, studentId })*/
      practice = await Practice.create({ date, instructorId, studentId })

      practiceId = practice.id
    })

    it('should fail on already existing practice', async () => {
      date = new Date("Wed, 27 July 2016 13:30:00")
      // we try to create a new practice with the same data which is imposible
      try {
        let practiceSaved = await Practice.findById(practiceId)
        expect(practiceSaved).to.exist

        await createPractice(instructorId, studentId, date)
        throw Error('should not reach this point')

      } catch (error) {
        expect(error).to.exist
        expect(error.message).to.exist
        expect(typeof error.message).to.equal('string')
        expect(error.message.length).to.be.greaterThan(0)
        expect(error.message).to.equal(`practice with date ${date} already exists`)
      }
    })

  })

  it('should fail on incorrect instructorId, studentId, practiceId type or content', () => {
    expect(() => createPractice(1)).to.throw(TypeError, '1 is not a string')
    expect(() => createPractice(true)).to.throw(TypeError, 'true is not a string')
    expect(() => createPractice([])).to.throw(TypeError, ' is not a string')
    expect(() => createPractice({})).to.throw(TypeError, '[object Object] is not a string')
    expect(() => createPractice(undefined)).to.throw(TypeError, 'undefined is not a string')
    expect(() => createPractice(null)).to.throw(TypeError, 'null is not a string')

    expect(() => createPractice('')).to.throw(ContentError, 'instructorId is empty or blank')

    expect(() => createPractice(instructorId, 1)).to.throw(TypeError, '1 is not a string')
    expect(() => createPractice(instructorId, true)).to.throw(TypeError, 'true is not a string')
    expect(() => createPractice(instructorId, [])).to.throw(TypeError, ' is not a string')
    expect(() => createPractice(instructorId, {})).to.throw(TypeError, '[object Object] is not a string')
    expect(() => createPractice(instructorId, undefined)).to.throw(TypeError, 'undefined is not a string')
    expect(() => createPractice(instructorId, null)).to.throw(TypeError, 'null is not a string')
    expect(() => createPractice(instructorId, '')).to.throw(ContentError, 'studentId is empty or blank')
    expect(() => createPractice(instructorId, ' \t\r')).to.throw(ContentError, 'studentId is empty or blank')

/*    expect(() => createPractice(instructorId, studentId, 1)).to.throw(TypeError, '1 is not a Date')
    expect(() => createPractice(instructorId, studentId, true)).to.throw(TypeError, 'true is not a Date')
    expect(() => createPractice(instructorId, studentId, [])).to.throw(TypeError, ' is not a Date')
    expect(() => createPractice(instructorId, studentId, {})).to.throw(TypeError, '[object Object] is not a Date')
    expect(() => createPractice(instructorId, studentId, undefined)).to.throw(TypeError, 'undefined is not a Date')
    expect(() => createPractice(instructorId, studentId, null)).to.throw(TypeError, 'null is not a Date')*/
  })

  after(() => Promise.all([User.deleteMany(), Practice.deleteMany()]).then(database.disconnect))
})
