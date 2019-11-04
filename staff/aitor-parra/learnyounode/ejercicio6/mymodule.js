/* You must write a module file (mymodule.js) to do most of the work. The  
module must export a single function that takes three arguments: the  
directory name, the filename extension string and your callback function,  
in that order. Don't alter the filename extension string in any way before  
passing it to your module.  */

/* The callback function must be called using the idiomatic node(err, data)  
convention. This convention stipulates that unless there's an error, the  
first argument passed to the callback will be null, and the second will be  
your data. In this exercise, the data will be your filtered list of files,  
as an Array. If you receive an error, e.g. from your call to  
fs.readdir(), the callback must be called with the error as the first and  
only argument. */

module.exports = single

const single = function (directory_name, file_extension, (err, data) { 
    
    if(err) throw err

    const files = data.filter(file => path.extname(file) === '.md')
    
    files.forEach(file => {
        
        console.log(file)
    });

    
 })


