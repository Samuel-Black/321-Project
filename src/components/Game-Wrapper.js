import React, { useState, useEffect } from 'react'
import { useAuthPlayer, useAuthUser } from '../libs'
import GamePopup from './Game-Popup'
import Axios from 'axios'
import { CreateAttemptURL } from './Request-URL'

export default function GameWrapper(props) {

    const [difficulty , setDifficulty] = useState(1)
    const [levelCompleted, setLevelCompleted] = useState('False')
    const [attemptNumber, setAttemptNumber] = useState(0)
    const [popupState, setPopupState] = useState(true)
    const [startTime, setStartTime] = useState(null)
    const [finishTime, setFinishTime] = useState(null)
    const [timeTaken, setTimeTaken] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    const currentPlayer = useAuthPlayer()
    const user = useAuthUser()

    const gameTitle = props.gameTitle;
    const levels = props.numLevels;

    const CreateAttempt = () => {
        Axios.post(CreateAttemptURL, {
            GameName: props.GameName,
            LevelNumber: difficulty,
            UserName: user.attributes.sub,
            NickName: currentPlayer.player.NickName,
            Succesful: levelCompleted,
            TimeTaken: timeTaken
        }).then((response) => {
            
        }).catch((error) => {
            setErrorMessage(error)
            console.log(error)
        })
    }   

    useEffect(() => {
        if(popupState === false) // If the game popupscreen is set to false (closed) start the "timer"
            setStartTime(new Date().getTime())
    }, [popupState])

    useEffect(() => { // Once the finishTime state is updated calculate the total time
        setTimeTaken(Math.round( ( ( (finishTime - startTime) / 1000) + Number.EPSILON) * 100) / 100 )
    }, [finishTime])
    
    useEffect(() => {
        if( (difficulty <= levels  && timeTaken !== null && timeTaken !== 0 ) ) { // Don't create attempt when all levels have been cleared or when timer is being initialized
            CreateAttempt()
            if(levelCompleted === 'True') { // If level was completed set it back to false for next level and increment the difficulty
                setDifficulty(difficulty + 1)
                setLevelCompleted('False')
            }
        }
    }, [timeTaken])

    return(
        <div className="game-background">
            {props.backButton}
            <GamePopup open={popupState} setOpen={setPopupState} gameTitle={gameTitle} levelsCleared={difficulty} numLevels={levels} levelPassed={attemptNumber < 1} />
                <props.Game setFinishTime={setFinishTime} difficulty={difficulty} setLevelCompleted={setLevelCompleted} setPopupState={setPopupState} setAttemptNumber={setAttemptNumber} {...props} />
        </div>
    )

}