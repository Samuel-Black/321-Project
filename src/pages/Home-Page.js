import './Home-Page.scss'
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';
import { TiUserAdd } from 'react-icons/ti';
import Settings from '../components/Settings'
import { useAuthPlayer, useAuthUser } from '../libs'
import Axios from 'axios'

export default function HomePage() {

    let currentPlayer = useAuthPlayer()
    const user = useAuthUser()
    const [playerList, setPlayerList] = useState([])
    const [createNewPlayer, setCreateNewPlayer] = useState(false)
    const [nickname, setNickname] = useState('')
    const [birthday, setBirthday] = useState('')

    const GetPlayers = () => {
        Axios.post('http://localhost:3001/api/getplayers', {
            UserName: user.attributes.sub
        }).then((response) => {
            setPlayerList(response.data);
        })
    }

    const createPlayer = () => {
        Axios.post('http://localhost:3001/api/createplayer', {
            UserName: user.attributes.sub,
            nickname: nickname,
            birthday: birthday
        }).then((response) => {
            console.log(response)
            hideCreatePlayer()
        })
    }

    useEffect(() => {
        GetPlayers()
    }, [user])

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
                                    <div className="Player-Container card">
                                        <a onClick={() => currentPlayer.setPlayer(player.NickName)}>
                                            <img class="card-img-top" src="..." alt="Player Profile Picture" />
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
                                        <input id='birthday' className="form-control-lg" placeholder="birthday" onChange={(e) => setBirthday(e.target.value)} />
                                    </div>
                                </div>
                                <div className="d-flex justify-content-end">
                                   <button id="Login-Button" onClick={createPlayer}>Create</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                }
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
        