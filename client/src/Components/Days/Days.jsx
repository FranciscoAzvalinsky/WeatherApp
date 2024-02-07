import style from './Days.module.css'
import {Link} from 'react-router-dom'
import Swal from "sweetalert2";

export default function Days ({maxPrecipitation, minTemp, maxTemp, num, name, sunrise, sunset}) {

  const showPopUp = () => {
    Swal.fire({
      html: `
        <div className={style.item2}>
          <h2>${name} | ${diasSemana[dia.getDay()]} </h2>
          <div className={style.item2Text}>
            <p>Precipitaciones: ${maxPrecipitation} %</p>
            <hr style={{opacity: 0.7}}></hr>
            <p>Temperatura mínima: ${minTemp} °C</p>
            <hr style={{opacity: 0.7}}></hr>
            <p>Temperatura máxima: ${maxTemp} °C</p>
            <hr style={{opacity: 0.7}}>
            <p>Amanecer: ${sunrise}</p>
            <hr style={{opacity: 0.7}}></hr>
            <p>Atardecer: ${sunset}</p>
          </div>
        </div>`,
      //showCloseButton: true,
      focusConfirm: false,
      confirmButtonText: "Cerrar",
      confirmButtonColor: "#202020",
    })
  }

    let diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    let dia = new Date(num);

    return (
    <div className={style.day}>
      <p onClick={showPopUp} style={{cursor: 'pointer'}}>{diasSemana[dia.getDay()]}</p>
      <hr style={{opacity: 0.7}}></hr>
      <p>Precipitaciones <hr style={{opacity: 0}}></hr> {maxPrecipitation} %</p>
      <hr style={{opacity: 0.7}}></hr>
      <p>Temperatura mínima <hr style={{opacity: 0}}></hr>{minTemp} °C</p>
      <hr style={{opacity: 0.7}}></hr>
      <p>Temperatura máxima <hr style={{opacity: 0}}></hr>{maxTemp} °C</p>
    </div>
  )
}

