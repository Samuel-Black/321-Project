import './Home-Page.scss';
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';
import { GiLockedChest, GiOpenChest } from 'react-icons/gi';
import Settings from '../components/Settings';
import PlayerSignout from '../components/Player-Signout';
import { useAuthPlayer, useAuthUser } from '../libs';
import Axios from 'axios';
import ProfileImageMenu from '../components/Profile-Image-Menu';
import FormatBirthday from '../components/Birthday-Format';
import CreatePlayerTemplate from '../components/Create-Player-Template';
import { GetPlayersURL, CreatePlayerURL } from '../components/Request-URL';
import { createLocalPlayer, setLocalPlayerList } from '../components/localstorage/Local-Storage-Functions';
import SimpleBar from 'simplebar-react';
import { TiUserAdd } from 'react-icons/ti';
import { ProfilePictureImages } from '../components/images/ProfilePictureImages';
import { TiHome } from 'react-icons/ti';

export default function HomePage() {

    const currentPlayer = useAuthPlayer();
    const user = useAuthUser();

    const [playerList, setPlayerList] = useState([]);
    const [createNewPlayer, setCreateNewPlayer] = useState(false);
    const [newPlayerCreated, setNewPlayerCreated] = useState(false);
    const [nickname, setNickname] = useState('');
    const [birthday, setBirthday] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [profileImage, setProfileImage] = useState(0);
    const [rewardsButtonHover, setRewardsButtonHover] = useState(false);
    const [activeProfileImage, setActiveProfileImage] = useState(0);

    useEffect(() => {
        setActiveProfileImage(profileImage);
    }, [profileImage])

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

        setNewPlayerCreated(true);
    }

    useEffect(() => { // on page load display available players
        GetPlayers();
    }, []);
    
    useEffect(() => { // if a new player is created populate the new list then display
        if(newPlayerCreated === true) {
            GetPlayers();
            hideCreatePlayer();
        }
    }, [newPlayerCreated]);

    function showCreatePlayer() {
        setCreateNewPlayer(true);
    }

    function hideCreatePlayer() {
        setCreateNewPlayer(false);
    }

    function validateNickName() {
        for(const player of playerList) {
            if(player.NickName === nickname) {
                return false;
            }
        }
        return true;
    }


    return(
        <div className="App">
            {user !== false && <Settings />}
            {currentPlayer.player === false ?
                <>
                    {createNewPlayer === false ? 
                        <div className="container-fluid">
                            <div className="container mb-5">
                                <div className="row justify-content-center">
                                        <h2>Who's playing?</h2>
                                    </div>
                            </div>
                            <div className="container-fluid mb-5">      
                                <div className="row justify-content-center">
                                    <SimpleBar style={{ maxWidth: '90vw', width: '85vw', maxHeight: '50vh' }} autoHide={false}>
                                        <div className="container">
                                            <div className='row'>
                                                <div className="d-flex">
                                                    {playerList.map(player => {
                                                        return (
                                                            <div key={player.NickName} className="Player-Container card mr-3">
                                                                <a onClick={() => currentPlayer.setPlayer(player)}>
                                                                    <img className="card-img-top" src={ProfilePictureImages[player.ProfilePicture].default} alt="Player Profile Picture" />
                                                                    <div className="card-footer">{player.NickName}</div>
                                                                </a>
                                                            </div>
                                                        )
                                                    })}
                                                    <div id="Create-Player" className="Player-Container card">
                                                        <a onClick={showCreatePlayer}>
                                                            <TiUserAdd size={150} className="card-img-top" />
                                                            <div className="card-footer">New Player</div>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SimpleBar>
                                </div>
                            </div>
                        </div>
                    :
                        <div className="container">
                            <a onClick={() => setCreateNewPlayer(false)} id='Home-Nav-Button'>
                                <TiHome size={100} />
                            </a>
                            <div className="row justify-content-center">
                                <h2>Create New Player</h2>
                            </div>
                            <div className="row justify-content-center">
                                <div id="Login-Content" className="d-inline-flex flex-column align-items-center justify-content-center">
                                <ProfileImageMenu ProfileImageState={setProfileImage} ActiveProfileImage={activeProfileImage} />
                                
                                {user !== false ? 
                                        <form className="mt-3">
                                            {CreatePlayerTemplate(setNickname, validateNickName, setBirthday, birthday, createPlayer)}
                                        </form>
                                    :
                                        <>
                                            {CreatePlayerTemplate(setNickname, validateNickName, setBirthday, birthday, createPlayer)}
                                        </>
                                }
                                
                                    {errorMessage ? <p>{errorMessage}</p> : null}
                                </div>
                            </div>
                        </div>
                    }
                </>
            :
                <div className="container">
                    <PlayerSignout />
                    <div id="Home-Title" className="row justify-content-center title">
                        <h1>JumpStart</h1>
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
        