
const promiseOne = () => new Promise((resolve, reject) => {
    const error = false
    if (!error) {
        resolve({ name: "john", age: 20 })
    } else {
        reject("rejected")
    }
})

// promiseOne()
//     .then(res => console.log(res))
//     .catch(rej => console.log(rej))

const getUsers = async () => {
    try {
        const res = await promiseOne()
        console.log(res)
    } catch (error) {
        console.log(error)
    }
}

getUsers()

const Url = "https://jsonplaceholder.typicode.com/posts"

// fetch(Url)
//     .then(res => res.json())
//     .then(result => console.log(result))
//     .catch(err => console.log(err))

const getAllUsers = async () => {
    try {
        const res = await fetch(Url)
        const result = await res.json()
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}

getAllUsers()



