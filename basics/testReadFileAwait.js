const fs = require('fs').promises;

async function readFile(fileName) {
    return await fs.readFile(fileName, 'utf-8')
}

 function readOwnFile() {
    return readFile(__dirname + '/testReadFileAwait.js')
}

readOwnFile()
    .then(content => {
        console.log(content)
    })
    .catch(error => {
        console.error("couldn't read file", error)
    })
