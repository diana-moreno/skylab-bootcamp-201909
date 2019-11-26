const { Schema } = require('mongoose')
const { validators: { isEmail } } = require('wheely-utils')

module.exports = new Schema({
  schedule: {
    type: Object
  },
  statistics: {
    type: Array
  },
  practices: {
    type: Array
  },
  students: {
    type: Array,
    required: true
  }
})
