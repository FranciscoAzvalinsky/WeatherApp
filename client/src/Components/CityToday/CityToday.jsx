import style from './CityToday.module.css'

export default function CityToday ({name, temp, precipitation, minTemp, maxTemp, sunrise, sunset, num}) {

    let diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    let dia = new Date(num);

    return (
        <div className={style.item2}>
            <h2>{name} | {diasSemana[dia.getDay()]} </h2>
            <div className={style.item2Text}>
                <p>Temperatura <hr style={{opacity: 0.7}}></hr> {temp} °C</p>
                <p>Precipitaciones <hr style={{opacity: 0.7}}></hr>{precipitation} mm</p>
                <p>Temperatura mínima <hr style={{opacity: 0.7}}></hr>{minTemp} °C</p>
                <p>Temperatura máxima <hr style={{opacity: 0.7}}></hr>{maxTemp} °C</p>
                <p>Amanecer <hr style={{opacity: 0.7}}></hr>{sunrise}</p>
                <p>Atardecer <hr style={{opacity: 0.7}}></hr>{sunset}</p>
            </div>
        </div>
    )
   
}