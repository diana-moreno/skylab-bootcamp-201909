
const call = require ('../../helpers/call')


module.exports = function (id) {
    if (typeof id !== 'string') throw new TypeError(id +  ' is not a string');

    return new Promise ( (resolve, reject) => {
        call('GET', 'https://duckling-api.herokuapp.com/api/ducks/' + id, undefined, undefined, function (result) {
            result.error ? reject(new Error(result.error)) : resolve( result);
        })
    })
}