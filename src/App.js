import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Weather from './Components/Weather/Weather';
import Gotoweather from './Components/Gotoweather/Gotoweather';

function App() {

  let location = useLocation();
  
  return (
    <div className="App">
      <Routes>
        <Route path = '/' element = {<Gotoweather/>}></Route>
        <Route path='/Weather' element = {<Weather/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
