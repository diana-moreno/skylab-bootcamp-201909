require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const retrievePractices = require('.')
const { random } = Math
const { database, models: { User, Practice, Student, Instructor, Reservation, Feedback } } = require('wheely-data')

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
    date = new Date("Wed, 27 July 2023 13:30:00")
    await Practice.create({ date, instructorId, studentId, status })

    status = 'done'
    valoration = 'bad'
    feedback = 'no respecting the traffic lights'
    date = new Date("Wed, 28 July 2016 13:30:00")
    await Practice.create({ date, instructorId, studentId, status, feedback, valoration })

    status = 'feedback'
    date = new Date("Wed, 29 July 2016 13:30:00")
    await Practice.create({ date, instructorId, studentId, status })
  })

  it('should succeed on student user and query pending', async () => {
    const date = new Date("Wed, 27 July 2023 13:30:00")
    const query = 'pending'

    practices = await retrievePractices(studentId, query)

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
    const date1 = new Date("Wed, 28 July 2016 13:30:00")
    const date2 = new Date("Wed, 29 July 2016 13:30:00")
    const query = 'done'

    practices = await retrievePractices(studentId, query)

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
    const date1 = new Date("Wed, 27 July 2023 13:30:00")
    const date2 = new Date("Wed, 28 July 2016 13:30:00")
    const date3 = new Date("Wed, 29 July 2016 13:30:00")

    practices = await retrievePractices(studentId, undefined)

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
    const date = new Date("Wed, 27 July 2023 13:30:00")
    const query = 'pending'

    practices = await retrievePractices(studentId, query)

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

  it('should succeed on instructor user and no query', async () => {
    const date1 = new Date("Wed, 27 July 2023 13:30:00")
    const date2 = new Date("Wed, 28 July 2016 13:30:00")
    const date3 = new Date("Wed, 29 July 2016 13:30:00")

    practices = await retrievePractices(studentId, undefined)

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
    const date1 = new Date("Wed, 28 July 2016 13:30:00")
    const query = 'done'

    practices = await retrievePractices(instructorId, query)

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
    const date1 = new Date("Wed, 29 July 2016 13:30:00")
    const query = 'feedback'

    practices = await retrievePractices(instructorId, query)

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
    const date1 = new Date("Wed, 28 July 2016 13:30:00")
    const date2 = new Date("Wed, 29 July 2016 13:30:00")
    const query = 'done'

    practices = await retrievePractices(instructorId, query)

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
      await retrievePractices(fakeId, 'done')

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
      await retrievePractices(adminId, 'pending')

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
