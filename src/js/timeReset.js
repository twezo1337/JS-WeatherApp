import { clockHours, clockMinutes, headerCityName, background, weatherParameters, 
    timeDescription, timeIcon, wheatherIcon, dateDay, dateMonth, weatherHourlyCards, 
    hourlyWeatherIcon, hourDateDay, hourDateMonth, hourWeatherHours, hourWeatherMinutes,
    weatherHourTemp, fahrenheitBtn, wheatherDescription, cardWind, cardPressure, cardGust, cardHumidity, cardClouds } from "./dynamicElements.js";
import { getWeatherData, getWeatherForDaysData} from "./api.js";
import { numberClockCorrector, parseStringTodate, months, celsiusToFahrenheit } from "./helper.js";
import { setWeatherIcon } from "./setWeatherIcon.js";
import { setBgEffects } from "./setEffects.js";

const dayThemeCards = () => {
    weatherHourlyCards.forEach(element => {
        element.classList.remove("night-theme-additional");
    });
    weatherHourlyCards.forEach(element => {
        element.classList.add("day-theme-additional");
    });
}
const nightThemeCards = () => {
    weatherHourlyCards.forEach(element => {
        element.classList.remove("day-theme-additional");
    });
    weatherHourlyCards.forEach(element => {
        element.classList.add("night-theme-additional");
    });
}

const setNightAppTheme = () => {
        if (background.classList.contains('night-theme-bg') && weatherParameters.classList.contains('night-theme-additional')) {
            return;
        }
        else {
            background.classList.remove('sunrise-theme-bg');
            background.classList.remove('sunset-theme-bg');
            background.classList.remove('day-theme-bg');
            weatherParameters.classList.remove('day-theme-additional');

            nightThemeCards();
            background.classList.add('night-theme-bg');
            weatherParameters.classList.add('night-theme-additional');
        }     
}
const setDayAppTheme = () => {
        if (background.classList.contains('day-theme-bg') && weatherParameters.classList.contains('day-theme-additional')) {
            return;
        }
        else {
            background.classList.remove('sunrise-theme-bg');
            background.classList.remove('sunset-theme-bg');
            background.classList.remove('night-theme-bg');
            weatherParameters.classList.remove('night-theme-additional');

            dayThemeCards();
            background.classList.add('day-theme-bg');
            weatherParameters.classList.add('day-theme-additional');
        } 
}
const setSunsetAppTheme = () => {
    if (background.classList.contains('sunset-theme-bg')) {
        return;
    }
    else {
        background.classList.remove('sunrise-theme-bg');
        background.classList.remove('day-theme-bg');
        background.classList.remove('night-theme-bg');
        background.classList.add('sunset-theme-bg');
    } 
}
const setSunriseAppTheme = () => {
    if (background.classList.contains('sunrise-theme-bg')) {
        return;
    }
    else {
        background.classList.remove('sunset-theme-bg');
        background.classList.remove('night-theme-bg');
        background.classList.remove('day-theme-bg');
        background.classList.add('sunrise-theme-bg');
    } 
}

const setClockDescription= (desc, iconSrc) => {
    if (timeDescription.textContent == desc && timeIcon.src == iconSrc) {
        return;
    }
    else {
        timeDescription.textContent = desc;
        timeIcon.src = iconSrc;
    }
}

const isNightHourlyWeather = (date) => {
    if (date.getUTCHours() >= 0 && date.getUTCHours() < 7) {
            return true;
    }
    else if (date.getUTCHours() >= 7 && date.getUTCHours() < 20) {
        return false;  
    }
    else {
        return true;
    }  
}

const setDataCards = (weather, timezone) => {
    for (let i = 1; i < weatherHourlyCards.length; i++) {
        const date = new Date(weather[i-1].dt * 1000);
            date.setHours(date.getHours() + timezone / 3600);

            hourDateDay[i].textContent = numberClockCorrector(date.getUTCDate());
            hourDateMonth[i].textContent = months()[date.getUTCMonth()];
            hourWeatherHours[i].textContent = numberClockCorrector(date.getUTCHours());
            hourWeatherMinutes[i].textContent = numberClockCorrector(date.getMinutes());
            cardWind[i - 1].textContent = Math.round(weather[i - 1].wind.speed) + " m/s";
            cardGust[i - 1].textContent = Math.round(weather[i - 1].wind.gust) + " m/s";
            cardHumidity[i - 1].textContent = weather[i - 1].main.humidity + " %";
            cardPressure[i - 1].textContent = weather[i - 1].main.pressure + " mb";
            cardClouds[i - 1].textContent = weather[i - 1].clouds.all + " %";

            if (fahrenheitBtn.classList.contains('active')) {
                weatherHourTemp[i].textContent = Math.round(celsiusToFahrenheit(weather[i - 1].main.temp));
            }
            else {
                weatherHourTemp[i].textContent = Math.round(weather[i - 1].main.temp);
            }
            hourlyWeatherIcon[i].src = setWeatherIcon(weather[i - 1], isNightHourlyWeather(date));
    }
}

window.onload = async function(){
    window.setInterval(async function(){
        try {
            const weather = await getWeatherData(headerCityName.textContent);
            const weatherForDays = await getWeatherForDaysData(headerCityName.textContent);

            const sunrise = parseStringTodate(weather.sys.sunrise, weather.timezone);
            const sunset = parseStringTodate(weather.sys.sunset, weather.timezone);
            let isNight;
            const date = new Date();
            const dateHoursPlus = new Date();
            const dateHoursMinus = new Date();

            date.setHours(date.getHours() + weather.timezone / 3600);
            dateHoursPlus.setHours(dateHoursPlus.getHours() + weather.timezone / 3600 + 1);
            dateHoursMinus.setHours(dateHoursMinus.getHours() + weather.timezone / 3600 - 1);

            dateDay.textContent = numberClockCorrector(date.getUTCDate());
            dateMonth.textContent = months()[date.getUTCMonth()];
            clockHours.textContent = numberClockCorrector(date.getUTCHours());
            clockMinutes.textContent = numberClockCorrector(date.getMinutes());

            wheatherDescription.textContent = weather.weather[0].description.charAt(0).toUpperCase() + weather.weather[0].description.slice(1);
            if (date.getUTCHours() >= 0 && date.toISOString() < sunrise) {
                if (dateHoursPlus.toISOString() > sunrise) {
                    setNightAppTheme();
                    setSunriseAppTheme();
                    isNight = false;
                    setClockDescription('Sunrise soon', './src/img/sunrise_soon.svg');
                    wheatherIcon.src = setWeatherIcon(weather, isNight);
                    hourlyWeatherIcon[0].src = setWeatherIcon(weather, isNight);
                    setDataCards(weatherForDays.list, weather.timezone);
                    setBgEffects(weather, isNight);
                }
                else {
                    setNightAppTheme();
                    isNight = true;
                    setClockDescription('Night', './src/img/night.svg');
                    wheatherIcon.src = setWeatherIcon(weather, isNight);
                    hourlyWeatherIcon[0].src = setWeatherIcon(weather, isNight);
                    setDataCards(weatherForDays.list, weather.timezone);
                    setBgEffects(weather, isNight);
                }
            }
            else if (date.toISOString() >= sunrise && date.getUTCHours() < "12") {
                if (dateHoursMinus.toISOString() <= sunrise) {
                    setNightAppTheme();
                    setSunriseAppTheme();
                    isNight = false;
                    setClockDescription('Sunrise', './src/img/sunrise_soon.svg');
                    wheatherIcon.src = setWeatherIcon(weather, isNight); 
                    hourlyWeatherIcon[0].src = setWeatherIcon(weather, isNight);
                    setDataCards(weatherForDays.list, weather.timezone);
                    setBgEffects(weather, isNight);
                }
                else {
                    setDayAppTheme();
                    isNight = false;
                    setClockDescription('Morning', './src/img/morning.svg');
                    wheatherIcon.src = setWeatherIcon(weather, isNight);
                    hourlyWeatherIcon[0].src = setWeatherIcon(weather, isNight);
                    setDataCards(weatherForDays.list, weather.timezone);
                    setBgEffects(weather, isNight);
                }
                
            }
            else if (date.getUTCHours() >= "12" && date.toISOString() < sunset) {
                if (dateHoursPlus.toISOString() > sunset) {
                    setDayAppTheme();
                    setSunsetAppTheme();
                    isNight = false;
                    setClockDescription('Sunset soon', './src/img/sunset_soon.svg');
                    wheatherIcon.src = setWeatherIcon(weather, isNight);
                    hourlyWeatherIcon[0].src = setWeatherIcon(weather, isNight);
                    setDataCards(weatherForDays.list, weather.timezone);
                    setBgEffects(weather, isNight);
                }
                else {
                    setDayAppTheme();
                    isNight = false;
                    setClockDescription('Day', './src/img/day.svg');
                    wheatherIcon.src = setWeatherIcon(weather, isNight);
                    hourlyWeatherIcon[0].src = setWeatherIcon(weather, isNight);
                    setDataCards(weatherForDays.list, weather.timezone);
                    setBgEffects(weather, isNight);
                }
                
            }
            else {
                if (dateHoursMinus.toISOString() <= sunset) {
                    setDayAppTheme();
                    setSunsetAppTheme();
                    isNight = true;
                    setClockDescription('Sunset', './src/img/sunset_soon.svg');
                    wheatherIcon.src = setWeatherIcon(weather, isNight);
                    hourlyWeatherIcon[0].src = setWeatherIcon(weather, isNight);
                    setDataCards(weatherForDays.list, weather.timezone);
                    setBgEffects(weather, isNight);
                }
                else {
                    setNightAppTheme();
                    isNight = true;
                    setClockDescription('Evening', './src/img/evening.svg');
                    wheatherIcon.src = setWeatherIcon(weather, isNight);
                    hourlyWeatherIcon[0].src = setWeatherIcon(weather, isNight);
                    setDataCards(weatherForDays.list, weather.timezone);
                    setBgEffects(weather, isNight);
                }  
            }  
        } catch(error) {
            console.log(error);
        }
        
    }, 1000);
};

