// arithmetic operators
// + - * / % ** ++ --

let x = 4, y = 2

console.log(x + y)
console.log(x - y)
console.log(x * y)
console.log(x / y)
console.log(x % y)
console.log(x ** y)

x++ // x++ = x + 1 = 4 + 1 = 5
console.log(x)

x-- // x-- = x - 1 = 5 - 1 = 4
console.log(x)

// Comparison Operator
// == === != !==  > < >= <=

let a = 10, b = 20, c = "20"
console.log(a == b) // false 
console.log(b == c) // true
console.log(b != c) // false
console.log(b === c) // false  data type and value does not match
console.log(b !== c) // true
console.log(b > c) // false b = 20 c = 20
console.log(b > a) // true b = 20 a = 10
console.log(b < a) // false b = 20 a = 10
console.log(b <= c) // true b = 20 c = 20
console.log(b >= c) // true b = 20 c = 20



// Logical operator
// && || !

console.log(true && false) // false
console.log(false && true) // false
console.log(false && false) // false
console.log(true && true) // true

console.log(true || false) // true
console.log(false || true) // true
console.log(true || true) // true
console.log(false || false) // flase

const z = false
console.log(!z)  // ! = not