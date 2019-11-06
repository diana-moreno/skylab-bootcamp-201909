const ResultItem = require ('../result-item')

module.exports = function () {
    
    return `<ul class="results">
                ${ResultItem()}
            </ul>`
}