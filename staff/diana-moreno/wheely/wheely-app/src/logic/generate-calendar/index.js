const call = require('../../utils/call')
const { validate, errors: { NotFoundError, CredentialsError } } = require('wheely-utils')
const API_URL = process.env.REACT_APP_API_URL
const moment = require('moment')

module.exports = function(token, id) {
  validate.string(token)
  validate.string.notVoid('token', token)

  validate.string(id)
  validate.string.notVoid('id', id)
  if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)

  return (async () => {
    const res = await call(`${API_URL}/users/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (res.status === 200) {
      const result = JSON.parse(res.body)
      let { user: { profile : { schedule : { days: schedule } } } } = result

    // transform the schedule of weekdays of the data base in an object with real dates (for 30 natural days) and an array of hours to expose in the frontend for booking
    for (let i = 0; i < 30; i++) {
      const weekday = moment().add(i, 'day').day()
      const today = Number(moment().day())

      if (schedule[weekday].hours.length > 0) {
        let dayHour = moment().day(i + today, 'day')
        debugger
/*        let [day, ] = dayHour.format('DD-MM-YYYY HH:mm:ss').split(' ')*/
        let day = dayHour.format('DD-MM-YYYY')
        const hours = schedule[weekday].hours
        calendar.push({
          day,
          hours
        })
      }
    }


    // checks if the first day of the array is today. If is today, removes from the array of hours, the hours that are past (to no offer a new practice in the past)

    if (calendar[0].day == moment().format('L')) {
      const now = moment().format('HH:mm')
/*      const [, now] = moment().format('DD-MM-YYYY HH:mm:ss').split(' ')*/
      const timeNow = moment(now, "HH:mm"); // parse string to moment hour

      calendar[0].hours.forEach(hour => {
        const timeSaved = moment(hour, "H:mm") // parse string to moment hour

        if (timeNow.isBefore(timeSaved)) {
          const index = calendar[0].hours.indexOf(hour)
          calendar[0].hours.splice(index, 1)
        }
      })
    }


      return calendar
    }
    if (res.status === 401) throw new CredentialsError(JSON.parse(res.body).message)
    if (res.status === 404) throw new NotFoundError(JSON.parse(res.body).message)
    throw new Error(JSON.parse(res.body).message)
  })()
}
