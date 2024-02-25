import { celsiusToFahrenheit, resetUnitsCard } from "./helper.js";
import { FahrenheitToCelsius } from "./helper.js";
import { resetUnits } from "./helper.js";
import { wheatherTemp, celsiusBtn, fahrenheitBtn, weatherHourTemp} from "./dynamicElements.js";


celsiusBtn.addEventListener('click', () => {
    if (celsiusBtn.classList.contains("active")) {
        return
    }
    else {
        fahrenheitBtn.classList.remove("active");
        celsiusBtn.classList.add("active");

        resetUnits(FahrenheitToCelsius(wheatherTemp.textContent));
        resetUnitsCard(FahrenheitToCelsius(weatherHourTemp[0].textContent));
    } 
});

fahrenheitBtn.addEventListener('click', () => {
    if (fahrenheitBtn.classList.contains("active")) {
        return;
    }
    else {
        celsiusBtn.classList.remove("active");
        fahrenheitBtn.classList.add("active");

        resetUnits(celsiusToFahrenheit(wheatherTemp.textContent));
        resetUnitsCard(celsiusToFahrenheit(weatherHourTemp[0].textContent));
    }
});