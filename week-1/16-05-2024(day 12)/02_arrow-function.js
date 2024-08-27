// Simple Arrow Function
const fn = () => { }

// arrow function with 1 argument
const demo = name => console.log("hello", name)
demo("john")

// arrow function with multiple argument
const demo2 = (num1, num2) => console.log(num1 + num2)
demo2(10, 20)

// arrow function with return value
const demo3 = (user) => {
    return user
}
const result = demo3({ name: "kete", age: 20 })
console.log(result)

