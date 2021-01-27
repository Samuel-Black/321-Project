import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from "../../App";
import LevelNav from "../../pages/LevelNavigationPage";
import Game1 from "../../pages/Game1";
export default class MyRoutes extends Component {
    render() {
        return (
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="LevelNavigation/*" element={<LevelNav />}>
                    <Route path="Game1" element={<Game1 />} />
                </Route>
            </Routes>
        )
    }
}
