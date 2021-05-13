/*
Author: Samuel Black
https://github.com/Samuel-Black
*/

import React, { Component } from "react";
import { Routes } from 'react-router-dom';
import SkillNav from "../../pages/Level-Navigation-Index";
import RewardsPage from '../../pages/Rewards-Page';
import SignupPage from '../../pages/account/Signup-Page';
import LoginPage from '../../pages/account/Login-Page';
import App from '../../App';
import AppRoute from './Authenticated-Route';

export default class MyRoutes extends Component {
    
    // routes for the main navigation pages, Rewards page, Login page etc.
    render() {
        return (
            <Routes>
                <AppRoute path="/" component={App} isPrivate={true} requiresPlayer={false} />
                <AppRoute path="Rewards" component={RewardsPage} isPrivate={true} requiresPlayer={true} />
                <AppRoute path="LevelNavigation/*" component={SkillNav} isPrivate={true} requiresPlayer={true} />
                <AppRoute path="Login" component={LoginPage} isPrivate={false} requiresPlayer={false} />
                <AppRoute path="Signup" component={SignupPage} isPrivate={false} requiresPlayer={false} />
            </Routes>
        )
    }
}
