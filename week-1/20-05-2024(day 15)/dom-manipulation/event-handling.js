const button = document.getElementById("button")
const list = document.getElementById("list")


const handleClick = () => {
    console.log("button clicked");

    button.removeEventListener("click", handleClick)
}

button.addEventListener("click", handleClick)

list.addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {
        console.log("list item clicked", event.target.textContent);
    }
})
