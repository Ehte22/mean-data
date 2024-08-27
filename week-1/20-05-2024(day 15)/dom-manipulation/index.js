
const title = document.getElementById("title")
const subTitle = document.querySelector("#sub-title")
const content = document.querySelectorAll("p")
const color = document.getElementsByClassName("color")
const title2 = document.getElementById("title2")

title.style.backgroundColor = "black"
title.style.color = "white"
title.style.padding = "5px 10px"

subTitle.style.color = "green"

content.forEach(element => {
    element.style.backgroundColor = "gainsboro"
    element.style.padding = "4px"
});

color[0].style.color = "blue"
color[1].innerHTML = `         
    <h3>Lorem ipsum dolor sit amet.</h3>
    <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate dignissimos quo laudantium vero
        deserunt, fugit, assumenda aut, suscipit voluptatem eligendi debitis. Quis, quam unde tempora maxime,
        magni reiciendis eligendi voluptate labore quae, distinctio perspiciatis? Delectus esse fuga suscipit
        facilis maxime a nemo, odit mollitia reiciendis autem quis voluptatem. Dolorem voluptates quo, obcaecati
        laudantium voluptate saepe illum velit officiis? Suscipit dolores, molestias, at fugiat quae eligendi
        expedita aperiam repellendus ullam perferendis blanditiis voluptates. Labore mollitia itaque sit autem
        accusamus non est?
    </p>
        `

title2.classList.add("bg-cadetblue", "text-white")
title2.classList.remove("text-white")
title2.classList.toggle("text-white")
title2.classList.contains("bg-cadetblue")

const addLanguage = language => {
    const li = document.createElement("li")
    li.innerHTML = `${language}`
    document.querySelector(".lang").appendChild(li)
}

addLanguage("python")
addLanguage("java")

const lastLang = document.querySelector("li:last-child")
lastLang.remove()