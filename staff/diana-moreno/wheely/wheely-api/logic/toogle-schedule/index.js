const { validate, errors: { NotFoundError, ConflictError } } = require('wheely-utils')
const { ObjectId, models: { User, Practice, Instructor, Day, Week } } = require('wheely-data')
const moment = require('moment')

module.exports = function(adminId, instructorId, day1) {
  // sincronous validate
  validate.string(instructorId)
  validate.string.notVoid('instructorId', instructorId)
  if (!ObjectId.isValid(instructorId)) throw new ContentError(`${instructorId} is not a valid id`)

  validate.string(adminId)
  validate.string.notVoid('adminId', adminId)
  if (!ObjectId.isValid(adminId)) throw new ContentError(`${adminId} is not a valid id`)
  /*
    validate.date(date)*/

  return (async () => {
    // check if admin exists
    let admin = await User.findOne({ _id: adminId, role: 'admin' })

    // check if instructor exists
    let instructor = await User.findOne({ _id: instructorId, role: 'instructor' })
    if (!instructor) throw new NotFoundError(`user with id ${instructorId} not found`)
    debugger

    instructor.profile.schedule = new Week()
    let day = new Day(day1)

    instructor.profile.schedule.days.push(day)
    instructor.profile.schedule.days.push(day)

    //set first day to monday
    var d = moment().weekday('Monday');

    const now = moment()/*.format('MMMM Do YYYY, h:mm:ss a')*/
    let monday = moment().day(1)
    let tuesday = moment().day(2)
    let wednesday = moment().day(3)
    let thursday = moment().day(4)
    let friday = moment().day(5)
    let saturday = moment().day(6)
    let sunday = moment().day(0)

    if(monday - now < 0) {
      monday = moment().day(0 + 7)
    }

let myday = '11-25-2020' // recibiré un string como este del frontend
let dayofweek = moment(myday).day() // puedo saber qué día de la semana es, 0:domingo
let myhour = '9:00' // recibiré un string como este del frontend
let concat = myday.concat(' ').concat(myhour) // concateno los strings
let mydate = moment(concat, 'MM-DD-YYYY hh:mm A') // transformación de los strings a date
//moment('05-17-2018 23:40 AM', 'MM-DD-YYYY hh:mm A')

    debugger



    /*      day = {
            index: 0,
            hour: 11
          }*/
    /*      await instructor.save()

          student.profile.credits = student.profile.credits - practice.price
          student.profile.practices.push(practice.id)
          instructor.profile.practices.push(practice.id)
          instructor.profile.students.push(studentId)*/

    await User.updateOne({ _id: instructorId }, { $set: { 'profile.schedule': instructor.profile.schedule } }, { multi: true })



    // check if instructor has already the date
    /*   let dates = instructor.profile.schedule*/
    return instructor
  })()
}
