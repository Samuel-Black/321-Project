import React, { useState, useEffect } from 'react'
import { Skills } from '../components/Level-List'
import { Link } from 'react-router-dom'
import { useAuthPlayer, useAuthUser } from '../libs'
import Axios from 'axios'
import { GetTotalProgressURL } from '../components/Request-URL'
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import LevelNavbar from '../components/LevelNavbar'
import { LevelSelectTemplate, LevelSelectTemplateLocked } from '../components/Level-Select-Template'
import { getLocalPlayer } from '../components/localstorage/Local-Storage-Functions'
import './LevelNavigationPage.scss'

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
        if(user !== false) { // If using a logged in account, get progress from DB
            Axios.post(GetTotalProgressURL, {
                UserName: user.attributes.sub,
                NickName: currentPlayer.player.NickName
            }).then((response) => {
                setProgress(response.data);
            }).catch((error) => {
                setErrorMessage(error)
            })
        }
        else if(user === false) { // If not using an account and not logged in, get progress from local storage
            let localPlayer = getLocalPlayer(currentPlayer.player.NickName)
            let localPlayerProgress = localPlayer.Progress;
            let localProgress = []

            for(let skillKey in localPlayerProgress) {
                if(localPlayerProgress.hasOwnProperty(skillKey)) {
                    for(let gameKey in localPlayerProgress[skillKey]) {
                        let localLevelsCompleted = parseInt(localPlayerProgress[skillKey][gameKey])
                        localProgress.push({ 'SkillName': skillKey, 'LevelsCompleted': localLevelsCompleted })
                    }
                }
            }

            setProgress(localProgress)
        }
    }

    useEffect(() => {
        GetProgress()
    }, [])

    return (
        <div id="Level-Nav-Background">

            <LevelNavbar />

            <div className="container mt-5">
                <SimpleBar style={{ height: '60vh' }} autoHide={false}>
                    <div id="Level-Nav">
                        <div className= "d-flex flex-wrap justify-content-around">
                            {Skills.map((skill, i) => {
                                return (
                                    <div key={skill.name} className="d-flex">  
                                        {(skill.name === 'Catch' || skill.name === 'Underhand-Roll' || skill.name === 'Strike' || skill.name === 'Gallop') ? 
                                            
                                            <LevelSelectTemplateLocked completed={getSkillProgress(skill.name) >= skill.numLevels} skillID={skill.id} monster={skill.monster} levelName={skill.name} skillProgress={getSkillProgress(skill.name)} numLevels={skill.numLevels} />
                                        :
                                            <Link to={skill.to} >
                                                <LevelSelectTemplate completed={getSkillProgress(skill.name) >= skill.numLevels} skillID={skill.id} monster={skill.monster} levelName={skill.name} skillProgress={getSkillProgress(skill.name)} numLevels={skill.numLevels} />
                                            </Link>
                                        } 
                                    </div> 
                                );
                            })}
                        </div>
                    </div>
                </SimpleBar>
            </div>
        </div>
    );
}
