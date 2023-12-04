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

    getForecast(response.data.city);
}
function formatDate(date) {
    
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`
    }
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

function getForecast(city) {
    let apiKey = "6a0bdd39ae0b4e1fb1o468ea4e5dta26";
    let apiUrl =
        `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showForecast);
}

function showForecast(response) {
    

    let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let forecastHTML = "";

    days.forEach(function (day) {
         forecastHTML = forecastHTML + `<div class="forecast-day">
            <div class="forecast-date">${day}</div>
            <div class="forecast-icon">⛅</div>
            <div class="forecast-temperature">
              <div class="forecast-temperature"><strong>15°</strong></div>
              <div class="forecast-temperature">10°</div>
            </div>
          </div>
          `;

    });
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHTML;
 }  

let searchElement = document.querySelector("#search-form");
searchElement.addEventListener("submit", initiateSearch);
searchCity("Paris");

