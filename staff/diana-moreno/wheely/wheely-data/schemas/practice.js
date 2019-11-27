const { Schema, ObjectId } = require('mongoose')

module.exports = new Schema({
  date: {
    type: Date,
    required: true
  },
  reservation: {
    type: Object,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'cancelled', 'done'],
    default: 'pending'
  },
  feedback: {
    type: Object
  }
})
