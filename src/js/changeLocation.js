import { getWeatherData } from "./api.js";
import { resetWeatherContent } from "./resetWeatherContent.js";
import { getUserLocation } from "./geolocation.js";

const changeCityBtn = document.getElementById("change__city__btn");
const searchBtn = document.getElementById("search__btn");
const searchInput = document.getElementsByClassName("header__search")[0];
const selected = document.getElementsByClassName("header__city__selected")[0];
const noselected = document.getElementsByClassName("header__city__noselected")[0];
const errorBlock = document.getElementsByClassName("header__search__error")[0];
const myLocationBtn = document.getElementById("my_location_btn");

changeCityBtn.addEventListener('click', () => {
    noselected.classList.remove("hide");
    selected.classList.remove("show");
    selected.classList.add("hide");
    noselected.classList.add("show");
});

window.addEventListener('click', (e) => {
    if (e.target == noselected || e.target == changeCityBtn || e.target == searchInput || e.target == searchBtn) {
        return;
    } else {
        noselected.classList.remove("show");
        selected.classList.remove("hide");
        noselected.classList.add("hide");
        selected.classList.add("show");
    }
});

const showError = (message) => {
    errorBlock.classList.add("show");
    searchInput.classList.add("error");
    errorBlock.textContent = message;
}

searchBtn.addEventListener('click', async () => {
    if (!searchInput.value) {
        return;
    }

    try {
        const weather = await getWeatherData(searchInput.value);

        console.log(weather);
        if (weather.message) {
            showError(weather.message);
            return;
        }

        resetWeatherContent(weather.name, weather);
        searchInput.value = "";
        noselected.classList.remove("show");
        selected.classList.remove("hide");
        noselected.classList.add("hide");
        selected.classList.add("show");
        searchInput.classList.remove("error");
        errorBlock.classList.remove("show");
        
    } catch(error) {
        console.log(error);
    }
});




myLocationBtn.addEventListener("click", getUserLocation)