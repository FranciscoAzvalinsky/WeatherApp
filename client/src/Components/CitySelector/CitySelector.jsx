import style from './CitySelector.module.css'

export default function CitySelector ({setProvince, provinciasOrdered, setCiudad, nombre, municipiosOrdered}) {
    return (
        <div className={style.item1}>
            <p>Selecciona una provincia</p>
            <select onChange={setProvince}>
              {provinciasOrdered}
            </select>
            <hr style={{opacity: 0}}></hr>
            <hr style={{opacity: 0}}></hr>
            <p>Selecciona una localidad</p>
            <select onChange={setCiudad} defaultValue={nombre}>
              {municipiosOrdered}
            </select>
        </div>
    )
    
}