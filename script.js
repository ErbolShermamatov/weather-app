const apiKey = 'd87459ac543759892aa4a0e78418c854';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const weatherBlock = document.querySelector('.weather')
const weatherInput = document.getElementById('weather-input');
const weatherBtn = document.getElementById('weather-btn');
const weatherIcon = document.querySelector('.weather-icon');
const errorBlock = document.querySelector('.error');
const temperature = document.querySelector('.temp');
const city = document.querySelector('.city');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');

const checkWeather = async (cityName) => {
    try {
        const request = await fetch(apiUrl + cityName + `&appid=${apiKey}`);
        if (request.status === 404) {
            errorBlock.style.display = 'block';
            weatherBlock.style.display = 'none';
        }
        else {
            const data = await request.json();
            city.textContent = data.name;
            temperature.textContent = Math.round(data.main.temp); //округляем значение температуры
            humidity.textContent = data.main.humidity;
            wind.textContent = data.wind.speed;
            if (data.weather[0].main === 'Clouds') {
                weatherIcon.setAttribute('src', 'https://cdn-icons-png.flaticon.com/512/1163/1163624.png');
            } else if (data.weather[0].main === 'Clear') {
                weatherIcon.setAttribute('src', 'https://cdn-icons-png.flaticon.com/512/3222/3222800.png');
            } else if (data.weather[0].main === 'Rain') {
                weatherIcon.setAttribute('src', 'https://cdn-icons-png.flaticon.com/512/1163/1163657.png');
            }

            weatherBlock.style.display = 'block'; //показываем погоду
            errorBlock.style.display = 'none'; //скрываем ошибку
        }
    }
    catch (err) {
        console.log("Ошибка сети:", err);
    }
}

weatherBtn.addEventListener('click', () => {
    if(weatherInput.value === '') {
        alert('Введите название города!')
    }
    else {
        checkWeather(weatherInput.value); //Берем текст из инпута и отправляем в функцию
    }
})