const { validate, errors: { NotFoundError, ConflictError } } = require('wheely-utils')
const { ObjectId, models: { User, Practice, Instructor, Day, Week } } = require('wheely-data')

module.exports = function(adminId, instructorId, indexDay, hour) {
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

/*      let day0 = new Day({ index: 0, hours: [] })
      let day1 = new Day({ index: 1, hours: [] })
      let day2 = new Day({ index: 2, hours: [] })
      let day3 = new Day({ index: 3, hours: [] })
      let day4 = new Day({ index: 4, hours: [] })
      let day5 = new Day({ index: 5, hours: [] })
      let day6 = new Day({ index: 6, hours: [] })
      instructor.profile.schedule.days.push(day0, day1, day2, day3, day4, day5, day6)*/

    if (!instructor.profile.schedule) {
      instructor.profile.schedule = new Week()
      let firstDay = new Day({ index: indexDay, hours: [hour] })
      instructor.profile.schedule.days.push(firstDay)

      await User.updateOne({ _id: instructorId }, { $set: { 'profile.schedule': instructor.profile.schedule } }, { multi: true })
    } else {
      instructor.profile.schedule.days.forEach(day => {
        if (day.index === indexDay) {
          let indexFound = day.hours.indexOf(hour)
          if (indexFound < 0) {
            day.hours.push(hour)
          } else {
            day.hours.splice(indexFound, 1)
          }
        } else { // esto no debe ir aqui
          let newDay = new Day({ index: indexDay, hours: [hour] })
          instructor.profile.schedule.days.push(newDay)
        }
      })
      await User.updateOne({ _id: instructorId }, { $set: { 'profile.schedule': instructor.profile.schedule } }, { multi: true })

    }

    /*      let day = new Day(day1)

          instructor.profile.schedule.days.push(day)
          instructor.profile.schedule.days.push(day)
    */

    /*   await User.updateOne({ _id: instructorId }, { $set: { 'profile.schedule': instructor.profile.schedule } }, { multi: true })*/



    debugger
    return instructor
  })()
}
