const { validate, errors: { NotFoundError, ContentError } } = require('wheely-utils')
const { ObjectId, models: { User, Student, Instructor } } = require('wheely-data')
const moment = require('moment')

module.exports = function(instructorId) { // hace falta el id de quien lo pide?
  validate.string(instructorId)
  validate.string.notVoid('instructorId', instructorId)
  if (!ObjectId.isValid(instructorId)) throw new ContentError(`${instructorId} is not a valid instructorId`)

  return (async () => {
    let instructor = await User.findOne({ _id: instructorId, role: 'instructor' })
    if (!instructor) throw new NotFoundError(`user with instructorId ${instructorId} not found`)

    let scheduleDb = instructor.profile.schedule.days
    let calendar = []

    // transform the schedule of weekdays of the data base in an object with real dates (for 30 natural days) and an array of hours to expose in the frontend for booking
    for (let i = 0; i < 30; i++) {
      let weekday = moment().add(i, 'day').day()
      let today = Number(moment().day())

      if (scheduleDb[weekday].hours.length > 0) {
        let day = moment().day(i + today, 'day')
        let hours = scheduleDb[weekday].hours
        calendar.push({
          day,
          hours
        })
      }
    }

    // checks if the first day of the array is today. If is today, removes from the array of hours, the hours that are past (to no offer a new practice in the past)
    if (calendar[0].day.format('L') == moment().format('L')) {
      let [, now] = moment().format('DD-MM-YYYY HH:mm:ss').split(' ')
      const timeNow = moment(now, "H:mm"); // parse string to moment hour

      calendar[0].hours.forEach(hour => {
        let timeSaved = moment(hour, "H:mm") // parse string to moment hour

        if (timeNow.isBefore(timeSaved)) {
          let index = calendar[0].hours.indexOf(hour)
          calendar[0].hours.splice(index, 1)
        }
      })
    }

    return calendar
  })()
}
