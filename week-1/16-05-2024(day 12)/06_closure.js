const outerFn = () => {
    let userName = "john"
    return innerFn = () => {

        return {
            changeVal: (arg) => {
                userName = arg
                return userName
            }
        }
    }

}

const result = outerFn()
const res = result()
console.log(res.changeVal("kate"))


