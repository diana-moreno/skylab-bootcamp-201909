const fs = require('fs')
const path = require('path')

fs.readdir(process.argv[2], function callback (err, list) { 
    
    if(err) throw err

    const files = list.filter(file => path.extname(file) === '.md')
    
    files.forEach(file => {console.log(file)});
    
 })
