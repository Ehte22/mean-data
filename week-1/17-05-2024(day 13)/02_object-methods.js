// function expression method
const obj = {
    name: "john",
    greet: function () {
        console.log("hello");
    }
}
obj.greet()

// ES6 method
const obj1 = {
    name: "ross",
    greet() {
        console.log("hello, " + this.name);
    }
}
obj1.greet()

// adding method to an existing object
const obj2 = {
    name: "kate",
}

obj2.greet = function () {
    console.log("adding method to an existing object");
}
obj2.greet()
