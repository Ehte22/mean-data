let firstName: string = "john"
let priority: number = 1
let complete: boolean = false

let n1 = 10
let n2 = 20

const demo = (n1: number, n2: number) => {
    return n1 + n2
}

const result = demo(n1, n2)
console.log(result);

let user: {
    name: string,
    age: number,
    city: string
}

user = { name: "kate", age: 24, city: "new york" }

let users: {
    name: string,
    age: number,
    city: string
}[] = []

users.push(user)

console.log(users)






