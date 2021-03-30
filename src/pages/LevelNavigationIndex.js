import React, { useState, useEffect } from 'react'
import { Levels } from '../components/Level-List'
import { Link } from 'react-router-dom'
import { useAuthPlayer, useAuthUser } from '../libs'
import Axios from 'axios'
import { GetTotalProgressURL } from '../components/Request-URL'
import SimpleBar from 'simplebar-react';
import { RiUserFill } from 'react-icons/ri'
import { TiTick } from 'react-icons/ti'
import { BsArrowRightShort } from 'react-icons/bs'
import LevelNavbar from '../components/LevelNavbar'
import 'simplebar/dist/simplebar.min.css';

export default function LevelNavigationPage(props) {
    
    const currentPlayer = useAuthPlayer()
    const user = useAuthUser()

    const [progress, setProgress] = useState([])
    const [errorMessage, setErrorMessage] = useState(null)

    function getSkillProgress(SkillName) {
        let total = 0
        for (let i = 0; i < progress.length; i++) {
            if (progress[i].SkillName === SkillName) {
                total += progress[i].LevelsCompleted
            }
        }
        return total
    }

    const GetProgress = () => {
        Axios.post(GetTotalProgressURL, {
            UserName: user.attributes.sub,
            NickName: currentPlayer.player.NickName
        }).then((response) => {
            setProgress(response.data);
        }).catch((error) => {
            setErrorMessage(error)
        })
    }

    useEffect(() => {
        GetProgress()
    }, [])

    return (
        <div id="Level-Nav-Background">
            <div className="container">
                <div className="d-flex mb-3">
                    <div className="mr-auto">
                        <h1 id="Level-Navigation-Title">JumpStart</h1>
                    </div>
                    <div id="Current-Player" className="align-self-center">
                        <RiUserFill />{currentPlayer.player.NickName}
                    </div>
                </div>

                <LevelNavbar />
                
            </div>
            <div className="container mt-5">
                <SimpleBar style={{ height: '70vh' }} autoHide={false}>
                    <div id="Level-Nav">
                        {Levels.map((level,i) => {
                            return (    
                                <Link to={level.to} key={i}>
                                    <div className={`d-inline-flex justify-content-center align-items-center mr-4 mb-5 Game-Container ${getSkillProgress(level.name) >= level.numLevels ? 'green' : 'orange' }`}>
                                        <div className="nav-item" id={"Game-"+level.id}>
                                            <div className="d-flex justify-content-end">
                                                <div className="d-inline-flex nav-item-svg">
                                                    {getSkillProgress(level.name) >= level.numLevels ? <TiTick size={40} /> : <BsArrowRightShort size={40} /> }
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-center"><img src={level.monster} /></div>
                                            <div className="d-flex justify-content-center level-name">{level.name}</div>
                                            <div className="d-flex justify-content-center level-progress">{`${getSkillProgress(level.name)} of ${level.numLevels} completed`}</div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </SimpleBar>
            </div>
        </div>
    );
}
