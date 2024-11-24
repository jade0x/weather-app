//SheCodes Weather API

function displayTemperature(response) {
  let cityElement = document.querySelector(".search-city");
  cityElement.innerHTML = `${response.data.city}`;

  let temperatureElement = document.querySelector(".temperature-value");
  let temperature = Math.round(response.data.temperature.current);
  let tempUnit = document.querySelector(".temperature-unit");
  let unit = "°C";
  tempUnit.innerHTML = unit;
  temperatureElement.innerHTML = `${temperature}`;

  let currentDate = document.querySelector("#current-date");
  let date = new Date(response.data.time * 1000);
  currentDate.innerHTML = displayDate(date);

  let condition = document.querySelector("#current-description");
  let description = response.data.condition.description;
  let capitalizedDescription = description
    .split(` `) // split into array of words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // capitilize first letter
    .join(` `); //join back

  condition.innerHTML = `, ${capitalizedDescription}`;

  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img class="temperature-icon" src="${response.data.condition.icon_url}"/>`;

  let descriptionElement = document.querySelector("#current-description");
  let speeds = Math.round(response.data.wind.speed);

  descriptionElement.innerHTML = `Humidity: <strong> ${response.data.temperature.humidity}%<strong>, Wind: <strong>${speeds}m/s`;
}

// Update Date & Time
function displayDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, ${hours}:${minutes}`;
}

// Search Bar
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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
<div class="forecast-result">
              <div class="forecast-date">${day}</div>
              <div class="forecast-icon">⛅</div>
              <div class="temperature-group">
                <div class="high-temp"><strong>30°</strong></div>
                <div class="low-temp">14°</div>
              </div>
            </div>
`;
  });

  forecastElement.innerHTML = forecastHtml;
}

let search = document.querySelector("form");
search.addEventListener("submit", searchCity);
displayForecast();

// Changing the Colour Palette
