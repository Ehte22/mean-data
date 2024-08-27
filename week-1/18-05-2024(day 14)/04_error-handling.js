const test = () => {
    const inp = document.getElementById("inp").value
    const message = document.getElementById("message")
    message.innerHTML = ""

    try {
        if (inp == "") throw new ("input in empty")
        if (isNaN(inp)) throw new ("not a number")
        if (inp > 10) throw new ("too high")
        if (inp < 4) throw new ("too low")
    }
    catch (error) {

        return message.innerHTML = error
    }
    finally {
        document.getElementById("inp").value = ""
    }

}