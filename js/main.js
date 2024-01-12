let btn = document.querySelector(".search-btn");
let inpt = document.querySelector(".search-input");
let dayWeather = document.querySelector("#day-weather");
let nextDay = document.querySelectorAll("#nextDay");

const nameOfDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wendesday",
  "Thursday",
  "Friday",
  "Saturday",
];

btn.addEventListener("click", function (e) {
  console.log(e.target);
});

inpt.addEventListener("blur", function (e) {
  console.log(e.target.value);
  getWeather(e.target.value);
});

async function getWeather(key) {
  // get Data
  let resp = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=e6de3c7ea2c1421f835175439240101&q=${key}&days=3`
  );
  let data = await resp.json();
  let d = new Date(data.location.localtime);

  // display first day
  dayWeather.innerHTML = ` <div class="forecast-header p-3 d-flex align-items-center justify-content-between">
  <p class="day">${nameOfDays[d.getDay()]}</p>
  <p>${d.getDay()}</p>
</div>
<div class="forecast-body p-3">
  <p class="location">${data.location.name}</p>
  <div class="degree">
      <div class="num me-4 d-inline-block">
          ${data.current.temp_c}<sub>o</sub>C
      </div>
      <div class="forecast-icon d-inline-block mb-2">
          <img src="${data.current.condition.icon}" width="90" alt="">
      </div>
  </div>
  <p class="custom mb-5">${data.current.condition.text}</p>
  <span class="me-2">
      <img src="./images/icon-umberella.png" alt="">
      20%
  </span>
  <span class="me-2">
      <img src="./images/icon-wind.png" alt="">
      ${data.current.wind_mph} mph
  </span>
  <span class="me-2">
      <img src="./images/icon-compass.png" alt="">
      ${data.current.wind_dir}
  </span>
</div>`;

  // display next days
  // console.log("allIn", data);
  for (let i = 0; i <= nextDay.length; i++) {
    let d = new Date(data.forecast.forecastday[i + 1].date);

    nextDay[i].innerHTML = `
          <div class="forecast-header p-3">
            <p class="day text-center">${nameOfDays[d.getDay()]}</p>
          </div>
          <div class="forecast-body p-3 text-center">
            <div class="forecast-img text-center">
             <img src="${
               data.forecast.forecastday[i + 1].day.condition.icon
             }" width="48" alt="">
            </div>
            <div class="degree text-white">
            ${data.forecast.forecastday[i + 1].day.maxtemp_c}<sub>o</sub>C
            </div>
            <small>${
              data.forecast.forecastday[i + 1].day.mintemp_c
            } <sub>o</sub></small>
            <p class="custom"> ${
              data.forecast.forecastday[i + 1].day.condition.text
            }</p>
          </div>
    `;
  }
}

// set Default city to display weather
getWeather("egypt");

// get user location
// function getLocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(showPosition);
//   } else {
//     alert("! Ops sorry your browser did not support out site ");
//   }
// }

// getLocation();

// async function showPosition(position) {
//   let lan = position.coords.latitude;
//   let lon = position.coords.longitude;
//   console.log(" http://api.weatherapi.com/v1");
//   let url = ` http://api.weatherapi.com/v1&q=${lan},${lon}`;
//   console.log("url", url);
//   let wDimention = await fetch(url);
//   console.log(wDimention);
//   // let wDimenData = wDimention.json();
//   console.log(wDimenData);
//   console.log(lan, lon);
// }

//clock
function clock() {
  let now = new Date();

  let hourse = now.getHours();
  let minut = now.getMinutes();
  let second = now.getSeconds();
  document.querySelectorAll(".time").innerText = `${hourse}:${minut}:${second}`;

  let day = now.getDay();
  document.querySelectorAll(".day").innerText = `${nameOfDays[day]}`;
  setTimeout(clock, 1000);
}
clock();
// console.log(hourse);
