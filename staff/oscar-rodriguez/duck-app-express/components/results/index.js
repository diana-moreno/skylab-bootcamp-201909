const ResultItem = require ('../result-item')

module.exports = function ({items}) {
    return `<ul class="results">
                ${items.map ((item)=> ResultItem({item: item}))}
            </ul>`
}