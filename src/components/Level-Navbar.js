/*
Author: Samuel Black
https://github.com/Samuel-Black
*/

import React from 'react';
import { useLocation, Link } from "react-router-dom";
import { FaLongArrowAltRight } from 'react-icons/fa';
import { TiHome } from 'react-icons/ti';
import SimpleBar from 'simplebar-react';
import { useAuthPlayer } from '../libs';
import { ProfilePictureImages } from './images/Profile-Picture-Images';
import 'simplebar/dist/simplebar.min.css';

export default function LevelNavbar() {

    const currentPlayer = useAuthPlayer(); // get the current player
    const paths = useLocation().pathname.split('/'); // get paths for menu bar e.g. Home -> LevelNavigation -> Jump etc.

    return (
        <div className="container">

            {/* Header for the navigation menu containing the application title and the current user with their profile picture above the anvigation menu bar */}
            <div className="d-flex flex-wrap mb-3">
                <div className="mr-auto">
                    <h1 id="Level-Navigation-Title" className='mt-3'>KidFit</h1>
                </div>
                <div id="Current-Player" className="d-flex">
                    <div className='d-flex align-items-end mr-2'>
                        <img id='Profile-Picture-Navbar' src={ProfilePictureImages[currentPlayer.player.ProfilePicture].default} alt='Profile Picture' />
                    </div>
                    <div className='d-flex align-items-end'>
                        {currentPlayer.player.NickName}
                    </div>
                </div>
            </div>

            {/* Navigation menu containing Home SVG icon, Home -> LevelNavigation etc.*/}
            <div id="Level-Navbar" className="d-flex">
                <div className="container-fluid">
                    <SimpleBar style={{ width: '80vw' }} autoHide={false}>
                        <div className="d-inline-flex">
                            {paths.map((path, i) => {
                                return(
                                    <div key={'Path-' + i} className="d-flex">
                                        
                                        {/* If at the end of the loop, set the last navigation item to the name of the current path in the URL */}
                                        {i === paths.length - 1 ? // 
                                            <span className="d-flex ml-2 mt-2">
                                                {path}
                                            </span>
                                        :
                                            <>
                                                {/* If i == 0 first insert the home SVG icon */}
                                                {i === 0 && <TiHome size={25} className="d-flex ml-2 mt-2" />}

                                                    &nbsp;
                                                    {/* if path is empty, it's the home navigation link, else insert the navigation link e.g. LevelNavigation */}
                                                    <Link className="d-flex mr-1 ml-1 mt-2" to={`../../${path}`}>
                                                        {path === '' ? 'Home' : path}
                                                    </Link>
                                                    &nbsp;

                                                {/* finally append an arrow pointing right */}
                                                {<FaLongArrowAltRight size={25} className="mt-2" />}
                                            </>
                                        }
                                    </div>
                                )
                            })}
                        </div>
                    </SimpleBar>
                </div>
            </div>
            
        </div>
    );
}