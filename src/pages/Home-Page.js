import './Home-Page.scss'
import React from "react";
import { Link } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';
import Routes from '../components/routes/Routes'

export default function HomePage() {

    return(
        <div className="App">
            <div class="container">
                <div id="Home-Title" class="row justify-content-md-center title">
                    <h1>JumpStart</h1>
                </div>
                <div id="Home-Button" class="row justify-content-md-center">
                    <Link to="/LevelNavigation">
                        <button type="button" class="btn btn-primary"><FaPlay size={125} /></button>
                    </Link>
                </div>
            </div>
        </div>
    );

}
        