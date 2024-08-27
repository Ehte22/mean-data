// type
type TODO = {
    id?: number,
    task: string,
    desc: string,
    priority: number,
    complete?: boolean
}

const todo: TODO = {
    task: "task 1",
    desc: "lorem ipsum dolor sit amet",
    priority: 1
}

const arr: TODO[] = []

arr.push(todo)
console.log(arr);

// interface
interface USER {
    name: string,
    age: number,
    city: string,
}

const user: USER = {
    name: "john",
    age: 20,
    city: "london"
}

const demo = (user1: USER) => {
    return user1
}

const result = demo(user)
console.log(result)
