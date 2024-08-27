let x = 10

if (x) {
    console.log(x)
}

if (x > 100) {
    console.log(x)
} else {
    console.log("x is less than 100")
}

// ternary operator
x > 5 ? console.log("x is greater than 5") : console.log("x is less than 5")

// switch case
let num = 2

switch (num) {
    case 1: console.log("value of num is 1"); break;
    case 2: console.log("value of num is 2"); break;
    case 3: console.log("value of num is 3"); break;

    default: console.log("value of x does not match")
}