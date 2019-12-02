require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const listPractices = require('.')
const { random } = Math
const { database, models: { User, Practice, Student, Instructor } } = require('wheely-data')
const { validate, errors: { ContentError } } = require('wheely-utils')

describe('logic - retrieve practices', () => {
  before(() => database.connect(TEST_DB_URL))

  let studentId, instructorId, adminId, name, surname, email, password, role, price, date, status, dates

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

    await student.save()
    studentId = student.id

    // create an instructor
    name = `name-${random()}`
    surname = `surname-${random()}`
    email = `email-${random()}@mail.com`
    password = `password-${random()}`
    role = 'instructor'

    let instructor = await User.create({ name, surname, email, password, role})
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
    dates = ["Wed, 27 July 2023 13:30:00", "Wed, 28 July 2016 13:30:00", "Wed, 29 July 2016 13:30:00"]
    status = 'pending'
    date = new Date(dates[0])
    await Practice.create({ date, instructorId, studentId, status })

    status = 'done'
    valoration = 'bad'
    feedback = 'no respecting the traffic lights'
    date = new Date(dates[1])
    await Practice.create({ date, instructorId, studentId, status, feedback, valoration })

    status = 'feedback'
    date = new Date(dates[2])
    await Practice.create({ date, instructorId, studentId, status })
  })

  it('should succeed on student user and query pending', async () => {
    const date = new Date(dates[0])
    const query = 'pending'

    practices = await listPractices(studentId, query)

    expect(practices).to.exist
    expect(practices.length).to.equal(1)
    expect(practices[0].status).to.equal('pending')
    expect(practices[0].date).to.exist
    expect(practices[0].date).to.be.instanceOf(Date)
    expect(practices[0].date.getTime()).to.equal(date.getTime())
    expect(practices[0].date).to.exist
    expect(practices[0].price).to.equal(price)
    expect(practices[0].instructorId.toString()).to.exist
    expect(practices[0].studentId.toString()).to.exist
    expect(practices[0].feedback).to.equal(undefined)
  })

  it('should succeed on student user and query done', async () => {
    const date1 = new Date(dates[1])
    const date2 = new Date(dates[2])
    const query = 'done'

    practices = await listPractices(studentId, query)

    expect(practices).to.exist
    expect(practices.length).to.equal(2)
    expect(practices[0].status).to.equal('done')
    expect(practices[0].date).to.exist
    expect(practices[0].date).to.be.instanceOf(Date)
    expect(practices[0].date.getTime()).to.equal(date1.getTime())
    expect(practices[0].date).to.exist
    expect(practices[0].price).to.equal(price)
    expect(practices[0].instructorId.toString()).to.exist
    expect(practices[0].studentId.toString()).to.exist
    expect(practices[0].feedback).to.equal('no respecting the traffic lights')
    expect(practices[0].valoration).to.equal('bad')
    expect(practices[1].date).to.exist
    expect(practices[1].date).to.be.instanceOf(Date)
    expect(practices[1].date.getTime()).to.equal(date2.getTime())
    expect(practices[1].status).to.equal('feedback')
    expect(practices[1].date).to.exist
    expect(practices[1].price).to.equal(price)
    expect(practices[1].instructorId.toString()).to.exist
    expect(practices[1].studentId.toString()).to.exist
    expect(practices[1].feedback).to.equal(undefined)
  })

  it('should succeed on student user and no query', async () => {
    const date1 = new Date(dates[0])
    const date2 = new Date(dates[1])
    const date3 = new Date(dates[2])

    practices = await listPractices(studentId, undefined)

    expect(practices).to.exist
    expect(practices.length).to.equal(3)
    expect(practices[0].status).to.equal('pending')
    expect(practices[0].date.getTime()).to.equal(date1.getTime())
    expect(practices[1].status).to.equal('done')
    expect(practices[1].date.getTime()).to.equal(date2.getTime())
    expect(practices[2].status).to.equal('feedback')
    expect(practices[2].date.getTime()).to.equal(date3.getTime())
  })

  it('should succeed on student user and query pending', async () => {
    const date = new Date(dates[0])
    const query = 'pending'

    practices = await listPractices(studentId, query)

    expect(practices).to.exist
    expect(practices.length).to.equal(1)
    expect(practices[0].status).to.equal('pending')
    expect(practices[0].date).to.exist
    expect(practices[0].date).to.be.instanceOf(Date)
    expect(practices[0].date.getTime()).to.equal(date.getTime())
    expect(practices[0].date).to.exist
    expect(practices[0].price).to.equal(price)
    expect(practices[0].instructorId.toString()).to.exist
    expect(practices[0].studentId.toString()).to.exist
    expect(practices[0].feedback).to.equal(undefined)
  })
  it('should succeed on student user and query progression', async () => {
    const date = new Date(dates[1])
    const query = 'progression'

    practices = await listPractices(studentId, query)

    expect(practices).to.exist
    expect(practices.length).to.equal(1)
    expect(practices[0].status).to.equal('done')
    expect(practices[0].date).to.exist
    expect(practices[0].date).to.be.instanceOf(Date)
    expect(practices[0].date.getTime()).to.equal(date.getTime())
    expect(practices[0].date).to.exist
    expect(practices[0].price).to.equal(price)
    expect(practices[0].instructorId.toString()).to.exist
    expect(practices[0].studentId.toString()).to.exist
    expect(practices[0].feedback).to.equal('no respecting the traffic lights')
  })

  it('should succeed on instructor user and no query', async () => {
    const date1 = new Date(dates[0])
    const date2 = new Date(dates[1])
    const date3 = new Date(dates[2])

    practices = await listPractices(studentId, undefined)

    expect(practices).to.exist
    expect(practices.length).to.equal(3)
    expect(practices[0].status).to.equal('pending')
    expect(practices[0].date.getTime()).to.equal(date1.getTime())
    expect(practices[1].status).to.equal('done')
    expect(practices[1].date.getTime()).to.equal(date2.getTime())
    expect(practices[2].status).to.equal('feedback')
    expect(practices[2].date.getTime()).to.equal(date3.getTime())
  })

  it('should succeed on instructor user and query done', async () => {
    const date1 = new Date(dates[1])
    const query = 'done'

    practices = await listPractices(instructorId, query)

    expect(practices).to.exist
    expect(practices.length).to.equal(1)
    expect(practices[0].status).to.equal('done')
    expect(practices[0].date).to.exist
    expect(practices[0].date).to.be.instanceOf(Date)
    expect(practices[0].date.getTime()).to.equal(date1.getTime())
    expect(practices[0].status).to.equal('done')
    expect(practices[0].date).to.exist
    expect(practices[0].price).to.equal(price)
    expect(practices[0].instructorId.toString()).to.exist
    expect(practices[0].studentId.toString()).to.exist
    expect(practices[0].feedback).to.equal('no respecting the traffic lights')
    expect(practices[0].valoration).to.equal('bad')
  })

  it('should succeed on instructor user and query feedback', async () => {
    const date1 = new Date(dates[2])
    const query = 'feedback'

    practices = await listPractices(instructorId, query)

    expect(practices).to.exist
    expect(practices.length).to.equal(1)
    expect(practices[0].status).to.equal('feedback')
    expect(practices[0].date).to.exist
    expect(practices[0].date).to.be.instanceOf(Date)
    expect(practices[0].date.getTime()).to.equal(date1.getTime())
    expect(practices[0].status).to.equal('feedback')
    expect(practices[0].date).to.exist
    expect(practices[0].price).to.equal(price)
    expect(practices[0].instructorId.toString()).to.exist
    expect(practices[0].studentId.toString()).to.exist
    expect(practices[0].feedback).to.equal(undefined)
    expect(practices[0].valoration).to.equal(undefined)
  })

  it('should succeed on instructor user and query done', async () => {
    const date1 = new Date(dates[1])
    const date2 = new Date(dates[2])
    const query = 'done'

    practices = await listPractices(instructorId, query)

    expect(practices).to.exist
    expect(practices.length).to.equal(1)
    expect(practices[0].status).to.equal('done')
    expect(practices[0].date).to.exist
    expect(practices[0].date).to.be.instanceOf(Date)
    expect(practices[0].date.getTime()).to.equal(date1.getTime())
    expect(practices[0].date).to.exist
    expect(practices[0].price).to.equal(price)
    expect(practices[0].instructorId.toString()).to.exist
    expect(practices[0].instructorId.toString()).to.exist
    expect(practices[0].feedback).to.equal('no respecting the traffic lights')
    expect(practices[0].valoration).to.equal('bad')
  })

  it('should fail on unexisting user', async () => {
    let fakeId = '012345678901234567890123'
    try {
      await listPractices(fakeId, 'done')
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
      await listPractices(adminId, 'pending')
      throw Error('should not reach this point')

    } catch (error) {
      expect(error).to.exist
      expect(error.message).to.exist
      expect(typeof error.message).to.equal('string')
      expect(error.message.length).to.be.greaterThan(0)
      expect(error.message).to.equal(`admin has no practices`)
    }
  })

   it('should fail on incorrect user id and query type or content', () => {
      expect(() => listPractices('1')).to.throw(ContentError, '1 is not a valid id')
      expect(() => listPractices(1)).to.throw(TypeError, '1 is not a string')
      expect(() => listPractices(true)).to.throw(TypeError, 'true is not a string')
      expect(() => listPractices([])).to.throw(TypeError, ' is not a string')
      expect(() => listPractices({})).to.throw(TypeError, '[object Object] is not a string')
      expect(() => listPractices(undefined)).to.throw(TypeError, 'undefined is not a string')
      expect(() => listPractices(null)).to.throw(TypeError, 'null is not a string')
     expect(() => listPractices('')).to.throw(ContentError, 'userId is empty or blank')

      expect(() => listPractices(instructorId, 1)).to.throw(TypeError, '1 is not a string')
      expect(() => listPractices(instructorId, true)).to.throw(TypeError, 'true is not a string')
      expect(() => listPractices(instructorId, [])).to.throw(TypeError, ' is not a string')
      expect(() => listPractices(instructorId, {})).to.throw(TypeError, '[object Object] is not a string')
    })

  after(() => Promise.all([User.deleteMany(), Practice.deleteMany()]).then(database.disconnect))
})
