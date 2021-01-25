import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import Home from "../../App";
import LevelNav from "../../pages/LevelNavigationPage";
import history from './history';

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/LevelNavigation" exact component={LevelNav} />
                </Switch>
            </Router>
        )
    }
}
