import './Home-Page.scss'
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';
import { TiUserAdd } from 'react-icons/ti';
import Settings from '../components/Settings'
import PlayerSignout from '../components/Player-Signout'
import { useAuthPlayer, useAuthUser } from '../libs'
import Axios from 'axios'
import { ProfilePictureImages } from '../components/images/ProfilePictureImages'
import DatePicker from 'react-date-picker';
import ProfileImageMenu from '../components/Profile-Image-Menu'
import FormatBirthday from '../components/Birthday-Format'
import { GetPlayersURL, CreatePlayerURL } from '../components/Request-URL'

export default function HomePage() {

    const currentPlayer = useAuthPlayer()
    const user = useAuthUser()
    const [playerList, setPlayerList] = useState([])
    const [createNewPlayer, setCreateNewPlayer] = useState(false)
    const [newPlayerCreated, setNewPlayerCreated] = useState(false)
    const [nickname, setNickname] = useState('')
    const [birthday, setBirthday] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [profileImage, setProfileImage] = useState(0)
    //const [activeProfileImage, setActiveProfileImage] = useState(0)

    const GetPlayers = () => {
        if(user !== false) { // If using a logged in account, query DB for players
            Axios.post(GetPlayersURL, {
                UserName: user.attributes.sub
            }).then((response) => {
                setPlayerList(response.data);
            }).catch((error) => {
                setErrorMessage(error)
            })
        }
        if (user === false) { // If not using an account and not logged in, use local storage if exists
            var localPlayers = []
            for(let i = 0; i < localStorage.length; i++) {
                var key = localStorage.key(i).split("-")
                console.log(key)
                if(key[1] == '34CUH8sLCXUZTA79X748') {
                    var temp = JSON.parse(localStorage.getItem(localStorage.key(i)))
                    localPlayers.push({ 'NickName': key[0], 'ProfilePicture': temp.ProfileImage })
                }
            }
            setPlayerList(localPlayers)
        }
    }

    //localStorage.clear();

    const createPlayer = () => {
        if(user !== false) { // If using a logged in account, store player in DB
            Axios.post(CreatePlayerURL, {
                UserName: user.attributes.sub,
                nickname: nickname,
                profileImage: profileImage,
                birthday: FormatBirthday(birthday.toString())
            }).then(() => {
                hideCreatePlayer()
            }).catch((error) => {
                setErrorMessage(error)
            })
        }
        else if(user === false) { // If not using an account and not logged in, store player in local storage
            const localProfileImage = profileImage
            const localBirthDay = FormatBirthday(birthday.toString())
            var blankData = {
                                'ProfileImage': localProfileImage,
                                'Birthday': localBirthDay,
                                'Progress': {
                                    'Balance': {
                                        'Balance-Eyes': 0,
                                        'Balance-Legs': 0,
                                        'Balance-Arms': 0
                                    },
                                    'Throw': {
                                        'Throw-Eyes': 0
                                    },
                                    'Kick': {
                                        'Kick-Eyes': 0,
                                        'Kick-Foot': 0
                                    },
                                    'Jump': {
                                        'Jump-Feet': 0,
                                        'Jump-Knees': 0,
                                        'Jump-Arms': 0
                                    },
                                    'Run': {
                                        'Run-Eyes': 0,
                                        'Run-Arms': 0,
                                        'Run-Knees': 0
                                    },
                                    'Hop': {
                                        'Hop-Eyes': 0,
                                        'Hop-Legs': 0,
                                        'Hop-Arms': 0
                                    },
                                    'Slide': {
                                        'Slide-Feet': 0,
                                        'Slide-Eyes': 0,
                                        'Slide-HipsShoulders': 0
                                    },
                                    'Leap': {
                                        'Leap-Eyes': 0,
                                        'Leap-Legs': 0
                                    }
                                }
                            };

            localStorage.setItem(nickname + '-34CUH8sLCXUZTA79X748', JSON.stringify(blankData)) // random string is used to ensure only our local storage is used
        }

        setNewPlayerCreated(true)
    }

    useEffect(() => { // on page load display available players
        GetPlayers()
    }, [])
    
    useEffect(() => { // if a new player is created populate the new list then display
        if(newPlayerCreated === true) {
            GetPlayers()
            hideCreatePlayer()
        }
    }, [newPlayerCreated])

    function showCreatePlayer() {
        setCreateNewPlayer(true)
    }

    function hideCreatePlayer() {
        setCreateNewPlayer(false)
    }

    return(
        <div className="App">
            <Settings />
            {currentPlayer.player === false ?
            <>
                {createNewPlayer === false ? 
                <div class="container">
                    <div class="row justify-content-md-center">
                        <div class="card-deck">
                            {playerList.map(player => {
                                return (
                                    <div key={player.NickName} className="Player-Container card">
                                        <a onClick={() => currentPlayer.setPlayer(player)}>
                                            <img class="card-img-top" src={ProfilePictureImages[player.ProfilePicture].default} alt="Player Profile Picture" />
                                            <div class="card-footer">{player.NickName}</div>
                                        </a>
                                    </div>
                                )
                            })}
                            <div id="Create-Player" className="Player-Container card">
                                <a onClick={showCreatePlayer}>
                                    <TiUserAdd size={150} className="card-img-top" />
                                    <div class="card-footer">New Player</div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className="container">
                    <div className="row justify-content-md-center">
                        <h2>Create New Player</h2>
                    </div>
                    <div className="row justify-content-md-center">
                        <div id="Login-Content" className="d-inline-flex flex-column align-items-center justify-content-center">
                        <ProfileImageMenu ProfileImageState={setProfileImage} />
                        
                        {user !== false ? // come back and fix later
                            <form className="mt-3">
                                <div className="d-flex">
                                    <label htmlFor="nickname" className="align-self-center">Nickname</label>
                                </div>
                                <div className="d-flex">
                                    <div className="form-group">
                                        <input type="text" id='nickname' className="form-control-lg" placeholder="nickname" onChange={(e) => setNickname(e.target.value)} />
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <label htmlFor="birthday" className="align-self-center">Birthday</label>
                                </div>
                                <div className="d-flex">
                                    <div className="form-group">
                                        <DatePicker
                                            onChange={setBirthday}
                                            value={birthday}
                                            maxDate={new Date()}
                                            minDetail={'decade'}
                                        />
                                    </div>
                                </div>
                                <div className="d-flex justify-content-end">
                                    {errorMessage ? <p>{errorMessage}</p> : null}
                                   <button id="Login-Button" onClick={createPlayer}>Create</button>
                                </div>
                            </form>
                            :
                            <>
                                <div className="d-flex">
                                    <label htmlFor="nickname" className="align-self-center">Nickname</label>
                                </div>
                                <div className="d-flex">
                                    <div className="form-group">
                                        <input type="text" id='nickname' className="form-control-lg" placeholder="nickname" onChange={(e) => setNickname(e.target.value)} />
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <label htmlFor="birthday" className="align-self-center">Birthday</label>
                                </div>
                                <div className="d-flex">
                                    <div className="form-group">
                                        <DatePicker
                                            onChange={setBirthday}
                                            value={birthday}
                                            maxDate={new Date()}
                                            minDetail={'decade'}
                                        />
                                    </div>
                                </div>
                                <div className="d-flex justify-content-end">
                                    {errorMessage ? <p>{errorMessage}</p> : null}
                                   <button id="Login-Button" onClick={createPlayer}>Create</button>
                                </div>
                            </>
                        }
                        </div>
                    </div>
                </div>
                }
            </>
            :
            <div className="container">
                <PlayerSignout />
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
        