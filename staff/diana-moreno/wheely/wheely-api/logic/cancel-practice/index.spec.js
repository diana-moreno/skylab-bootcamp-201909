require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const cancelPractice = require('.')
const { random } = Math
const { database, models: { User, Practice, Student, Instructor, Feedback } } = require('wheely-data')
const { validate, errors: { NotFoundError, ConflictError, ContentError } } = require('wheely-utils')

describe('logic - cancel practice', () => {
  before(() => database.connect(TEST_DB_URL))

  let studentId, instructorId, name, surname, email, password, role, price, status, date, credits, student, practiceId, feedback, valoration

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

    // create practice
    price = 1
    date = new Date("Wed, 27 July 2016 13:30:00")
    let practice = await Practice.create({ date, instructorId, studentId })
    practiceId = practice.id

    // update instructor to add the new practice and the student
    // update student profile with the new practice and a credit less
    student.profile.credits = student.profile.credits - practice.price
    student.profile.practices.push(practiceId)
    instructor.profile.practices.push(practiceId)
    instructor.profile.students.push(studentId)

    await User.updateOne({ _id: studentId }, { $set: { 'profile.practices': student.profile.practices, 'profile.credits': student.profile.credits } }, { multi: true })
    await User.updateOne({ _id: instructorId }, { $set: { 'profile.practices': instructor.profile.practices, 'profile.students': instructor.profile.students } }, { multi: true })
  })

  it('should succeed on correct users and pending practice', async () => {
    let practice = await Practice.findOne({ _id: practiceId })
    expect(practice).to.exist
    debugger

    /*    await User.updateOne({ _id: ObjectId(id) }, { $set: { "wishes.$[wish]": wish } }, { arrayFilters: [{ "wish._id": ObjectId(wishId) }] })
     */
    await cancelPractice(instructorId, studentId, practiceId)
    practice = await Practice.findOne({ _id: practiceId })
debugger
    expect(practice).to.equal(null)
  })

  // should fail when practice has already feedback and valoration

  it('should fail on unexisting practice', async () => {
    let fakeId = '012345678901234567890123'
    try {
      await cancelPractice(instructorId, studentId, fakeId)
      throw Error('should not reach this point')

    } catch (error) {
      expect(error).to.exist
      expect(error.message).to.exist
      expect(typeof error.message).to.equal('string')
      expect(error.message.length).to.be.greaterThan(0)
      expect(error.message).to.equal(`practice with id ${fakeId} does not exists`)
    }
  })

  it('should fail on unexisting student', async () => {
    let fakeId = '012345678901234567890123'
    try {
      await cancelPractice(instructorId, fakeId, practiceId)
      throw Error('should not reach this point')

    } catch (error) {
      expect(error).to.exist
      expect(error.message).to.exist
      expect(typeof error.message).to.equal('string')
      expect(error.message.length).to.be.greaterThan(0)
      expect(error.message).to.equal(`user with id ${fakeId} not found`)
    }
  })

  it('should fail on unexisting instructor', async () => {
    let fakeId = '012345678901234567890123'
    try {
      await cancelPractice(fakeId, studentId, practiceId)
      throw Error('should not reach this point')

    } catch (error) {
      expect(error).to.exist
      expect(error.message).to.exist
      expect(typeof error.message).to.equal('string')
      expect(error.message.length).to.be.greaterThan(0)
      expect(error.message).to.equal(`user with id ${fakeId} not found`)
    }
  })

  describe('when practice is done', () => {
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

      // create practice
      price = 1
      status = 'done'
      date = new Date("Wed, 27 July 2016 13:30:00")
      let practice = await Practice.create({ date, instructorId, studentId, status })
      practiceId = practice.id
    })

    it('should fail on done practice and correct users', async () => {
      try {
        await cancelPractice(instructorId, studentId, practiceId)
        throw Error('should not reach this point')

      } catch (error) {
        expect(error).to.exist
        expect(error.message).to.exist
        expect(typeof error.message).to.equal('string')
        expect(error.message.length).to.be.greaterThan(0)
        expect(error.message).to.equal(`practice with id ${practiceId} is not possible to cancel`)
      }
    })

    it('should fail on unexisting student and practice done', async () => {
      let fakeId = '012345678901234567890123'
      try {
        await cancelPractice(instructorId, fakeId, practiceId)
        throw Error('should not reach this point')

      } catch (error) {
        expect(error).to.exist
        expect(error.message).to.exist
        expect(typeof error.message).to.equal('string')
        expect(error.message.length).to.be.greaterThan(0)
        expect(error.message).to.equal(`user with id ${fakeId} not found`)
      }
    })

    it('should fail on unexisting instructor and practice done', async () => {
      let fakeId = '012345678901234567890123'
      try {
        await cancelPractice(fakeId, studentId, practiceId)
        throw Error('should not reach this point')

      } catch (error) {
        expect(error).to.exist
        expect(error.message).to.exist
        expect(typeof error.message).to.equal('string')
        expect(error.message.length).to.be.greaterThan(0)
        expect(error.message).to.equal(`user with id ${fakeId} not found`)
      }
    })

  })

  it('should fail on incorrect instructorId, studentId, practiceId type or content', () => {
    expect(() => cancelPractice(1)).to.throw(TypeError, '1 is not a string')
    expect(() => cancelPractice(true)).to.throw(TypeError, 'true is not a string')
    expect(() => cancelPractice([])).to.throw(TypeError, ' is not a string')
    expect(() => cancelPractice({})).to.throw(TypeError, '[object Object] is not a string')
    expect(() => cancelPractice(undefined)).to.throw(TypeError, 'undefined is not a string')
    expect(() => cancelPractice(null)).to.throw(TypeError, 'null is not a string')

    expect(() => cancelPractice('')).to.throw(ContentError, 'instructorId is empty or blank')

    expect(() => cancelPractice(instructorId, 1)).to.throw(TypeError, '1 is not a string')
    expect(() => cancelPractice(instructorId, true)).to.throw(TypeError, 'true is not a string')
    expect(() => cancelPractice(instructorId, [])).to.throw(TypeError, ' is not a string')
    expect(() => cancelPractice(instructorId, {})).to.throw(TypeError, '[object Object] is not a string')
    expect(() => cancelPractice(instructorId, undefined)).to.throw(TypeError, 'undefined is not a string')
    expect(() => cancelPractice(instructorId, null)).to.throw(TypeError, 'null is not a string')
    expect(() => cancelPractice(instructorId, '')).to.throw(ContentError, 'studentId is empty or blank')
    expect(() => cancelPractice(instructorId, ' \t\r')).to.throw(ContentError, 'studentId is empty or blank')

    expect(() => cancelPractice(instructorId, studentId, 1)).to.throw(TypeError, '1 is not a string')
    expect(() => cancelPractice(instructorId, studentId, true)).to.throw(TypeError, 'true is not a string')
    expect(() => cancelPractice(instructorId, studentId, [])).to.throw(TypeError, ' is not a string')
    expect(() => cancelPractice(instructorId, studentId, {})).to.throw(TypeError, '[object Object] is not a string')
    expect(() => cancelPractice(instructorId, studentId, undefined)).to.throw(TypeError, 'undefined is not a string')
    expect(() => cancelPractice(instructorId, studentId, null)).to.throw(TypeError, 'null is not a string')
    expect(() => cancelPractice(instructorId, studentId, '')).to.throw(ContentError, 'practiceId is empty or blank')
    expect(() => cancelPractice(instructorId, studentId, ' \t\r')).to.throw(ContentError, 'practiceId is empty or blank')
  })

  after(() => Promise.all([User.deleteMany(), Practice.deleteMany()]).then(database.disconnect))
})
