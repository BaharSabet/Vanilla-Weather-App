let apiKey = "9154daef331ecbea43e8a26eb1a85f04";
let unit = "metric";
let loc = "";
let celsius = document.querySelector("#celsius-link");
let fahrenheit = document.querySelector("#fahrenheit-link");
//let alaki = "tara";

let currentTime = new Date();
function formatTime(currentDate) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[currentDate.getDay()];
  let hour = currentDate.getHours();
  let minute = currentDate.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  //console.log(typeof minute);
  return `${day}, ${hour}:${minute}`;
}
let todayDay = document.querySelector(".current-time");
todayDay.innerHTML = formatTime(currentTime);

function formatDate(currentDate) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[currentDate.getMonth()];
  let date = currentDate.getDate();
  let year = currentDate.getFullYear();
  return `${month} ${date}, ${year}`;
}
let todayDate = document.querySelector(".today-date");
todayDate.innerHTML = formatDate(currentTime);

function showTemp(response) {
  let city = document.querySelector(".city");
  city.innerHTML = response.data.name.toUpperCase();
  let temperature = document.querySelector("#temp");
  let wind = document.querySelector("#wind-speed");
  let humidity = document.querySelector("#humidity");
  let temp = Math.round(response.data.main.temp);
  temperature.innerHTML = temp;
  let windSpeed = Math.round(response.data.wind.speed);
  wind.innerHTML = windSpeed;
  let mainHumidity = Math.round(response.data.main.humidity);
  humidity.innerHTML = mainHumidity;
  let windUnit = document.querySelector("#wind-unit");
  if (unit === "Imperial") {
    windUnit.innerHTML = "mph";
  } else {
    windUnit.innerHTML = "km/h";
  }
  let icon = document.querySelector("#weather-icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", `reponse.data.weather[0].condition`);
  console.log(response);
  console.log(response.data.dt);
  let timeStamp = response.data.dt * 1000;
  let date1 = new Date();
  console.log(Date(timeStamp));
  console.log(date1.toLocaleTimeString());
  console.log(date1.getTimezoneOffset(16200));
  return temp;
}

function showForcast(response) {
  let forecastIdx = -1;
  console.log(response);
  let futureTemp = document.querySelectorAll(".next-day-temp");
  let forecast = response.data.list[0];
  for (const [key] of Object.entries(futureTemp)) {
    forecastIdx += 8;
    forecast = response.data.list[forecastIdx];
    futureTemp[key].innerHTML = `${Math.round(
      forecast.main.temp_max
    )}°C  <img src="http://openweathermap.org/img/wn/${
      forecast.weather[0].icon
    }@2x.png" alt="" class="forecastIcon"/>`;
  }
}

function showCurrentTemp(loc, unit) {
  let url = `https://api.openweathermap.org/data/2.5/weather?${loc}&units=${unit}&appid=${apiKey}`;
  axios.get(url).then(showTemp);
  let forecastURL = `https://api.openweathermap.org/data/2.5/forecast?${loc}&units=metric&appid=${apiKey}`;
  axios.get(forecastURL).then(showForcast);
}

function readCity() {
  let searchedCity = document.querySelector("#searched-city");
  let enteredCity = searchedCity.value.trim();
  return enteredCity;
}
function showCity(event) {
  event.preventDefault();
  celsius.classList.add("visited");
  fahrenheit.classList.remove("visited");
  let enteredCity = readCity();
  if (enteredCity) {
    unit = "metric";
    loc = `q=${enteredCity}`;
    showCurrentTemp(loc, unit);
  } else {
    alert("Please enter a city.");
  }
}

let form = document.querySelector("#search-city");
form.addEventListener("submit", showCity);

function getPosition(position) {
  let lat = position.coords.latitude;
  //console.log(lat);
  let lon = position.coords.longitude;
  //console.log(lon);
  //alaki = "toot";
  unit = "metric";
  loc = `lat=${lat}&lon=${lon}`;
  showCurrentTemp(loc, unit);
  //console.log(position);
  //return posit;
}

function showCurrent(event) {
  event.preventDefault();
  celsius.classList.add("visited");
  fahrenheit.classList.remove("visited");
  navigator.geolocation.getCurrentPosition(getPosition);
  //console.log(position);
}

let current = document.querySelector(".current-button");
current.addEventListener("click", showCurrent);

celsius.addEventListener("click", function (event) {
  unit = "metric";
  celsius.classList.add("visited");
  fahrenheit.classList.remove("visited");
  //let newCity = readCity();
  showCurrentTemp(loc, unit);
});
fahrenheit.addEventListener("click", function (event) {
  unit = "Imperial";
  celsius.classList.remove("visited");
  fahrenheit.classList.add("visited");
  console.log(loc);
  //console.log(alaki);
  //let newCity = readCity();
  showCurrentTemp(loc, unit);
});

//console.log(alaki);

let comingDays = document.querySelectorAll(".next-day");
//console.log(comingDays[0]);
let dayCounter = currentTime.getDay();
let monthCounter = currentTime.getMonth() + 1;
let dateCounter = currentTime.getDate();
for (const [key] of Object.entries(comingDays)) {
  let futureDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  dayCounter = dayCounter + 1;
  if (dayCounter > 6) {
    dayCounter = 0;
  }
  dateCounter = dateCounter + 1;
  if (
    monthCounter === 1 ||
    monthCounter === 3 ||
    monthCounter === 5 ||
    monthCounter === 7 ||
    monthCounter === 8 ||
    monthCounter === 10 ||
    monthCounter === 12
  ) {
    if (dateCounter > 31) {
      dateCounter = 1;
      monthCounter = monthCounter + 1;
    }
  }

  if (
    monthCounter === 4 ||
    monthCounter === 6 ||
    monthCounter === 9 ||
    monthCounter === 11
  ) {
    if (dateCounter > 30) {
      dateCounter = 1;
      monthCounter = monthCounter + 1;
    }
  }

  if (monthCounter === 2) {
    if (dateCounter > 28) {
      dateCounter = 1;
      monthCounter = monthCounter + 1;
    }
  }

  let day = futureDays[dayCounter];
  let futureDay = comingDays[key];
  futureDay.innerHTML = `${day}, ${monthCounter}/${dateCounter}`;
}
