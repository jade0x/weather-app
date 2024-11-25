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

  descriptionElement.innerHTML = `Humidity: <strong> ${response.data.temperature.humidity}%</strong>, Wind: <strong>${speeds}m/s</strong>`;
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
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios
    .get(apiURL)
    .then((response) => {
      const lat = response.data.coordinates.latitude;
      const lon = response.data.coordinates.longitude;

      let weatherApiURL = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
      return axios.get(weatherApiURL);
    })
    .then(displayTemperature);
  getForecast(city);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "24f34fb24eae01907fa1460264toc5b2";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiURL).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
<div class="forecast-result">
              <div class="forecast-date">${formatDay(day.time)}</div>
              <div class="forecast-icon"><img src="${
                day.condition.icon_url
              }"></div>
              <div class="temperature-group">
                <div class="high-temp"><strong>${Math.round(
                  day.temperature.maximum
                )}°</strong></div>
                <div class="low-temp">${Math.round(
                  day.temperature.minimum
                )}°</div>
              </div>
            </div>
`;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let search = document.querySelector("form");
search.addEventListener("submit", searchCity);

// Placeholder Text Animation

const ph = "Enter a city...";
const searchBar = document.querySelector("#search-field");
let phCount = 0;

function randDelay(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function printLetter(string, el) {
  const arr = string.split("");
  const origString = string;
  const curPlace = el.placeholder;
  const placeholder = curPlace + arr[phCount];

  setTimeout(() => {
    el.placeholder = placeholder;
    phCount++;
    if (phCount < arr.length) {
      printLetter(origString, el);
    }
  }, randDelay(50, 90));
}

function placeholder() {
  searchBar.placeholder = "";
  printLetter(ph, searchBar);
}

placeholder();

// Changing the Colour Palette
