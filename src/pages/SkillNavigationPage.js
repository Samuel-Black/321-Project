import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { GetLevelProgressURL } from '../components/Request-URL'
import { useAuthPlayer, useAuthUser } from '../libs'
import LevelNavComponent from '../components/LevelNavComponent'

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

    useEffect(() => {
        GetLevelprogress()
    }, [])
    
    return(
        <LevelNavComponent Levels={levelList} getProgress={getLevelProgress} />
    )
}