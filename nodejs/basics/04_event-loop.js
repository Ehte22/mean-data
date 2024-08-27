const fs = require("fs")


// TOP LEVEL CODE EXECUTES FIRST
console.log("Program has started");

// // STORED IN - 1ST PHASE OF EVENT LOOP (EXPIRED TIMERS)
// setTimeout(() => {
//     console.log("Timer callback executed");
// }, 0);

// STORED IN - 2ND PHASE OF EVENT LOOP (INPUT/OUPUT(I/O) TASKS AND & POLLIGN)
fs.readFile("./files/input.txt", "utf-8", (err, data) => {
    console.log("File read completed");

    // STORED IN - 1ST PHASE OF EVENT LOOP (EXPIRED TIMERS)
    setTimeout(() => {
        console.log("Timer callback executed");
    }, 0);

    // STORED IN - 3RD PHASE OF EVENT LOOP (SETIMMEDIATE  CALLBACK)
    setImmediate(() => {
        console.log("SetImmediate callback executed");
    });

    // IMMIDATELY EXECUTED AFTER 2ND PHASE IS COMPLETED
    process.nextTick(() => {
        console.log("process.nextTick callback executed");
    })
})

// // STORED IN - 3RD PHASE OF EVENT LOOP (SETIMMEDIATE  CALLBACK)
// setImmediate(() => {
//     console.log("SetImmediate callback executed");
// });


// TOP LEVEL CODE EXECUTES FIRST
console.log("Program has completed");