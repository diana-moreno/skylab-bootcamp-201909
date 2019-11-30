require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const updatePractices = require('.')
const { random } = Math
const { database, models: { User, Practice, Student, Instructor, Reservation, Feedback } } = require('wheely-data')
/*const moment = require('moment')
const now = moment().format('MMMM Do YYYY, h:mm:ss a')*/

describe('logic - update status practices', () => {
  before(() => database.connect(TEST_DB_URL))

  let studentId, instructorId, name, surname, email, password, role, price, status, date, practId, credits, student, adminId, feedback, puntuation, practices

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
    status = 'done'
    date = new Date("Wed, 27 July 2019 13:30:00")
    feedback = 'The student has no respected the traffic light, he did it really bad.'
    valoration = 'bad'
    await Practice.create({ date, instructorId, studentId, status, feedback, valoration })

    status = 'feedback'
    date = new Date("Wed, 28 July 2019 13:30:00")
    await Practice.create({ date, instructorId, studentId, status })

    status = 'pending'
    date = new Date("Wed, 01 February 2050 13:30:00")
    await Practice.create({ date, instructorId, studentId, status })

    status = 'pending'
    date = new Date("Wed, 30 November 2019 13:30:00")
    await Practice.create({ date, instructorId, studentId, status })
  })

  it('should succeed updating the practices date', async () => {
    practices = await Practice.find()

    expect(practices).to.exist
    expect(practices[0].status).to.equal('done')
    expect(practices[1].status).to.equal('feedback')
    expect(practices[2].status).to.equal('pending')
    expect(practices[3].status).to.equal('pending')

    await updatePractices()

    practices = await Practice.find()

    expect(practices).to.exist
    expect(practices[0].status).to.equal('done')
    expect(practices[1].status).to.equal('feedback')
    expect(practices[2].status).to.equal('pending')
    expect(practices[3].status).to.equal('feedback')
  })

  after(() => Promise.all([User.deleteMany(), Practice.deleteMany()]).then(database.disconnect))
})
