// Global Scope
let n = 30

// Block Scope 
if (true) {
    let x = 10
    const y = 20

    console.log(x)
    console.log(y)
    console.log(n)
}

// error: x or y is not defined
// console.log(x)
// console.log(y)

// Local or Functional Scope

function demo() {
    let a = 5
    const b = 10
    var c = 15

    function innerfn() {
        console.log(a)
        console.log(b)
        console.log(c)
    }

    innerfn()
}
demo()
// console.log(c) // error: c is not defined
