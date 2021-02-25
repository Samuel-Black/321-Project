import './Home-Page.scss'
import React from "react";
import { Link } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';
import Routes from '../components/routes/Routes'
import Settings from '../components/Settings'

export default function HomePage() {

    return(
        <div className="App">
            <Settings />
            <div className="container">
                <div id="Home-Title" class="row justify-content-md-center title">
                    <h1>JumpStart</h1>
                </div>
                <div id="Home-Button" className="row justify-content-md-center">
                    <Link to="/LevelNavigation">
                        <button type="button" className="btn btn-primary"><FaPlay size={125} /></button>
                    </Link>
                </div>
            </div>
        </div>
    );

}
        