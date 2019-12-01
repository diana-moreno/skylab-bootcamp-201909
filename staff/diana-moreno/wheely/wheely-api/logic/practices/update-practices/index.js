const { ObjectId, models: { User, Practice } } = require('wheely-data')
const moment = require('moment')

module.exports = function() {
  return (async () => {
    // search all pending practices
    let pendingPractices = await Practice
        .find({ "status": 'pending' })
        .lean()

    // check if some pending practice has expired and if it so, change its state to the next state ("feedback")
    pendingPractices.forEach(async (elem) => {
      if(moment(elem.date) < moment()) {
      await Practice.updateOne({ _id: elem._id }, { $set: { 'status': 'feedback' } }, { multi: true })
      }
    })

    // return the updated pending practices
    pendingPractices = await Practice
      .find({ "status": 'pending' })
      .lean()
  })()
}
