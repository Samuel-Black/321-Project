import './Home-Page.scss'
import React from "react";
import { Link } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';
import Settings from '../components/Settings'
import { useAuthPlayer } from '../libs'

export default function HomePage() {

    const player = useAuthPlayer()

    return(
        <div className="App">
            <Settings />
            {player === false ?
            <>
                No Player
            </>
            :
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
            }
        </div>
    );

}
        