import style from './Weather.module.css'

import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Weather() {
  let [response, setResponse] = useState()
  //let [name, setName] = useState()
  let [provincia, setProvincia] = useState('Santa+Fe')
  let [city, setCity] = useState({name: 'Santa+Fe', lat:'-31.655', lon:'-60.638'});

  let [provincias, setProvincias] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log('Fetching data')
      let prov = provincia.replace('+', ' ')
      try {
        let provNameId= await axios.get(`https://apis.datos.gob.ar/georef/api/provincias?nombre=${prov}`)
        console.log('provNameId:')
        console.log(provNameId)
        let id = provNameId.data.provincias[0].id
        let municipios= await axios.get(`https://apis.datos.gob.ar/georef/api/municipios?provincia=${id}&campos=id,nombre,centroide&max=1000`)
        setProvincias(municipios.data.municipios)
        console.log('municipios:')
        console.log(municipios);
        let cityName = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`)
        console.log('cityName:')
        console.log(cityName);
        let cityClimate = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,precipitation&minutely_15=temperature_2m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto`);
        console.log('cityClimate:')
        console.log(cityClimate.data)
        setResponse(cityClimate.data);
        //setName(cityName.data.results[0].name || city.name.replace('+', ' '))
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    }
    fetchData();

  }, [city, provincia])

  const setCiudad = (e) => {
    const selectedOption = JSON.parse(e.target.value)
    const { name, lat, lon } = selectedOption;
    setCity({ name, lat, lon });
  };

  const setProvince = (e) => {
    setProvincia(e.target.value)
  }

  let maxTemp, minTemp;

  let maxTempArr = []
  let minTempArr = []
  let aux

  if (response) {
    minTempArr = response.daily.temperature_2m_min
    maxTempArr = response.daily.temperature_2m_max

    for (let i = 0; i < maxTempArr.length; i++) {
      for (let j = 0; j < maxTempArr.length - 1; j++) {
        if (maxTempArr[j] > maxTempArr[j + 1]) {
          aux = maxTempArr[j + 1]
          maxTempArr[j + 1] = maxTempArr[j]
          maxTempArr[j] = aux
        }
      }
    }

    for (let i = 0; i < minTempArr.length; i++) {
      for (let j = 0; j < minTempArr.length - 1; j++) {
        if (minTempArr[j] > minTempArr[j + 1]) {
          aux = minTempArr[j + 1]
          minTempArr[j + 1] = minTempArr[j]
          minTempArr[j] = aux
        }
      }
    }
    maxTemp = maxTempArr[maxTempArr.length - 1]
    minTemp = minTempArr[0]

    let municipios = provincias.map((provincia, index) => {
      
      let name=provincia.nombre.replace(' ', '+')
      let lon = parseFloat(provincia.centroide.lon.toFixed(3));
      let lat = parseFloat(provincia.centroide.lat.toFixed(3));

      let value = JSON.stringify({
        name,
        lat,
        lon
      });

      return (
      <option value={value} key={index}>
        {provincia.nombre}
      </option>
    )})

    return (
      <div>
        <div>
          <h2>El clima de {city.name.replace('+', ' ')} es:</h2>
          <p>Temperatura: {response.current.temperature_2m} {response.current_units.temperature_2m}</p>
          <p>Precipitaciones: {response.current.precipitation} {response.current_units.precipitation}</p>
          <p>Temperatura mínima: {minTemp} {response.daily_units.temperature_2m_min}</p>
          <p>Temperatura máxima: {maxTemp} {response.daily_units.temperature_2m_max}</p>
          <p>Amanecer: {response.daily.sunrise[0].slice(11)}</p>
          <p>Atardecer: {response.daily.sunset[0].slice(11)}</p>
        </div>
        <div>
          <p>Selecciona una provincia</p>
          <select onChange={setProvince} defaultValue='Santa+Fe'>
            <option value='Buenos+Aires'>Buenos Aires</option>
            <option value='Cordoba'>Cordoba</option>
            <option value='Santa+Fe'>Santa Fe</option>
            <option value='Mendoza'>Mendoza</option>
          </select>

          <p>Selecciona una localidad</p>
          <select onChange={setCiudad}>
            {municipios}
          </select>
        </div>
      </div>
    )
  }
  else {
    return <p>Loading...</p>
  }
}