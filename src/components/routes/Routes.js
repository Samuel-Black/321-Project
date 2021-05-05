import React, { Component } from "react";
import { Routes } from 'react-router-dom';
import LevelNav from "../../pages/LevelNavigationPage";
import RewardsPage from '../../pages/RewardsPage'
import SignupPage from '../../pages/account/SignUpPage';
import LoginPage from '../../pages/account/LogInPage';
import App from '../../App';
import AppRoute from './AuthenticatedRoute';

export default class MyRoutes extends Component {
    
    render() {
        return (
            <Routes>
                <AppRoute path="/" component={App} isPrivate={true} requiresPlayer={false} />
                <AppRoute path="Rewards/*" component={RewardsPage} isPrivate={true} requiresPlayer={true} />
                <AppRoute path="LevelNavigation/*" component={LevelNav} isPrivate={true} requiresPlayer={true} />
                <AppRoute path="Login" component={LoginPage} isPrivate={false} requiresPlayer={false} />
                <AppRoute path="Signup" component={SignupPage} isPrivate={false} requiresPlayer={false} />
            </Routes>
        )
    }
}
