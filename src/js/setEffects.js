import { skyEffect, rain } from "./dynamicElements.js";

const deleteSkyEffects = () => {
    skyEffect.classList.remove('Day__broken__clouds');
    skyEffect.classList.remove('Day__few__clouds');
    skyEffect.classList.remove('Day__overcast__clouds');
    skyEffect.classList.remove('Day__scattered__clouds');
    skyEffect.classList.remove('Day__mist');
    skyEffect.classList.remove('Night__broken__clouds');
    skyEffect.classList.remove('Night__few__clouds');
    skyEffect.classList.remove('Night__overcast__clouds');
    skyEffect.classList.remove('Night__scattered__clouds');
    skyEffect.classList.remove('Night__mist');
}
const setSkyEffects = (effect) => {
    if (skyEffect.classList.contains(effect)) {
        return;
    }
    else {
        deleteSkyEffects();
        skyEffect.classList.add(effect);
    }
}

const setRain = () => {
    if (rain.classList.contains('Rain')) {
        return;
    }
    else {
        rain.classList.add('Rain');
    }
}
const removeRain = () => {
    if (!rain.classList.contains('Rain')) {
        return;
    }
    else {
        rain.classList.remove('Rain');
    }
}


export const setBg = (clouds, rain, isNight, mist) => {
    if (rain) {
        setRain();
    }
    else {
        removeRain();
    }

    if (!isNight) {
        if (mist) {
            setSkyEffects('Day__mist');
        }
        else {
            if (clouds >= 0 && clouds < 11) {
                deleteSkyEffects();
            }
            else if (clouds >= 11 && clouds < 25) {
                setSkyEffects('Day__few__clouds');
            }
            else if (clouds >= 25 && clouds <= 50) {
                setSkyEffects('Day__scattered__clouds');
            }
            else if (clouds >= 51 && clouds <= 84) {
                setSkyEffects('Day__broken__clouds');
            }
            else {
                setSkyEffects('Day__overcast__clouds');
            }
        }
    }
    else {
        if (mist) {
            setSkyEffects('Night__mist');
        }
        else {
            if (clouds >= 0 && clouds < 11) {
                deleteSkyEffects();
            }
            else if (clouds >= 11 && clouds < 25) {
                setSkyEffects('Night__few__clouds');
            }
            else if (clouds >= 25 && clouds <= 50) {
                setSkyEffects('Night__scattered__clouds');
            }
            else if (clouds >= 51 && clouds <= 84) {
                setSkyEffects('Night__broken__clouds');
            }
            else {
                setSkyEffects('Night__overcast__clouds');
            }
        }
    }
}


export const setBgEffects = (weather, isNight) => {
    if (weather.weather[0].main == "Thunderstorm") {
        setBg(weather.clouds.all, true, isNight, false);
    }
    else if (weather.weather[0].main == "Drizzle") {
        setBg(weather.clouds.all, true, isNight, false);
    }
    else if (weather.weather[0].main == "Rain") {
        if (weather.weather[0].description == "light rain" || weather.weather[0].description == "moderate rain" || weather.weather[0].description == "heavy intensity rain"
        || weather.weather[0].description == "very heavy rain" || weather.weather[0].description == "extreme rain") {
            if (!isNight) {
                setBg(weather.clouds.all, true, isNight, false);
            }
            else {
                setBg(weather.clouds.all, true, isNight, false);
            }
            
        }
        else if (weather.weather[0].description == "freezing rain") {
            setBg(weather.clouds.all, true, isNight, false);
        }
        else {
            setBg(weather.clouds.all, true, isNight, false);
        }
    }
    else if (weather.weather[0].main == "Snow") {
        setBg(weather.clouds.all, true, isNight, false);
    }
    else if (weather.weather[0].main == "Mist" || weather.weather[0].main == "Smoke" || weather.weather[0].main == "Haze" || weather.weather[0].main == "Dust"
         || weather.weather[0].main == "Fog" || weather.weather[0].main == "Sand" || weather.weather[0].main == "Ash" || weather.weather[0].main == "Squall"
         || weather.weather[0].main == "Tornado") {
            setBg(weather.clouds.all, false, isNight, true);
    }
    else if (weather.weather[0].main == "Clear") {
        if (!isNight) {
            setBg(weather.clouds.all, false, isNight, false);
        }
        else {
            setBg(weather.clouds.all, false, isNight, false);
        }
        
    }
    else if (weather.weather[0].main == "Clouds") {
        if (weather.weather[0].description == "few clouds") {
            if (!isNight) {
                setBg(weather.clouds.all, false, isNight, false);
            }
            else {
                setBg(weather.clouds.all, false, isNight, false);
            } 
        } 
        else if (weather.weather[0].description == "scattered clouds") {
            setBg(weather.clouds.all, false, isNight, false);
        }
        else if (weather.weather[0].description == "broken clouds") {
            setBg(weather.clouds.all, false, isNight, false);
        }
        else if (weather.weather[0].description == "overcast clouds") {
            setBg(weather.clouds.all, false, isNight, false);
        }
    }
}