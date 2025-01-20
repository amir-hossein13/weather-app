const searchBox = document.querySelector('.search-box')
const city = document.querySelector('.city')
const dateElem = document.querySelector('.date')
const temp = document.querySelector('.temp')
const weather = document.querySelector('.weather')
const hiLow = document.querySelector('.hi-low')

let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

window.addEventListener('load',changeBG)

searchBox.addEventListener('keypress', (event) => {

    if (event.keyCode === 13) {
        getWeatherInfo()
        changeBG()
    }
})

function getWeatherInfo() {
    let inputWeather = searchBox.value
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputWeather}&appid=1d1a3c5959738d963688bddb53e1a0cf`)
        .then(res => res.json())
        .then(data => {
            console.log(data);

            putElem(data)
        })
}

function putElem(data){
    city.innerHTML = data.name
    let now = new Date();
    let day = days[now.getDay()];
    let month = months[now.getMonth()];
    let date = now.getDate();
    let year = now.getFullYear();
    dateElem.innerHTML = `${day}, ${date} ${month} ${year}`;
    temp.innerHTML = `${Math.floor(290 - data.main.temp)}°c`
    weather.innerHTML = data.weather[0].main
    hiLow.innerHTML = `${Math.floor(290-data.main.temp_min)}°c/${Math.floor(290-data.main.temp_max)} °c`
}

function changeBG() {
    fetch(`https://picsum.photos/1920/1080/?blur`)
        .then(res => {
            document.body.style.backgroundImage = `url(${res.url})`;
        });
}
