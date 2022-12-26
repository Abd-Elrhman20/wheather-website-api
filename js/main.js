document.querySelector(".inp").addEventListener("keyup", function () {
    getApi(this.value)
})

var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var day_of_week = ["Sunday", "Monday", "Tuesday", "Wednesday ", "Thursday", "Friday", "Saturday"];
var x;
var numOfToday;
var numMonth;
var globalI;

var date = new Date();
var day1 = date.getDay()
var day2
var day3


async function getApi(name = "cairo") {
    x = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${name}&days=3`)
    x = await x.json()
    // console.log(x);      //Api is disabled right now so use api-key => 7d77b96c972b4d119a3151101212704

    // name-of-day
    if (day1 < 6) {
        day2 = day1 + 1
        if (day2 == 6) {
            day3 = 0
        }
        else {
            day3 = day2 + 1
        }

    }
    else {
        day1 = 0
        day2 = day1 + 1
        day3 = day2 + 1

    }
    // console.log(day_of_week[day1]);
    // console.log(day_of_week[day2]);
    // console.log(day_of_week[day3]);

    // num of day 
    numOfToday = x.current.last_updated.toString().slice(8, 10)

    // month name
    for (let i = 0; i < monthNames.length; i++) {
        if (i == date.getMonth()) {
            numMonth = date.getMonth()
            // console.log(monthNames[i]);
        }
    }
    displayWeather()
}


function displayWeather() {
    cartoona = `
            <div class="head">
                <p class="float-start">${day_of_week[day1]}</p>
                <p class="float-end">${numOfToday} ${monthNames[numMonth]}</p>
                <div class="clearfix"></div>
            </div>
            <div class="body py-5">
                <div>
                    <div class="location">${x.location.name}</div>
                    <div class="detail">
                        <div class="degree d-inline-block">${x.current.temp_c}<sup>o</sup>c</div>
                        <div class="icon d-inline-block ms-5">
                            <img class="mb-3" src=https:${x.current.condition.icon} alt="logo">
                        </div>
                    </div>
                    <div class="weather">${x.current.condition.text}</div>
                </div>
                <div class="ico mt-4">
                    <span class="me-3"><img src="img/icon-umberella@2x.png" alt="icon-umberella">${x.current.humidity}%</span>
                    <span class="mx-3"><img src="img/icon-wind@2x.png" alt="icon-wind">${x.current.wind_kph}km/h</span>
                    <span class="mx-3"><img src="img/icon-compass@2x.png" alt="icon-compass">${x.current.wind_dir}</span>
                </div>
            </div>
    `
    document.querySelector(".cartoona").innerHTML = cartoona;

    cartoona2 = `
                <div class="head">
                    <p class="text-center">${day_of_week[day2]}</p>
                </div>
                <div class="body py-5 text-center">
                    <div class="icon mb-3"><img src="https:${x.forecast.forecastday[1].day.condition.icon}" alt="icon"></div>
                    <div class="degree2 my-2">${x.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>c</div>
                    <div class="low-degree my-2">${x.forecast.forecastday[1].day.mintemp_c}<sup>o</sup>c</div>
                    <div class="weather2 my-2">${x.forecast.forecastday[1].day.condition.text}</div>
                </div>
    `
    document.querySelector(".cartoona2").innerHTML = cartoona2;


    cartoona3 = `
                <div class="head">
                    <p class="text-center">${day_of_week[day3]}</p>
                </div>
                <div class="body py-5 text-center">
                    <div class="icon mb-3"><img src="https:${x.forecast.forecastday[2].day.condition.icon}" alt="icon"></div>
                    <div class="degree3 my-2">${x.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>c</div>
                    <div class="low-degree2 my-2">${x.forecast.forecastday[2].day.mintemp_c}<sup>o</sup>c</div>
                    <div class="weather3 my-2"> ${x.forecast.forecastday[1].day.condition.text}</div>
                </div>
    `
    document.querySelector(".cartoona3").innerHTML = cartoona3;
}
getApi()