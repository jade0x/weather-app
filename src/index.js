//SheCodes Weather API
let city = "Sydney"; //4. set here, interpolation for the url
let apiKey = "24f34fb24eae01907fa1460264toc5b2"; //5. set here, interpolation for the url
let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`; //1 . state api

//3 create function
function displayTemperature(response) {
  // 6. get elements and assign
  let temperatureElement = document.querySelector(".temperature-value");
  let temperature = Math.round(response.data.temperature.current);
  temperatureElement.innerHTML = temperature;

  let city = document.querySelector(".search-city");
  city.innerHTML = `${response.data.city}, ${response.data.country}`;

  let condition = document.querySelector("#current-description");
  let description = response.data.condition.description;
  let capitalizedDescription = description
    .split(` `) // split into array of words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // capitilize first letter
    .join(` `); //join back

  condition.innerHTML = `, ${capitalizedDescription}`;
}

axios.get(apiURL).then(displayTemperature); // 2. Call API

// Update City Name from Search Bar

function searchCity(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-field");
  let idCurrentCity = document.querySelector(".search-city");

  idCurrentCity.innerHTML = `${searchInput.value}`;

  // clear the search field
  searchInput.value = "";
  searchInput.focus(); // Put cursor back in search field
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
