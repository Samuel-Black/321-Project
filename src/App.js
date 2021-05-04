import './App.scss';
import React, { useEffect } from "react";
import HomePage from './pages/Home-Page';
import { setLevels } from './components/Level-List';

export default function App() {

  useEffect(() => {
    setLevels(); // set levels on component render
  }, [])

    return (
      <HomePage />
    )
}
