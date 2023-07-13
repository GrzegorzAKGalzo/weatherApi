let data = document.getElementById("today").getElementsByTagName("p")[0];
let today = new Date();
data.innerHTML = 
today.getDate() + '/' + (today.getMonth()+1) + '/'+today.getFullYear() +
' ' + today.getHours()+':'+today.getMinutes();
function toCelsius(a){
    return  Math.round((a - 273.15)*100)/100;
}
function getWeather(city = 'Szczecin') {
    let key= '7ded80d91f2b280ec979100cc8bbba94';
    let lat ='';
    let long='';


    const request = new XMLHttpRequest();
    request.open("GET", `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pl`, true);
    request.onload = (e) => {
        if (request.readyState === 4) {
          if (request.status === 200) {
            let data = JSON.parse(request.responseText);
            console.log(data);
                let temp = document.getElementById("today").getElementsByTagName("p")[1];
                let icon = document.getElementById("today").getElementsByTagName("p")[2];
                let desc = document.getElementById("today").getElementsByTagName("p")[3];

                temp.innerHTML = `${toCelsius(data['main']['temp'])}°C, odczuwalna ${toCelsius(data['main']['feels_like'])}°C`;
                icon.innerHTML = `
                <img src="http://openweathermap.org/img/wn/${data['weather'][0]['icon']}@2x.png">
                `;
                desc.innerHTML = data['weather'][0]['main'].toUpperCase();
          } else {
            console.error(request.statusText);
          }
        }
      };
      request.onerror = (e) => {
        console.error(request.statusText);
      };
      request.send(null);
}
async function getForecast(city= 'Szczecin'){
    let key= '7ded80d91f2b280ec979100cc8bbba94';
	const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&lang=pl`);
	const data = await response.json();
    console.log(data);
    for(let i =0; i< 40; i++){
        let box = document.createElement('div');
        box.classList.add('box');
        box.innerHTML=`
        <p>${toCelsius(data['list'][i]['main']['temp'])}°C</p>
        <p>Odczuwalna ${toCelsius(data['list'][i]['main']['feels_like'])}°C</p>
        <p> ${data['list'][i]['weather'][0]['main']}</p>
        `;
        document.getElementById('cont').appendChild(box);
    }
}

document.getElementById("btn").addEventListener('click', () => {
    let city = document.getElementById('inp').value;
    if(city != ""){
        getWeather(city);
        getForecast(city);
    } else{
        let input = document.getElementById('inp');
        input.style.backgroundColor = 'rgba(255,0,0, 0.5)';
        input.style.transform = "rotate(2deg)"
        setTimeout(() => {
            input.style.backgroundColor = null;
            input.style.transform = null;
        }, 200);
    }
    
});