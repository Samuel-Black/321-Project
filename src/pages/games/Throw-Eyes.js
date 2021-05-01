import React, { useState, useEffect } from 'react'
import Character from '../../components/throweyes/Character'
import TargetTemplate from '../../components/throweyes/Target-Template'
import { returnRandomThrowEyesChar } from '../../components/images/Image-Functions'
import './Throw-Eyes.scss'
import 'reactjs-popup/dist/index.css';
import DeviceOrientation, { Orientation } from 'react-screen-orientation'
import { MdPhoneAndroid } from 'react-icons/md';

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
                <DeviceOrientation lockOrientation={'landscape'}>
                    <Orientation orientation='landscape' alwaysRender={false}>
                        {difficulty <= levels &&
                            <>
                                <Character image={character.default} />
                                {difficulty === 1 && 
                                <>
                                    <TargetTemplate targets={easyTargets} winCondition={winCondition} image={props.shuffledImages.target.default} targetID={character.id} />
                                </>
                                }
                                {difficulty === 2 &&
                                <>
                                    <TargetTemplate targets={mediumTargets} winCondition={winCondition} image={props.shuffledImages.target.default} targetID={character.id} />
                                </>
                                }
                                {difficulty === 3 &&
                                <>
                                    <TargetTemplate targets={hardTargets} winCondition={winCondition} image={props.shuffledImages.target.default} targetID={character.id} />
                                </>
                                }
                            </>
                        }
                    </Orientation>
                    <Orientation orientation='portrait' alwaysRender={false}>
                        <div className="container">
                            <div className="row justify-content-center">
                                Please rotate your device!
                            </div>
                            <div className="row justify-content-center">
                                <MdPhoneAndroid size={80} className="rotate-phone-icon" />
                            </div>
                        </div>
                    </Orientation>
                </DeviceOrientation>
            </div>
        </>
    )
}
