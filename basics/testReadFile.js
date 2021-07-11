const fs = require('fs').promises;

fs.readFile(__dirname + '/testReadFile.js', 'utf-8')
    .then(content => {
        console.log(content)
    })
    .catch(error => {
        console.error("couldn't read file", error)
    })

console.log("This should be printed first")
console.log("Now code should follow\n\n")