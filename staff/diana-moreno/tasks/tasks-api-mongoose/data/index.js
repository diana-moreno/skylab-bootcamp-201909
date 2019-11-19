const mongoose = require('mongoose')
const { ObjectId } = require('mongodb') // o mongoose?

module.exports = {
  database: {
    connect(url) {
      return mongoose.connect(url, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })
    },
    disconnect() {
      return mongoose.disconnect()
    }
  },
  models: require('./models'),
  ObjectId
}
