const arr = [
    ["john", 20],
    ["kate", 22],
    ["ross", 21]
]

arr[0][2] = "london"
arr[1][2] = "boston"
arr[2][2] = "new york"

for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}

