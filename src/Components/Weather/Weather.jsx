import style from './Weather.module.css'

import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Weather() {
  let [response, setResponse] = useState()
  //let [name, setName] = useState()
  let [provincia, setProvincia] = useState('Buenos+Aires')
  let [city, setCity] = useState({name: '25+de+Mayo', lat:'-35.527', lon:'-60.230'});
  let [provincias, setProvincias] = useState([])
  let [municipios, setMunicipios] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      
      try {
        //Se obtienen todas las provincias de Argentina
        let provs = await axios.get('https://apis.datos.gob.ar/georef/api/provincias')
        setProvincias(provs.data.provincias);

        //Se obtiene el id de la provincia deseada
        let prov = provincia.replaceAll('+', ' ')
        let provNameId= await axios.get(`https://apis.datos.gob.ar/georef/api/provincias?nombre=${prov}`)
        console.log('provNameAndId:')
        console.log(provNameId)
        let id = provNameId.data.provincias[0].id

        //Se obtienen todos los municipios de esa provincia
        let Municipios= await axios.get(`https://apis.datos.gob.ar/georef/api/municipios?provincia=${id}&campos=id,nombre,centroide&max=1000`)
        setMunicipios(Municipios.data.municipios)
        console.log('Municipios:')
        console.log(Municipios.data);

        //Se obtiene el clima del municipio deseado
        let cityClimate = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,precipitation&minutely_15=temperature_2m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto`);
        console.log('cityClimate:')
        console.log(cityClimate.data)
        setResponse(cityClimate.data);
        
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
    setCity({name: muni.nombre, lon: muni.centroide.lon, lat: muni.centroide.lat})
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

    municipios.sort(function (a, b) {
      if (a.nombre > b.nombre) {
        return 1;
      }
      if (a.nombre < b.nombre) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });



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

    var muni = municipios[0]

    provincias.sort(function (a, b) {
      if (a.nombre > b.nombre) {
        return 1;
      }
      if (a.nombre < b.nombre) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });

    let provinciasOrdered = provincias.map((provincia, index) => {

      if (provincia.nombre ==='Santa Cruz' || provincia.nombre === 'Santiago del Estero'){
        return 
      } else {
        let name=provincia.nombre.replaceAll(' ', '+')
        return (
          <option value={name} key={index}>
            {provincia.nombre}
          </option>
        )
      }
      })

    return (
      <div>
        <div>
          <h2>El clima de {muni.nombre.replaceAll('+', ' ')} es:</h2>
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
          <select onChange={setCiudad}>
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