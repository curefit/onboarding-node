const fs = require('fs').promises;

async function readFile(fileName) {
    let content = await fs.readFile(fileName, 'utf-8')
    console.log(content)
    return content
}

 function readOwnFile() {
    return readFile(__dirname + '/testReadFileAwait.js')
}

readOwnFile()
    .then(content => {
    })
    .catch(error => {
        console.error("couldn't read file", error)
    })
