import { useState } from "react";

const api_key = 'ed95c3778a4f85eadb700d0a6b30eb5d';
const difKelvin = 273.15
const urlBase = 'http://api.openweathermap.org/data/2.5/weather';
export const Wheather = () => {
    const [ciudad, setCiudad] = useState('')
    const [dataClima, setDataClima] = useState(null)
    const handleCambioCiudad = (e)=>{
        setCiudad(e.target.value);
    }
    const onsubmit = (event) => {
        event.preventDefault();
        if(ciudad.length>0) fetchClima()
    }
    const fetchClima = async ()=>{
        try {
            const response = await fetch(`${urlBase}?q=${ciudad}&appid=${api_key}`)
            const data = await  response.json();
            console.log('data: ',data)
            setDataClima(data);
            
        } catch (error) {
            console.log('occurrio el siguiente problema: ',error )
        }
    }
    return (
        <>
            <div className="container">
                <h1>Aplicación de clima</h1>
                <form onSubmit={onsubmit}>
                    <input
                        type="text"
                        value={ciudad}
                        onChange={handleCambioCiudad}
                    />
                    <button>buscar</button>
                </form>
            </div>
            {
                dataClima&&(
                    <div>
                        <h2>{dataClima.name}</h2>
                        <p>temperatura: {parseInt(dataClima?.main?.temp - difKelvin)}ºC</p>
                        <p>Condición metereologica: {dataClima.weather[0].description}</p>
                        <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`}/>
                    </div>
                )
            }
        </>
    )
}
