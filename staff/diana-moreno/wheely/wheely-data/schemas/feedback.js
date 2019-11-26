const { Schema, ObjectId } = require('mongoose')

module.exports = new Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  message: {
    type: Array,
    required: true
  },
  valoration: {
    type: String,
    enum: ['bad', 'regular', 'good'],
    required: true
  },
})
