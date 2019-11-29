/*require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const toogleSchedule = require('.')
const { random } = Math
const { database, models: { User, Practice, Student, Instructor, Feedback } } = require('wheely-data')

describe.only('logic - toogle schedule instructor', () => {
  before(() => database.connect(TEST_DB_URL))

  let studentId, instructorId, name, surname, email, password, role, price, status, date, practId, credits, student, adminId, feedback, puntuation

  beforeEach(async () => {
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
  })

  it('should succeed on saving dates to instructor', async () => {
    const day1 = { index: 0, hours: [11] }
    practices = await toogleSchedule(adminId, instructorId, day1)
debugger
    expect(practices).to.exist
    expect(practices[0].status).to.equal('done')
    expect(practices[1].status).to.equal('done')
  })
  after(() => Promise.all([User.deleteMany(), Practice.deleteMany()]).then(database.disconnect))
})
*/