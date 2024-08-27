const fs = require("fs")

// Reading file synchronously
// const readFile = fs.readFileSync("./files/input.txt", "utf-8")
// console.log(readFile);

// // Writing file synchronously
// // \n is used for new line
// const content = `Data read from input.txt: ${readFile}. \nDate created ${new Date()}`
// fs.writeFileSync("./files/output.txt", content)

// **********************************************************

// Reading and Writing file asynchronously
fs.readFile("./files/start.txt", "utf-8", (error, data) => {
    console.log(data);
    fs.readFile(`./files/${data}.txt`, "utf-8", (error1, data1) => {
        console.log(data1);
        fs.readFile('./files/append.txt', "utf-8", (error2, data2) => {
            console.log(data2);
            fs.writeFile("./files/output.txt", `${data1}\n\n${data2}\n\nDate Create ${new Date()}`, () => {
                console.log("File written successfully");
            })
        })
    })
})

console.log("Reading File....");

