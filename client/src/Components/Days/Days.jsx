import style from './Days.module.css'

export default function Days ({maxPrecipitation, minTemp, maxTemp, num}) {

    let diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    let dia = new Date(num);

    return (
    <div className={style.day}>
        <p>{diasSemana[dia.getDay()]}</p>
        <hr style={{opacity: 0.7}}></hr>
        <p>Precipitaciones <hr style={{opacity: 0}}></hr> {maxPrecipitation} %</p>
        <hr style={{opacity: 0.7}}></hr>
        <p>Temperatura mínima <hr style={{opacity: 0}}></hr>{minTemp} °C</p>
        <hr style={{opacity: 0.7}}></hr>
        <p>Temperatura máxima <hr style={{opacity: 0}}></hr>{maxTemp} °C</p>
    </div>
  )
}

