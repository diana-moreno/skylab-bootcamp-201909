const { Schema, ObjectId } = require('mongoose')

module.exports = new Schema({
  date: {
    type: Date,

    default: Date.now
  },
  price: {
    type: Number,
    required: true,
    default: 1
  },
  instructorId: {
    type: ObjectId,
    required: true
  },
  studentId: {
    type: ObjectId,
    required: true
  },
})
