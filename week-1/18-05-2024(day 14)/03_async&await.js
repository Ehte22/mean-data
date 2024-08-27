const Url = "https://jsonplaceholder.typicode.com/posts"

const newFn = () => {
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            const res = await fetch(Url)
            const result = await res.json()
            resolve(result)
        }, 3000);
    })
}

const parenFn = async () => {
    console.log("hello");
    console.log("hello 2");

    const data = await newFn()
    console.log(data);

    console.log("hello 3");
    console.log("hello 4");
}

parenFn()