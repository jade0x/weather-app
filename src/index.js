/* Update City Name from Search Bar*/

function searchCity(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-field");
  let idCurrentCity = document.querySelector(".search-city");

  idCurrentCity.innerHTML = `${searchInput.value}`;

  /* clear the search field */
  searchInput.value = "";
  searchInput.focus(); // Put cursor back in search field
}

let search = document.querySelector("form");
search.addEventListener("submit", searchCity);

/* Update Date & Time */

function displayDate() {
  let minutes = now.getMinutes();
  let hour = now.getHours();
  let today = now.getDay();

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
