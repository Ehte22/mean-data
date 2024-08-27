const API_KEY = "3dea525bd734a6c4f89ab2fb9e025109"
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

const showData = () => {
    const rootData = document.getElementById("root")
    const CITY = document.getElementById("inp").value

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}`)
        .then(res => res.json())
        .then(data => rootData.innerHTML = `
        <h2>Weather in ${CITY} </h2>
        <p>tempreture: ${data.main.temp} </p>
        <p>name: ${data.name} </p>
        `)
        .catch(err => console.log(err))
}