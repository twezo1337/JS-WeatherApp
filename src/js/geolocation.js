import { getWeatherData } from "./api.js";
import { resetWeatherContent } from "./resetWeatherContent.js";

export const getUserLocation = () => {
    const options = {
        enableHighAccuracy: true, 
        timeout: 5000, 
        maximumAge: 0 
    }

    const success = async (pos) => {
        const crd = pos.coords;

        const response = await fetch
        (
            `https://api.geoapify.com/v1/geocode/reverse?lat=${crd.latitude}&lon=${crd.longitude}&apiKey=fac7b989fe2f4c988912d591a62f9842`
        );

        const result = await response.json();

        const weather = await getWeatherData(result.features[0].properties.city);

        resetWeatherContent(weather.name, weather);
    }

    const error = (err) => {
        console.log(err.code + " " + err.message);
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
}