// for loop
let x = 1
for (let i = 0; i < 5; i++) {
    console.log(i + x)
}

// while loop
let y = 1
while (y < 5) {
    console.log(y)
    y++
}

// do while
let z = 5
do {
    console.log(z)
    z++
} while (z < 10)

// for of 
const arr = [10, 20, 30]
for (const item of arr) {
    console.log(item)
}

// for in
const obj = { name: "john", age: 20 }
for (const key in obj) {
    const element = obj[key]
    console.log(key, element)
}