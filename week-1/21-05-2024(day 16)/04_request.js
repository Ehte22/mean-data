const Url = "https://jsonplaceholder.typicode.com/posts"

const postUser = async (userData) => {
    try {
        const response = await fetch(Url, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(userData)
        })
        const result = response.json()
        return result
    } catch (error) {
        console.error(error);
    }
}

const getUsers = async () => {
    try {
        const response = await fetch(Url)
        if (!response.ok) {
            throw new Error("Network response was not ok" + response.statusText)
        }
        const result = response.json()
        return result
    } catch (error) {
        console.error(error);
    }
}

const mainFn = async () => {
    const userData = {
        title: "lorem ipsum",
        body: "lorem ipsum dolor sit amet",
        userId: 11
    }
    const data = await postUser(userData)
    console.log(data);

    const allUser = await getUsers()
    console.log(allUser);
}

mainFn()

