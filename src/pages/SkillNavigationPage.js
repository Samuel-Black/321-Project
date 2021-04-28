import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { GetLevelProgressURL } from '../components/Request-URL'
import { useAuthPlayer, useAuthUser } from '../libs'
import LevelNavComponent from '../components/LevelNavComponent'
import { getLocalPlayer } from '../components/localstorage/Local-Storage-Functions'

export default function SkillNavigationPage(props) {

    const levelList = props.Levels;
    const currentPlayer = useAuthPlayer()
    const user = useAuthUser()

    const [progress, setProgress] = useState([])
    const [errorMessage, setErrorMessage] = useState(null)

    function getLevelProgress(GameName) {
        let total = 0
        for (let i = 0; i < progress.length; i++) {
            if (progress[i].GameName === GameName) {
                total += progress[i].LevelsCompleted
            }
        }
        return total
    }

    const GetLevelprogress = () => {
        if(user !== false) { // If using a logged in account, get progress from DB
            Axios.post(GetLevelProgressURL, {
                UserName: user.attributes.sub,
                NickName: currentPlayer.player.NickName,
                SkillName: props.SkillName
            }).then((response) => {
                setProgress(response.data);
            }).catch((error) => {
                setErrorMessage(error)
            })
        }
        else if(user === false) { // If not using an account and not logged in, get progress from local storage
            const localPlayer = getLocalPlayer(currentPlayer.player.NickName)
            const localPlayerProgress = localPlayer.Progress;
            let localProgress = []

            for(let skillKey in localPlayerProgress) {
                if(localPlayerProgress.hasOwnProperty(skillKey)) {
                    for(let gameKey in localPlayerProgress[skillKey]) {
                        const localLevelsCompleted = parseInt(localPlayerProgress[skillKey][gameKey])
                        localProgress.push({ 'GameName': gameKey, 'LevelsCompleted': localLevelsCompleted })
                    }
                }
            }

            setProgress(localProgress)
        }
    }

    useEffect(() => {
        GetLevelprogress()
    }, [])
    
    return(
        <LevelNavComponent Levels={levelList} getProgress={getLevelProgress} />
    )
}