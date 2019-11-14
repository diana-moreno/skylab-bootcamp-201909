//este fichero solo se ejecutará una vez, cuando se inicia el servidor, es un SINGLETON.
//

const fs = require('fs').promises
const path = require('path')
const validate = require('../../utils/validate')

let manager

module.exports = function(name = 'index') {
  validate.string(name)
  validate.string.notVoid('name', name)

  return manager ? manager : manager = {
    load() { // solo se llama una vez, que es cuando se traen los datos del disco
      // traemos los datos del disco (readfile)
      return this.users ? Promise.resolve() : fs.readFile(path.join(__dirname, `./${name}.json`))
        // hay que convertir los datos a json porque vienen chunks
        .then(json => JSON.parse(json))
        // this hace refeerncia al objeto que es manager
        // estamos creando users en memoria
        .then(users => { this.users = users })
    },

    // pasar los datos de memoria a disco
    // path.join es un paquete que hemos instaldo y requerido para hacer referencia a las carpetas.
    // _dirname : la ruta donde estoy. Con esto, está haciendo ruta absoluta, partiendo desde el punto actual hasta donde quiere llegar. Concatena una ruta absoluta con una relativa.
    persist() {
      return fs.writeFile(path.join(__dirname, `./${name}.json`), JSON.stringify(this.users, undefined, 4)) // 4 es la indentación (prefiero 2)
      // hay que volver a transformar los datos para guardarlos, tienen que estar en formato string de json.
    },

    get data() {
      return this.users
    }
  }
}
