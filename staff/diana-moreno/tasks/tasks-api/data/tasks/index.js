const validate = require('../../utils/validate')
const path = require('path')
const DataManager = require('../../utils/data-manager')

let manager

module.exports = function (name = 'index') {
    validate.string(name)
    validate.string.notVoid('name', name)
    // _dirname hace referencia a la ubicación acual
    return manager ? manager : manager = new DataManager(path.join(__dirname, `./${name}.json`))
}
