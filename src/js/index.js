import { getWeatherData } from "./api.js";
import { getWeatherForDaysData } from "./api.js";
import { headerCityName, wheatherTemp, wheatherDescription, windParam, 
       humidityParam, pressureParam, gustsOfWinds, cloudcoverParam, weatherHourTemp} from "./dynamicElements.js";

const app = async () => {
    const weather = await getWeatherData(JSON.parse(localStorage.getItem('city')) || "Moscow");

    const weatherForDays = await getWeatherForDaysData(JSON.parse(localStorage.getItem('city')) || "Moscow");

    headerCityName.textContent = weather.name;
    wheatherTemp.textContent = Math.round(weather.main.temp);
    weatherHourTemp[0].textContent = Math.round(weather.main.temp);
    wheatherDescription.textContent = weather.weather[0].description.charAt(0).toUpperCase() + weather.weather[0].description.slice(1);
    windParam.textContent = Math.round(weather.wind.speed) + " m/s";
    gustsOfWinds.textContent = Math.round(weather.wind.gust) + " m/s";
    humidityParam.textContent = weather.main.humidity + " %";
    pressureParam.textContent = weather.main.pressure + " mb";
    cloudcoverParam.textContent = weather.clouds.all + " %";
    console.log(weatherForDays);
    console.log(weather);
}

app();