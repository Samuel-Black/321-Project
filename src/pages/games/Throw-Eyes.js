import React, { useState, useEffect } from 'react'
import Character from '../../components/throweyes/Character'
import Target from '../../components/throweyes/Target'
import { returnRandomThrowEyesChar } from '../../components/images/Image-Functions'
import './Throw-Eyes.scss'
import 'reactjs-popup/dist/index.css';

export default function ThrowEyes(props) {
    
    const difficulty = props.difficulty
    const levels = props.numLevels

    const [character, setCharacter] = useState(setChar())
    const [errorMessage, setErrorMessage] = useState(null)
    
    const easyTargets = [false,true,false,true,false];
    const mediumTargets = [false,true,true,true,false];
    const hardTargets = [true,true,true,true,true];

    useEffect(() => {
        setChar()
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
        props.setFinishTime(new Date().getTime()) // When user clicks an option set the finish time
        
        if(targetID === character.id) {
            props.setLevelCompleted('True')
            props.setPopupState(true)
            props.setAttemptNumber(0)
            setCharacter(setChar())
        }
        else {
            setCharacter(setChar())
            props.setAttemptNumber(props.attemptNumber + 1)
            props.setPopupState(true)
        }
    }

    return (
        <>
        <div className="container-fluid">
        {difficulty <= levels &&
            <>
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
            </>
        }
            </div>
        </>
    )
}
