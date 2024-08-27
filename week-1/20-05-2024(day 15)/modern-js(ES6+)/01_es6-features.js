// template leterals
const root = document.getElementById("root")

let a = 10, b = 20
const result = `the sum of ${a} and ${b} is ${a + b}`
root.innerHTML = result
console.log(result);

// array and object destructuring

// array
const arr = [10, 20, 30]

const [num1, num2, num3] = arr
console.log(num1);
console.log(num2);
console.log(num3);

// object

// const users = { name: "john", age: 20, city: "london" }
// const { name, age } = users
// console.log(name);
// console.log(age);

// const users = { name: "john", age: 21 }
// const { name: personName, age: personAge } = users
// console.log(personName);
// console.log(personAge);

const users = {
    name: "kate",
    age: 22,
    address: {
        city: "New York",
        country: "USA"
    }
}

const { name, age, address: { city, country } } = users
console.log(name);
console.log(age);
console.log(city);
console.log(country);

// spread and rest operators

// rest operator 👇 
const rest = (...arg) => {
    console.log(arg);
}

rest(10, 20, 30)

const spread = [10, 20, 30]
// spread operator 👇
console.log(...spread);

// Default Parameters
function demo(name = 'john', greeting = 'Hello') {
    console.log(greeting, name);
}

demo();
demo('kate');
demo('ross', 'Hi');
