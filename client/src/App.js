import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Weather from './Components/Weather/Weather';
import Gotoweather from './Components/Gotoweather/Gotoweather';

function App() {

  let location = useLocation();
  let [provincias, setProvincias] = useState([])

  useEffect(() => {
    const fetchProvinces = async () => {
      let {data} = await axios.get('http://localhost:3001/WeatherApp/province')
      setProvincias(data)

    }
    fetchProvinces();
  }, [])
  
  return (
    <div className="App">
      <Routes>
        <Route path = '/' element = {<Gotoweather/>}></Route>
        <Route path='/Weather' element = {<Weather provincias={provincias}/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
