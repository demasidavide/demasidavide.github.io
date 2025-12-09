//https://api.open-meteo.com/v1/forecast?latitude=45.563&longitude=8.058&daily=weather_code&hourly=temperature_2m,weather_code
const url = "https://api.open-meteo.com/v1/forecast?latitude=45.563&longitude=8.058&daily=weather_code&hourly=temperature_2m,weather_code"
async function chiamata(){
    const response = await fetch(url)
    const data = await response.json();
    console.log(data)
    console.log("Dati giornalieri:", data.daily);
        
        console.log("Temp Min oggi:", data.daily,time);
}
chiamata()



