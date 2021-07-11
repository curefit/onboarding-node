let person = {
    firstName: "Arjun",
    lastName: "Garg",
    Address: {
        Gali: 4,
        Taluk: "Taluk"
    },
    isMarried: false
}

function getFullName() {
    return person.firstName + " " + person.lastName
}

console.log(getFullName())