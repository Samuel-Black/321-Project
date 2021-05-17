/*
Author: Samuel Black
https://github.com/Samuel-Black
*/

import './Home-Page.scss';
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';
import { GiLockedChest, GiOpenChest } from 'react-icons/gi';
import Settings from '../components/Settings';
import PlayerSignout from '../components/Player-Signout-Button';
import { useAuthPlayer, useAuthUser } from '../libs';
import Axios from 'axios';
import ProfileImageMenu from '../components/Profile-Image-Menu';
import FormatBirthday from '../components/Birthday-Format';
import CreatePlayerTemplate from '../components/Create-Player-Template';
import { GetPlayersURL, CreatePlayerURL } from '../components/Request-URL';
import { createLocalPlayer, setLocalPlayerList } from '../components/localstorage/Local-Storage-Functions';
import SimpleBar from 'simplebar-react';
import { TiUserAdd } from 'react-icons/ti';
import { ProfilePictureImages } from '../components/images/Profile-Picture-Images';
import { TiHome } from 'react-icons/ti';
import MathMultiplicationVerification from '../components/Math-Multiplication-Verification'
import ResponsiveSimpleBar from '../components/Responsive-SimpleBar';

export default function HomePage() {

    const currentPlayer = useAuthPlayer(); // player context
    const user = useAuthUser(); // authenticated user context

    // default display states
    const [playerList, setPlayerList] = useState([]); // list of available players (local or linked to account depending on if logged in)
    const [rewardsButtonHover, setRewardsButtonHover] = useState(false); // if rewards button is hovered, show jumping animation
    const [navigateLogin, setNavigateLogin] = useState(false);
  
    // create new players states
    const [nickname, setNickname] = useState('');
    const [birthday, setBirthday] = useState('');
    const [profileImage, setProfileImage] = useState(0);
    const [activeProfileImage, setActiveProfileImage] = useState(0); // display black border around currently selected monster for profile image
    const [createNewPlayer, setCreateNewPlayer] = useState(false); // true if user chooses to create new player
    const [newPlayerCreated, setNewPlayerCreated] = useState(false); // true after player has been created so the playerList state can be updated

    const [errorMessage, setErrorMessage] = useState(null); 

    useEffect(() => {
        setActiveProfileImage(profileImage);
    }, [profileImage]);

    // populate playerList to display available players
    const GetPlayers = () => {
        if(user !== false) { // If using a logged in account, query DB for players
            Axios.post(GetPlayersURL, {
                UserName: user.attributes.sub
            }).then((response) => {
                setPlayerList(response.data);
            }).catch((error) => {
                setErrorMessage(error);
            })
        }
        if (user === false) { // If not using an account and not logged in, use local storage if exists
            setLocalPlayerList(setPlayerList);
        }
    }

    // create a new player
    const createPlayer = () => {
        if(user !== false) { // If using a logged in account, store player in DB
            Axios.post(CreatePlayerURL, {
                UserName: user.attributes.sub,
                nickname: nickname,
                profileImage: profileImage,
                birthday: FormatBirthday(birthday.toString())
            }).then(() => {
                hideCreatePlayer();
            }).catch((error) => {
                setErrorMessage(error);
            })
        }
        else if(user === false) { // If not using an account and not logged in, store player in local storage
            const localProfileImage = profileImage;
            const localBirthDay = FormatBirthday(birthday.toString());
            createLocalPlayer(localProfileImage, localBirthDay, nickname);
        }
        setBirthday(null);
        setNewPlayerCreated(true);
    }

    // on component mount display available players
    useEffect(() => { 
        GetPlayers();
    }, []);

    // don't allow for a player nickname greater than 12 characters.
    useEffect(() => { 
        if(nickname.length > 12) {
            setNickname(nickname.substring(0,12));
        }
    }, [nickname]);


    // if a new player is created populate the new list then display the player list
    useEffect(() => { 
        if(newPlayerCreated === true) {
            GetPlayers();
            hideCreatePlayer();
            setNewPlayerCreated(false);
        }
    }, [newPlayerCreated]);

    // show create new player "page"
    function showCreatePlayer() {
        setCreateNewPlayer(true);
    }

    // hide create new player "page"
    function hideCreatePlayer() {
        setCreateNewPlayer(false);
    }

    // player nickname error checking
    function validateNickName() {
        if(typeof nickname == null) {
            return 'Please enter a Nickname';
        }
        else {
            if(nickname.length === 0) {
                return 'Please enter a Nickname';
            }
            else {
                for(const player of playerList) {
                    if(player.NickName === nickname) {
                        return 'That Nickname is already in use!';
                    }
                }
            }
        }
        return true;
    }



    // re-render component on resize to keep responsive
    const responsiveWrapper = () => {
        return(
            <ResponsiveSimpleBar>

                {/* display all available players */}
                {playerList.map(player => {
                    return (
                        <div key={player.NickName} className="Player-Container card mr-3">
                            <a onClick={() => currentPlayer.setPlayer(player)}>
                                <img className="card-img-top pl-2" src={ProfilePictureImages[player.ProfilePicture].default} alt="Player Profile Picture"/>
                                <div className="card-footer">{player.NickName}</div>
                            </a>
                        </div>
                    )
                })}

                {/* create new player option */}
                <div id="Create-Player" className="Player-Container card">
                    <a onClick={showCreatePlayer}>
                        <TiUserAdd size={150} className="card-img-top" />
                        <div className="card-footer">New Player</div>
                    </a>
                </div>

            </ResponsiveSimpleBar>
        );
    }

    return(
        <div className="App">
            {<MathMultiplicationVerification open={navigateLogin} setOpen={setNavigateLogin} />}
            <div className='row'>

                {/* if a user is currently logged in, and the user is not creating a new player, display a cog wheel settings icon in the top left of the screen */}
                {( (user !== false) && (!createNewPlayer) ) && <Settings />} 

                {/* if a player is currently selected, display a sign out icon in the top right of the screen */}
                {currentPlayer.player !== false && <PlayerSignout />}
            </div>
            
            {/* If a player is not currently selected and the user is in the create new player menu, display a home icon in the top left */}
            {(currentPlayer.player === false && createNewPlayer === true) &&
                <div className='d-flex align-self-start'>
                    <a onClick={() => setCreateNewPlayer(false)} id='Home-Nav-Button' className='pr-2 pl-2'>
                        <TiHome size={100} />
                    </a>
                </div>
            }

            {/* if no player is currently selected, display the below */}
            {currentPlayer.player === false ?
                <div className='d-flex align-items-center' style={{ minHeight: '75vh'}}>

                    {/* If not in the create new player menu display the below */}
                    {createNewPlayer === false ? 
                        <div className="container-fluid mt-5">

                            {/* If the current user is not using an authenticated and logged in account, notify them that they can do so */}
                            {user === false &&
                                <span id='Account-Creation-Prompt'>
                                    Keep your progress safe by creating an account&nbsp;
                                    <a onClick={() => setNavigateLogin(true)}>
                                        Click Here.
                                    </a>
                                    <br />
                                </span>
                            }

                            {/* else, allow the player to play locally without creating an account */}
                            <div className="container mb-5 mt-5">
                                <div className="row justify-content-center">
                                    <h2>Who's playing?</h2>
                                </div>
                            </div>
                            <div className="container-fluid mb-5">      
                                <div className="row justify-content-center">
                                    <SimpleBar style={{ maxWidth: '90vw', width: '85vw' }} autoHide={false}>
                                        <div className="container-fluid">
                                            {responsiveWrapper()}
                                        </div>
                                    </SimpleBar>
                                </div>
                            </div>
                        </div>

                    :   // If create new player is selected, display the below

                        <div id="Create-New-Player-Container" className="container-fluid">
                            <div className="row justify-content-center">
                                <h2>Create New Player</h2>
                            </div>
                            <div className="row justify-content-center">
                                <div id="Create-Player-Content" className="d-inline-flex flex-column align-items-center justify-content-center">
                                <ProfileImageMenu ProfileImageState={setProfileImage} ActiveProfileImage={activeProfileImage} />
                                
                                {/* if the user is authenticated, post the new player to the DBMS by wrapping in a form */}
                                {user !== false ? 
                                    <form id='Create-Player-Form' className="mt-3">
                                        {CreatePlayerTemplate(nickname, setNickname, validateNickName, setBirthday, birthday, createPlayer)}
                                    </form>
                                    
                                : // If the user Isn't authenticated don't wrap in a form, and save the player locally

                                    <>
                                        {CreatePlayerTemplate(nickname, setNickname, validateNickName, setBirthday, birthday, createPlayer)}
                                    </>
                                }
                                
                                    {errorMessage ? <p>{errorMessage}</p> : null}
                                </div>
                            </div>
                        </div>
                    }
                </div>

            : // If a current player is selected, display the home page with play and rewards page button

                <div className="container">
                    <div id="Home-Title" className="row justify-content-center title mt-3">
                        <h1>KidFit</h1>
                    </div>
                    <div id="Home-Button" className="row justify-content-center">
                        <div id="Home-Page-Button-Flex" className="d-flex justify-content-around flex-wrap">
                            <div className="d-flex justify-content-center">
                                <Link to="/Rewards">
                                    <button type="button" id="Rewards-Button" className="btn btn-primary" onMouseEnter={() => setRewardsButtonHover(true)} onMouseLeave={() => setRewardsButtonHover(false)} >Rewards! {rewardsButtonHover === true ? <GiOpenChest /> :<GiLockedChest />}</button>
                                </Link>
                            </div>
                            <div className="d-flex justify-content-center">
                                <Link to="/LevelNavigation">
                                    <button type="button" id="Play-Button" className="btn btn-primary">Play! <FaPlay /></button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );

}
        