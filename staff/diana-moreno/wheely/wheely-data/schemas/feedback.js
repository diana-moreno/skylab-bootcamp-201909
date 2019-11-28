const { Schema, ObjectId } = require('mongoose')

module.exports = new Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  feedback: {
    type: String,
    required: true
  },
  valoration: {
    type: String,
    enum: ['bad', 'regular', 'good'],
    required: true
  },
})
