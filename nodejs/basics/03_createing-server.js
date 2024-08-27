const http = require("http")
const fs = require("fs")
const url = require("url")
const events = require("events")

// CUSTOM MODULE
const replaceHtml = require("./modules/replaceHtml.js")

const html = fs.readFileSync("./templates/index.html", "utf-8")
const user = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"))
const usersList = fs.readFileSync("./templates/users-list.html", "utf-8")
const userDetails = fs.readFileSync("./templates/user-details.html", "utf-8")

// let usersHtmlArray = user.map(item => {
//     let output = usersList.replace(/{{%ID%}}/g, item.id);
//     output = output.replace("{{%TITLE%}}", item.title);
//     output = output.replace("{{%BODY%}}", item.body);

//     // both way working for query params
//     // Replace the href attribute value
//     // const anchorTag = output.match(/<a[^>]+href="[^"]+"/)[0];
//     // const newHref = anchorTag.replace(/{{%ID%}}/, item.id);
//     // output = output.replace(anchorTag, newHref);

//     return output;
// });

// const replaceHtml = (template, userData) => {
//     let output = template.replace(/{{%ID%}}/g, userData.id);
//     output = output.replace(/{{%TITLE%}}/g, userData.title);
//     output = output.replace(/{{%BODY%}}/g, userData.body);


//     return output

// }


// const server = http.createServer((req, res) => {
//     const { query, pathname: path } = url.parse(req.url, true)

//     // let path = req.url

//     if (path.toLocaleLowerCase() === "/" || path === "/home") {
//         // setting headers and status code
//         res.writeHead(200, {
//             "Content-Type": "text/html",
//             "my-header": "Hello World"
//         })
//         res.end(html.replace("{{%CONTENT%}}", "You are on home page"));
//     } else if (path === "/about") {
//         res.writeHead(200, {
//             "Content-Type": "text/html",
//             "my-header": "Hello World"
//         })
//         res.end(html.replace("{{%CONTENT%}}", "You are on about page"));
//     } else if (path === "/contact") {
//         res.writeHead(200, {
//             "Content-Type": "text/html",
//             "my-header": "Hello World"
//         })
//         res.end(html.replace("{{%CONTENT%}}", "You are on contact page"));
//     } else if (path === "/users") {
//         if (!query.id) {
//             let usersHtmlArray = user.map(item => {
//                 return replaceHtml(usersList, item)
//             })
//             let userResponseHtml = html.replace("{{%CONTENT%}}", usersHtmlArray.join(","))
//             res.writeHead(200, {
//                 "Content-Type": "text/html",
//                 "my-header": "Hello World"
//             })
//             res.end(userResponseHtml)
//         } else {

//             //  return a user based on id property
//             let use = user.find(item => item.id === +query.id)
//             let userDetailsHtml = replaceHtml(userDetails, use)
//             res.end(html.replace("{{%CONTENT%}}", userDetailsHtml))
//         }

//     } else {
//         res.writeHead(404, {
//             "Content-Type": "text/html",
//             "my-header": "Hello World"
//         })
//         res.end(html.replace("{{%CONTENT%}}", "Error 404: Page Not Found"))
//     }
// })

// SERVER INHERITS FORM EVENTEMITTER
// when ever new request hit to the server, server object is going to emit a request event
const server = http.createServer()

// on method is EventListner and callback function is EventHandler
server.on("request", (req, res) => {
    const { query, pathname: path } = url.parse(req.url, true)

    // let path = req.url

    if (path.toLocaleLowerCase() === "/" || path === "/home") {
        // setting headers and status code
        res.writeHead(200, {
            "Content-Type": "text/html",
            "my-header": "Hello World"
        })
        res.end(html.replace("{{%CONTENT%}}", "You are on home page"));
    } else if (path === "/about") {
        res.writeHead(200, {
            "Content-Type": "text/html",
            "my-header": "Hello World"
        })
        res.end(html.replace("{{%CONTENT%}}", "You are on about page"));
    } else if (path === "/contact") {
        res.writeHead(200, {
            "Content-Type": "text/html",
            "my-header": "Hello World"
        })
        res.end(html.replace("{{%CONTENT%}}", "You are on contact page"));
    } else if (path === "/users") {
        if (!query.id) {
            let usersHtmlArray = user.map(item => {
                return replaceHtml(usersList, item)
            })
            let userResponseHtml = html.replace("{{%CONTENT%}}", usersHtmlArray.join(","))
            res.writeHead(200, {
                "Content-Type": "text/html",
                "my-header": "Hello World"
            })
            res.end(userResponseHtml)
        } else {

            //  return a user based on id property
            let use = user.find(item => item.id === +query.id)
            let userDetailsHtml = replaceHtml(userDetails, use)
            res.end(html.replace("{{%CONTENT%}}", userDetailsHtml))
        }

    } else {
        res.writeHead(404, {
            "Content-Type": "text/html",
            "my-header": "Hello World"
        })
        res.end(html.replace("{{%CONTENT%}}", "Error 404: Page Not Found"))
    }
})

server.listen(5000, '127.0.0.1', () => {
    console.log("Server has started");
})

// ********************************************
// EMITTING AND HANDLING CUSTOM EVENTS

let myEmitter = new events.EventEmitter()

myEmitter.on("userCreated", (id, name) => {
    console.log(`A new user ${name} with ID ${id} is create`);
})
myEmitter.on("userCreated", (id, name) => {
    console.log(`A new user ${name} with ID ${id} added in database`);
})

myEmitter.emit("userCreated", 1, "John")
