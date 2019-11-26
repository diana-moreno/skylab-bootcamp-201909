const { Schema } = require('mongoose')

module.exports = new Schema({
    instructors: {
        type: Array
    },
    students: {
        type: Array
    }
})