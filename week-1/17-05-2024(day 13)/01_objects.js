const city = "new york"
const mySym = Symbol("key1")


const obj = {
    name: "john",
    "full name": "john doe",
    email: "john@gmail.com",
    age: 20,
    [mySym]: "mykey1"
}

console.log(obj.name);
console.log(obj["name"]);
console.log(obj["full name"]);
console.log(obj[mySym]);

obj.name = "kate"
console.log(obj.name);
// Object.freeze(obj)

obj.demo = function () {
    console.log("hello");
    return this.name
}

console.log(obj.demo());

console.log(obj);

