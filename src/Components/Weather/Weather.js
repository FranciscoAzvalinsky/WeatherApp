import style from './Weather.module.css'

import React, {useEffect, useState} from 'react'
import axios from 'axios'

export default function Weather () {
    let [response, setResponse] = useState({})

    useEffect(()=>{
      const fetchData = async () => {
        let res = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=-34.6131&longitude=-58.3772&current=temperature_2m,precipitation&minutely_15=temperature_2m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto`)
        console.log(res)
        setResponse(res.data);
     }
     fetchData();
     console.log('hola')
    },[])

    console.log(response);

    let maxTemp, minTemp;

    let maxTempArr=[]
    let minTempArr=[]
    let aux

    if (response){
      minTempArr=response.daily.temperature_2m_min
      maxTempArr=response.daily.temperature_2m_max
    }

    for (let i=0; i<maxTempArr.length; i++){
      for (let j = 0 ; j<maxTempArr.length-1; j++){
        if (maxTempArr[j] > maxTempArr[j+1]){
          aux = maxTempArr[j+1]
          maxTempArr[j+1] = maxTempArr[j]
          maxTempArr[j] = aux
        }
      }
    }

    for (let i=0; i<minTempArr.length; i++){
      for (let j = 0 ; j<minTempArr.length-1; j++){
        if (minTempArr[j] > minTempArr[j+1]){
          aux = minTempArr[j+1]
          minTempArr[j+1] = minTempArr[j]
          minTempArr[j] = aux
        }
      }
    }
    maxTemp = maxTempArr[maxTempArr.length-1]
    minTemp = minTempArr[0]

    let timezone = response.timezone.split('/')
    let place = timezone[timezone.length-1]
    place = place.replace('_', ' ')

    return (
        <div>
            <h2>El clima de {place} es:</h2>
            <p>Temperatura: {response.current.temperature_2m} {response.current_units.temperature_2m}</p>
            <p>Precipitaciones: {response.current.precipitation} {response.current_units.precipitation}</p>
            <p>Temperatura mínima: {minTemp} {response.daily_units.temperature_2m_min}</p>
            <p>Temperatura máxima: {maxTemp} {response.daily_units.temperature_2m_max}</p>
            <p>Amanecer: {response.daily.sunrise[0].slice(11)}</p>
            <p>Atardecer: {response.daily.sunset[0].slice(11)}</p>
        </div>
    )
}