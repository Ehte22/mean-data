// const user = function (name, email, password) {
//     this.name = name
//     this.email = email
//     this.password = password
// }

// user.prototype.changeCase = function () {
//     return `${this.name.toUpperCase()}`
// }

// const user1 = new user("john", "john@gmail.com", 123)
// console.log(user1.changeCase());

class User {
    constructor(name, email, age) {
        this.name = name
        this.email = email
        this.age = age
        this.city = "london"
    }
}

User.prototype.num = 111

const user1 = new User("john", "john@gmail.com", 22)
const user2 = new User("john", "john@gmail.com", 22)
console.log(user1);
console.log(user1.num);
console.log(user2.num);

const s = new Boolean()
console.log(s);