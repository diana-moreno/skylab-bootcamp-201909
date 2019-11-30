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

// lacks validate indexDay and hour

  return (async () => {
    // check if admin exists
    let admin = await User.findOne({ _id: adminId, role: 'admin' })

    // check if instructor exists
    let instructor = await User.findOne({ _id: instructorId, role: 'instructor' })
    if (!instructor) throw new NotFoundError(`user with id ${instructorId} not found`)

    // the first time, creates the schedule with all day of the week
    if (!instructor.profile.schedule) {
      instructor.profile.schedule = new Week()
      for (let i = 0; i < 7; i++) {
        instructor.profile.schedule.days.push(new Day({ index: i, hours: [] }))
      }
      await instructor.save()
    }

    // then searchs if the day exists to add in the hour if no exists, but if exists, deletes the hour (makes a toogle)
    instructor.profile.schedule.days.forEach(async (day) => {
      if (day.index === indexDay) {
        let indexFound = day.hours.indexOf(hour)
        if (indexFound < 0) {
          day.hours.push(hour)
        } else {
          day.hours.splice(indexFound, 1)
        }
      }
      await User.updateOne({ _id: instructorId }, { $set: { 'profile.schedule': instructor.profile.schedule } }, { multi: true })
    })

    // retrieves the updated instructor account and returns it
    instructor = await User.findOne({ _id: instructorId, role: 'instructor' })

    return instructor
  })()
}
