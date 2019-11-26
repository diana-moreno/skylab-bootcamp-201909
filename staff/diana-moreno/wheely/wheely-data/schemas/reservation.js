const { Schema, ObjectId } = require('mongoose')

module.exports = new Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  price: {
    type: Number,
    required: true
  },
  instructor: {
    type: ObjectId,
    required: true
  },
  student: {
    type: ObjectId,
    required: true
  },
})
