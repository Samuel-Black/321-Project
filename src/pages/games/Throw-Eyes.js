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
    const [errorMessage, setErrorMessage] = useState(null)
    const [attemptNumber, setAttemptNumber] = useState(0)
    const [popupState, setPopupState] = useState(true)
    const currentPlayer = useAuthPlayer()
    const user = useAuthUser()

    const gameTitle = 'Throw Eyes';
    const levels = 3;
    
    const easyTargets = [false,true,false,true,false];
    const mediumTargets = [false,true,true,true,false];
    const hardTargets = [true,true,true,true,true];

    const InsertLevel = () => {
        Axios.post('http://localhost:3001/api/insertlevel', {
            SkillName: props.SkillName,
            LevelNumber: difficulty,
            UserName: user.attributes.sub,
            NickName: currentPlayer.player.NickName
        }).then((response) => {
            
        }).catch((error) => {
            setErrorMessage(error)
        })
    }

    const IncrementAttempt = () => {
        Axios.post('http://localhost:3001/api/incrementattempt', {
            SkillName: props.SkillName,
            LevelNumber: difficulty,
            UserName: user.attributes.sub,
            NickName: currentPlayer.player.NickName
        }).then((response) => {
            
        }).catch((error) => {
            setErrorMessage(error)
        })
    }

    const LevelComplete = () => {
        Axios.post('http://localhost:3001/api/levelcomplete', {
            SkillName: props.SkillName,
            LevelNumber: difficulty,
            UserName: user.attributes.sub,
            NickName: currentPlayer.player.NickName
        }).then((response) => {
            
        }).catch((error) => {
            setErrorMessage(error)
        })
    }

    useEffect(() => {
        InsertLevel()
    }, [difficulty])

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
        if(targetID === character.id) {
            LevelComplete()
            setDifficulty(difficulty + 1);
            setCharacter(setChar())
            setAttemptNumber(0)
        }
        else {
            setCharacter(setChar())
            setAttemptNumber(attemptNumber + 1)
            IncrementAttempt()
        }
        setPopupState(true)
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

            {difficulty > levels &&
                <GamePopup open={true} open={true} gameTitle={gameTitle} levelsCleared={difficulty} numLevels={levels} levelPassed={true} />
            }

        </div>
    )
}
