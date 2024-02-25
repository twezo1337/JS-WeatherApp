import { wheatherTemp, weatherHourTemp } from "./dynamicElements.js";
import { background } from "./dynamicElements.js";

export const resetUnits = (temperature) => {
    wheatherTemp.textContent = Math.round(temperature);
}
export const resetUnitsCard = (temperature) => {
    weatherHourTemp[0].textContent = Math.round(temperature);
}

export const celsiusToFahrenheit = (celsius) => {
    return celsius * 9 / 5 + 32;
}

export const FahrenheitToCelsius = (fahrenheit) => {
    return (fahrenheit - 32) * 5 / 9;
}

export const numberClockCorrector = (number) => {
    if (number >= 0 && number <= 9) {
        return "0" + number;
    }
    else {
        return number;
    }
}

export const parseStringTodate = (string, timezone) => {
    const date = new Date(string * 1000);
    date.setHours(date.getHours() + timezone / 3600);

    return date.toISOString();
}

export const months = () => {
    return [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
}

export const dateRegionParser = (stringDate, timezone) => {
    const date = new Date(stringDate * 1000);
    date.setHours(date.getHours() + timezone / 3600);

    return date;
}