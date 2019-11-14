const fs = require('fs').promises
const validate = require('./validate')

class DataManager {
  constructor(path) {
    validate.string(path)
    validate.string.notVoid('path', path)

    this._path = path
  }

  load() {// solo se llama una vez, que es cuando se traen los datos del disco
    // traer los datos del disco (readfile)
    return this._data ? Promise.resolve() : fs.readFile(this._path)
      .then(json => JSON.parse(json)) // los datos vienen en json format
      .then(_data => { this._data = _data }) //estamos creando users en memoria
  }
  // guardar los datos de memoria en disco
  persist() {
    // hay que volver a transformar los datos para guardarlos, tienen que estar en formato string de json.
    return fs.writeFile(this._path, JSON.stringify(this._data, undefined, 2))
  }

  get data() {
    return this._data
  }
}

module.exports = DataManager
