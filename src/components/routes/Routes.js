import React, { Component } from "react";
import { Routes, Route } from 'react-router-dom';
import HomePage from "../../pages/Home-Page";
import LevelNav from "../../pages/LevelNavigationPage";
import SignupPage from '../../pages/account/SignupPage'
import LoginPage from '../../pages/account/LogInPage'
import App from '../../App'
import AppRoute from './AuthenticatedRoute'

export default class MyRoutes extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <Routes>
                <AppRoute path="" component={HomePage} isPrivate={true} />
                <AppRoute path="LevelNavigation/*" component={LevelNav} isPrivate={true} />
                <AppRoute path="Login" component={LoginPage} isPrivate={false} />
                <AppRoute path="Signup" component={SignupPage} isPrivate={false} />
            </Routes>
        )
    }
}
