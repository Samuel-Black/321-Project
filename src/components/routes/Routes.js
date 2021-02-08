import React, { Component } from "react";
import { Routes, Route } from 'react-router-dom';

import Home from "../../App";
import LevelNav from "../../pages/LevelNavigationPage";

export default class MyRoutes extends Component {
    render() {
        return (
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="LevelNavigation/*" element={<LevelNav />} />
            </Routes>
        )
    }
}
