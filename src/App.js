/*
Author: Samuel Black
https://github.com/Samuel-Black
*/

import React, { useEffect } from "react";
import HomePage from './pages/Home-Page';
import { setLevels } from './components/Level-List';
import './App.scss';

export default function App() {

  // set levels on component render for routes
  useEffect(() => {
    setLevels(); 
  }, [])

    return (
      <HomePage />
    )
}
