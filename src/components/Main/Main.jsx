import React from "react";
import {Routes, Route} from 'react-router-dom';
import Home from '../Home';
import Details from '../Details';
import './Main.css';

const Main = () => {
  return <Routes>
          <Route path='/' element={<Home/>} exact/>
          <Route path='/product' element={<Details/>}/>
          </Routes>;
};

export default Main;
