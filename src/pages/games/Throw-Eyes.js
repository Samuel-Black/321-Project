import React, { useState, useEffect } from 'react'
import Character from '../../components/throweyes/Character'
import Target from '../../components/throweyes/Target'
import { returnRandomThrowEyesChar } from '../../components/images/Image-Functions'
import GamePopup from '../../components/Game-Popup'
import { useAuthPlayer, useAuthUser } from '../../libs'
import Axios from 'axios'
import './Throw-Eyes.scss'
import 'reactjs-popup/dist/index.css';

export default function ThrowEyes(props) {
    
    const [difficulty , setDifficulty] = useState(1)
    const [character, setCharacter] = useState(setChar)
    const [levelCompleted, setLevelCompleted] = useState('False')
    const [attemptNumber, setAttemptNumber] = useState(0)
    const [popupState, setPopupState] = useState(true)
    const [startTime, setStartTime] = useState(null)
    const [finishTime, setFinishTime] = useState(null)
    const [timeTaken, setTimeTaken] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    const currentPlayer = useAuthPlayer()
    const user = useAuthUser()

    const gameTitle = 'Throw Eyes';
    const levels = 3;
    
    const easyTargets = [false,true,false,true,false];
    const mediumTargets = [false,true,true,true,false];
    const hardTargets = [true,true,true,true,true];

    const CreateAttempt = () => {
        Axios.post('http://localhost:3001/api/createattempt', {
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
        if(popupState === false) 
            setStartTime(new Date().getTime())
    }, [popupState])

    useEffect(() => {
        setTimeTaken(Math.round( ( ( (finishTime - startTime) / 1000) + Number.EPSILON) * 100) / 100 )
    }, [finishTime])
    
    useEffect(() => {
        if( (difficulty <= levels  && timeTaken !== null && timeTaken !== 0 ) ) { // Don't create attempt when all levels have been cleared or when timer is being initialized
            CreateAttempt()
            if(levelCompleted === 'True') { // If level was completed set it back to false for next level
                setDifficulty(difficulty + 1)
                setLevelCompleted('False')
            }
        }
    }, [timeTaken])

    function setChar() {
        if(difficulty === 1) {
            return returnRandomThrowEyesChar(props.shuffledImages.easy)
        }
        else if (difficulty === 2) {
            return returnRandomThrowEyesChar(props.shuffledImages.medium)
        }
        else if (difficulty === 3) {
            return returnRandomThrowEyesChar(props.shuffledImages.hard)
        }
    }

    function winCondition(targetID) {
        setFinishTime(new Date().getTime())
        
        if(targetID === character.id) {
            setLevelCompleted('True')
            setPopupState(true)
            setAttemptNumber(0)
            setCharacter(setChar())
        }
        else {
            setCharacter(setChar())
            setAttemptNumber(attemptNumber + 1)
            setPopupState(true)
        }
    }

    return (
        <div className="game-background">
        {props.backButton}
        <GamePopup open={popupState} setOpen={setPopupState} gameTitle={gameTitle} levelsCleared={difficulty} numLevels={levels} levelPassed={attemptNumber < 1} />
        <div className="container-fluid">
            <Character image={character.default} />
            {difficulty === 1 && 
                <div className="row justify-content-center">
                    {easyTargets.map((target, i) => ( 
                    <div class="col-lg-2">
                        {target == true ?  <a onClick={() => winCondition(i+1)}> <Target image={props.shuffledImages.target.default} targetID={character.id} /> </a> : <span></span> }
                    </div>
                    ))}
                </div>
            }
            {difficulty === 2 &&
                <div className="row justify-content-center">
                    {mediumTargets.map((target, i) => ( 
                    <div class="col-lg-2">
                        {target == true ?  <a onClick={() => winCondition(i+1)}> <Target image={props.shuffledImages.target.default} targetID={character.id} /> </a> : <span></span> }
                    </div>
                    ))}
                </div>
            }
            {difficulty === 3 &&
                <div className="row justify-content-center">
                    {hardTargets.map((target, i) => ( 
                    <div class="col-lg-2">
                        {target == true ?  <a onClick={() => winCondition(i+1)}> <Target image={props.shuffledImages.target.default} targetID={character.id} /> </a> : <span></span> }
                    </div>
                    ))}
                </div>
            }
            </div>
        </div>
    )
}
