function InputWeatherInfo(response) {
    let temperatureElement = document.querySelector("#temperature-value");
    temperatureElement.innerHTML = Math.round(response.data.temperature.current);
    let cityElement = document.querySelector("#weather-city");
    cityElement.innerHTML = response.data.city;
    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = response.data.condition.description;
    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    let windElement = document.querySelector("#wind");
    windElement.innerHTML = `${response.data.wind.speed}km/h`;
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    timeElement.innerHTML = formatDate(date);
    let iconElement = document.querySelector("#icon");
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="temperature-icon" />`;
}
function formatDate(date) {
    
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    let hours = date.getHours();
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"]
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`
}


function searchCity(city) {
    let apiKey = "6a0bdd39ae0b4e1fb1o468ea4e5dta26";
    let apiUrl =
        `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    axios.get(apiUrl).then(InputWeatherInfo)
}

function initiateSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  
    
    searchCity (searchInput.value)
}
let searchElement = document.querySelector("#search-form");
searchElement.addEventListener("submit", initiateSearch);
searchCity("Paris");