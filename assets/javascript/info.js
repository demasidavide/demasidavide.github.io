// Chiamata API per ottenere meteo reale
async function getMeteo() {
  try {
    const response = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=45.5628&longitude=8.0561&current=temperature_2m,weather_code&timezone=Europe/Rome",
    );
    const data = await response.json();

    const temp = Math.round(data.current.temperature_2m);
    const weatherCode = data.current.weather_code;

    // Aggiorna testo
    document.getElementById("meteoInfo").textContent =
      `Temperatura: ${temp}°C - ${getWeatherDescription(weatherCode)}`;


    // Cambia GIF in base al meteo
    document.getElementById("meteoGif").src = getWeatherGif(weatherCode);
  } catch (error) {
    console.error("Errore:", error);
    document.getElementById("meteoInfo").textContent = "Errore nel caricamento";
  }
}

// Descrizione meteo
function getWeatherDescription(code) {
  const descriptions = {
    0: "Sereno",
    1: "Poco nuvoloso",
    2: "Parzialmente nuvoloso",
    3: "Nuvoloso",
    45: "Nebbia",
    48: "Nebbia gelata",
    51: "Pioggerella leggera",
    53: "Pioggerella moderata",
    55: "Pioggerella intensa",
    61: "Pioggia leggera",
    63: "Pioggia moderata",
    65: "Pioggia intensa",
    71: "Neve leggera",
    73: "Neve moderata",
    75: "Neve intensa",
    80: "Rovesci leggeri",
    81: "Rovesci moderati",
    82: "Rovesci intensi",
    95: "Temporale",
  };
  return descriptions[code] || "Variabile";
}

// GIF in base al meteo
function getWeatherGif(code) {
  if (code === 0 || code === 1) return "/assets/gif/sunny.gif";
  if (code >= 2 && code <= 3) return "/assets/gif/cloudy.gif";
  if (code >= 45 && code <= 48) return "/assets/gif/fog.gif";
  if (code >= 51 && code <= 65) return "/assets/gif/rain.gif";
  if (code >= 71 && code <= 75) return "/assets/gif/snow.gif";
  if (code >= 80 && code <= 82) return "/assets/gif/storm.gif";
  if (code >= 95) return "/assets/gif/thunder.gif";
  return "/assets/gif/cloudy.gif";
}

// Avvia al caricamento
getMeteo();

//funzione per ricerca dati
const token = "1b7d1618ae4641ee62409a2b752408b5254d8d05";

function getAirQuality(location) {
  if (!token) {
    console.error("Token WAQI non impostato");
    return;
  }

  const url = `https://api.waqi.info/feed/${location}/?token=${token}`;

  fetch(url)
    .then((response) => {
     
      const ct = response.headers.get("content-type") || "";
      if (ct.includes("application/json")) return response.json();
      return response.text().then((text) => {
        
        try {
          return JSON.parse(text);
        } catch (e) {
          throw new Error("Risposta non JSON e non parsabile");
        }
      });
    })
    .then((data) => {
      if (!data) return;
      if (data.status !== "ok") {
        console.error("Errore WAQI, status:", data.status, data);
        return;
      }

      const aqi = data.data.aqi;

      // Aggiorna elementi in pagina
      const aqiResultEl = document.querySelector(".aqi-result");
      const aqiColorEl = document.querySelector(".aqi-color");
      if (aqiResultEl) aqiResultEl.textContent = `Valore:  ${aqi} `;

      let label = "";
      let color = "";
      if (aqi <= 50) {
        label = "Buono";
        color = "#2ecc71";
      } else if (aqi <= 100) {
        label = "Moderato";
        color = "#f1c40f";
      } else if (aqi <= 150) {
        label = "Insalubre per i gruppi sensibili";
        color = "#e67e22";
      } else if (aqi <= 200) {
        label = "Insalubre";
        color = "#e74c3c";
      } else if (aqi <= 300) {
        label = "Molto insalubre";
        color = "#8e44ad";
      } else {
        label = "Pericoloso";
        color = "#6c0a0a";
      }

      if (aqiColorEl) {
        aqiColorEl.textContent = label;
        aqiColorEl.style.backgroundColor = color;
        aqiColorEl.style.color = "#fff";
        aqiColorEl.style.padding = "3px 8px";
        aqiColorEl.style.borderRadius = "4px";
        aqiColorEl.style.display = "inline-block";
      }
    })
    .catch((error) => {
      console.error("errore fetch WAQI:", error);
      
    });
}
getAirQuality("Biella");
setInterval(() => getAirQuality("Biella"), 60000);
