export const getWeatherData = async (city) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=834cd6f9c2b84522ccd4f8fed412f943&lang=en&units=metric`);

        return await response.json();
    } catch(error) {
        console.error();
    }
}

export const getWeatherForDaysData = async (city) => {
    try {
        
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=6&appid=834cd6f9c2b84522ccd4f8fed412f943&lang=en&units=metric`);

        return await response.json();
    } catch(error) {
        console.error();
    }
}