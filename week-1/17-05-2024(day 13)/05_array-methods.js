const arr = [10, 20, 30, 40, 50]

// arr.push(60) // Add a value to the last of the array
// arr.pop() // delete the last value of array
// arr.unshift(100) // add a value to the start of the array
// arr.shift() // delete the first value of the array

// arr.splice(0, 2) // delete the first 2 value of array
// arr.splice(2, 0, 60) // add a value to the second index of array

// const newArr = arr.slice(1, 4) // return a part of array
// console.log(newArr);

// console.log(arr.indexOf(30)); // return the index number
// console.log(arr.includes(20));  // Determines whether an array includes a certain element, returning true or false as appropriate.

// const newArr = arr.join() // Adds all the elements of an array into a string, separated by the specified separator string.
// console.log(newArr);

// const result = arr.filter(item => item === 20)
// const result = arr.filter(item => item !== 20)
// const result = arr.filter(item => item > 20)
// const result = arr.filter(item => item < 20)
// console.log(result);

// const result = arr.find(item => item === 20)
// const result = arr.findIndex(item => item === 20)
// console.log(result);

// const result = arr.map(item => console.log(item))
// const result = arr.map(item => console.log(item + item))

const result = arr.reduce((sum, item) => sum + item, 0)
console.log(result);




console.log(arr);

