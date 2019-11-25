const { Schema } = require('mongoose')
const { validators: { isEmail } } = require('tasks-util')

module.exports = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: isEmail
    },
    password: {
        type: String,
        required: true
    },
    lastAccess: {
        type: Date
    },
    role: {
        type: String,
        required: true
    },
    detail: {
        type: Object,
        required: true
    }
})