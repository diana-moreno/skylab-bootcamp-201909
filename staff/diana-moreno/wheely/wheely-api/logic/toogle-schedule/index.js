const { validate, errors: { NotFoundError } } = require('wheely-utils')
const { ObjectId, models: { User, Day, Week } } = require('wheely-data')

module.exports = function(adminId, instructorId, indexDay, hour) {
  // sincronous validate
  validate.string(instructorId)
  validate.string.notVoid('instructorId', instructorId)
  if (!ObjectId.isValid(instructorId)) throw new ContentError(`${instructorId} is not a valid id`)

  validate.string(adminId)
  validate.string.notVoid('adminId', adminId)
  if (!ObjectId.isValid(adminId)) throw new ContentError(`${adminId} is not a valid id`)

  validate.string(hour)
  validate.string.notVoid('hour', hour)

  validate.number(indexDay)

  return (async () => {
    // check if admin exists
    let admin = await User.findOne({ _id: adminId, role: 'admin' })

    // check if instructor exists
    let instructor = await User.findOne({ _id: instructorId, role: 'instructor' })
    if (!instructor) throw new NotFoundError(`user with id ${instructorId} not found`)

    // the first time, creates the schedule with all days of the week empty
    if (!instructor.profile.schedule) {
      instructor.profile.schedule = new Week()
      for (let i = 0; i < 7; i++) {
        instructor.profile.schedule.days.push(new Day({ index: i, hours: [] }))
      }
      await instructor.save()
    }

    // then searchs if the day exists to add in, and then checks if the hour in this day exists, if not, create it, if yes, delete it (make a toogle)
    instructor.profile.schedule.days.forEach(async (day) => {
      if (day.index === indexDay) {
        let indexFound = day.hours.indexOf(hour)
        indexFound < 0 ? day.hours.push(hour) : day.hours.splice(indexFound, 1)
      }
      await User.updateOne({ _id: instructorId }, { $set: { 'profile.schedule': instructor.profile.schedule } }, { multi: true })
    })

    // retrieves the updated instructor account and returns it
    instructor = await User.findOne({ _id: instructorId, role: 'instructor' })

    return instructor
  })()
}
