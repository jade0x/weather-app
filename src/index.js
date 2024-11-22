//SheCodes Weather API

function displayTemperature(response) {
  let temperatureElement = document.querySelector(".temperature-value");
  let temperature = Math.round(response.data.temperature.current);
  temperatureElement.innerHTML = temperature;

  let cityElement = document.querySelector(".search-city");
  cityElement.innerHTML = `${response.data.city}, ${response.data.country}`;

  let condition = document.querySelector("#current-description");
  let description = response.data.condition.description;
  let capitalizedDescription = description
    .split(` `) // split into array of words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // capitilize first letter
    .join(` `); //join back

  condition.innerHTML = `, ${capitalizedDescription}`;
  let humidityElement = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind");
  let speeds = Math.round(response.data.wind.speed);

  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeed.innerHTML = `${speeds}m/s`;
}

function searchCity(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-field");
  let city = searchInput.value;

  // clear the search field
  searchInput.value = "";
  searchInput.focus(); // Put cursor back in search field

  let apiKey = "24f34fb24eae01907fa1460264toc5b2";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  axios.get(apiURL).then(displayTemperature);
}

let search = document.querySelector("form");
search.addEventListener("submit", searchCity);

// Update Date & Time

function displayDate() {
  let minutes = now.getMinutes();
  let hour = now.getHours();
  let today = now.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hour < 10) {
    hour = `0${hour}`;
  }

  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let dayName = days[today];
  return `${dayName} ${hour}:${minutes}`;
}

let currentDate = document.querySelector("#current-date");
let now = new Date();

currentDate.innerHTML = displayDate(now);
