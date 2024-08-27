const arr = [1, 2, -4, -3, 5]

const fn = (nums) => {
    return nums >= 0
}

const demo = (numbers, callback) => {
    const newArr = []
    for (const item of numbers) {
        if (callback(item)) {
            newArr.push(item)
        }

    }
    return newArr
}

const result = demo(arr, fn)
console.log(result)