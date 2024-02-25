export const setWeatherIcon = (weather, isNight) => {
    if (weather.weather[0].main == "Thunderstorm") {
        return "./src/img/thunderstorm.svg";
    }
    else if (weather.weather[0].main == "Drizzle") {
        return "./src/img/shower_rain.svg";
    }
    else if (weather.weather[0].main == "Rain") {
        if (weather.weather[0].description == "light rain" || weather.weather[0].description == "moderate rain" || weather.weather[0].description == "heavy intensity rain"
        || weather.weather[0].description == "very heavy rain" || weather.weather[0].description == "extreme rain") {
            if (!isNight) {
                return "./src/img/rain_d.svg";
            }
            else {
                return "./src/img/rain_n.svg";
            }
            
        }
        else if (weather.weather[0].description == "freezing rain") {
            return "./src/img/snow.svg";
        }
        else {
            return "./src/img/shower_rain.svg";
        }
    }
    else if (weather.weather[0].main == "Snow") {
        return "./src/img/snow.svg";
    }
    else if (weather.weather[0].main == "Mist" || weather.weather[0].main == "Smoke" || weather.weather[0].main == "Haze" || weather.weather[0].main == "Dust"
         || weather.weather[0].main == "Fog" || weather.weather[0].main == "Sand" || weather.weather[0].main == "Ash" || weather.weather[0].main == "Squall"
         || weather.weather[0].main == "Tornado") {
        return "./src/img/atmosphere.svg";
    }
    else if (weather.weather[0].main == "Clear") {
        if (!isNight) {
            return "./src/img/clear_sky_d.svg";
        }
        else {
            return "./src/img/clear_sky_n.svg";
        }
        
    }
    else if (weather.weather[0].main == "Clouds") {
        if (weather.weather[0].description == "few clouds") {
            if (!isNight) {
                return "./src/img/few_clouds_d.svg";
            }
            else {
                return "./src/img/few_clouds_n.svg";
            } 
        } 
        else if (weather.weather[0].description == "scattered clouds") {
            return "./src/img/scattered_clouds.svg";
        }
        else if (weather.weather[0].description == "broken clouds") {
            return "./src/img/broken_clouds.svg";
        }
        else if (weather.weather[0].description == "overcast clouds") {
            return "./src/img/broken_clouds.svg";
        }
    }
}