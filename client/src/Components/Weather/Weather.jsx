import style from './Weather.module.css'

import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Weather({provincias}) {
  let [response, setResponse] = useState()
  let [provincia, setProvincia] = useState('Buenos+Aires')
  let [name, setName] = useState('25+de+Mayo')
  let [city, setCity] = useState({lat:'-35.527', lon:'-60.230'});
  let [municipios, setMunicipios] = useState([]);

  useEffect(() => {
    const fetchClimateData = async () => {
      try {
        let cityClimate = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,precipitation&minutely_15=temperature_2m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto`);
        console.log('cityClimate:')
        console.log(cityClimate.data)
        setResponse(cityClimate.data);
      } catch (error) {
        console.error('Error en la solicitud:', error)
      }
    }
    fetchClimateData();
  }, [city])

  useEffect(() => {
    const fetchProvinceData = async () => {
      try {
        //Se obtiene el id de la provincia deseada
        let prov = provincia.replaceAll('+', ' ')
        let provNameId= await axios.get(`https://apis.datos.gob.ar/georef/api/provincias?nombre=${prov}`)
        let id = provNameId.data.provincias[0].id

        //Se obtienen todos los municipios de esa provincia
        var Municipios = await axios.get(`https://apis.datos.gob.ar/georef/api/municipios?provincia=${id}&campos=id,nombre,centroide&max=1000`)
        let sortedMunicipios = Municipios.data.municipios.sort(function (a, b) {
          if (a.nombre > b.nombre) {
            return 1;
          }
          if (a.nombre < b.nombre) {
            return -1;
          }
          return 0;
        })
        setMunicipios(sortedMunicipios)
        setName(sortedMunicipios[0].nombre)

        //Se obtiene el clima del municipio deseado
        let cityClimate = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${sortedMunicipios[0].centroide.lat}&longitude=${sortedMunicipios[0].centroide.lon}&current=temperature_2m,precipitation&minutely_15=temperature_2m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto`);
        console.log('cityClimate:')
        console.log(cityClimate.data)
        setResponse(cityClimate.data);
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    }
    fetchProvinceData();
  }, [provincia])

  const setCiudad = (e) => {
    const selectedOption = JSON.parse(e.target.value)
    const { name, lat, lon } = selectedOption;
    setCity({lat, lon });
    setName(name);
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

    let municipiosOrdered = municipios.map((municipio, index) => {
      
      let name=municipio.nombre.replaceAll(' ', '+')
      let lon = parseFloat(municipio.centroide.lon.toFixed(3));
      let lat = parseFloat(municipio.centroide.lat.toFixed(3));

      let value = JSON.stringify({
        name,
        lat,
        lon
      });

      return (
      <option value={value} key={index}>
        {municipio.nombre}
      </option>
    )})

    provincias.sort(function (a, b) {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    });

    let provinciasOrdered = provincias.map((provincia, index) => {

      if (provincia.name ==='Santa Cruz' || provincia.name === 'Santiago del Estero'){
        return 
      } else {
        let name=provincia.name.replaceAll(' ', '+')
        return (
          <option value={name} key={index}>
            {provincia.name}
          </option>
        )
      }
      })

    return (
      <div>
        <div>
          <h2>El clima de {name.replaceAll('+', ' ')} es:</h2>
          <p>Temperatura: {response.current.temperature_2m} {response.current_units.temperature_2m}</p>
          <p>Precipitaciones: {response.current.precipitation} {response.current_units.precipitation}</p>
          <p>Temperatura mínima: {minTemp} {response.daily_units.temperature_2m_min}</p>
          <p>Temperatura máxima: {maxTemp} {response.daily_units.temperature_2m_max}</p>
          <p>Amanecer: {response.daily.sunrise[0].slice(11)}</p>
          <p>Atardecer: {response.daily.sunset[0].slice(11)}</p>
        </div>
        <div>
          <p>Selecciona una provincia</p>
          <select onChange={setProvince}>
            {provinciasOrdered}
          </select>

          <p>Selecciona una localidad</p>
          <select onChange={setCiudad} defaultValue = {municipios[0].nombre}>
            {municipiosOrdered}
          </select>
        </div>
      </div>
    )
  }
  else {
    return <p>Loading...</p>
  }
}