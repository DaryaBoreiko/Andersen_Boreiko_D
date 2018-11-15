let city = document.querySelector('.city');
let weather = document.querySelector('.weather');
let temp = document.querySelector('.temp');
let wind = document.querySelector('.wind');
let cloud = document.querySelector('.cloud');
let coords = document.querySelector('.coords');
let description = document.querySelector('.description');
let image = document.querySelector('.image');
let button = document.querySelector('.button');
let cityInput = document.querySelector('.city-input');


function search() {
	getCity();
}

function getCity() {
	var cityName = cityInput.value;
	weatherCity(cityName);
}

function weatherCity(city) {
	let request = new XMLHttpRequest();
	let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=def1f3aa27892f05c5bc3dd1e69e4309`;	

	request.onreadystatechange = function() {
		let isRequestReady = request.readyState == 4 && request.status == 200;

		if(isRequestReady) {
			let res = request.responseText;
			let response = JSON.parse(res);
			change(response);
		}
	}
	request.open('GET', url);
	request.send();
}

function change(response) {
	city.innerHTML = response.name;
	weather.innerHTML = response.weather[0].main;
	temp.innerHTML = Math.round(response.main.temp - 273.15);
	cloud.innerHTML = response.clouds.all;
	wind.innerHTML = response.wind.speed;
	coords.innerHTML = '(' + response.coord.lon + '; ' + response.coord.lat + ')';
	description.innerHTML = response.description;
	image.src = 'http://openweathermap.org/img/w/' + response.weather[0].icon + '.png';
}
