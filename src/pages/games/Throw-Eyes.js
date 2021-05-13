/*
Author: Samuel Black
https://github.com/Samuel-Black
*/

import React, { useState, useEffect } from 'react';
import Character from '../../components/throweyes/Character';
import TargetTemplate from '../../components/throweyes/Target-Template';
import { returnRandomThrowEyesChar } from '../../components/images/Image-Functions';
import ValidateWinCondition from './Validate-Win-Condition';
import './Throw-Eyes.scss';
import 'reactjs-popup/dist/index.css';
import DeviceOrientation, { Orientation } from 'react-screen-orientation';
import { MdPhoneAndroid } from 'react-icons/md';

export default function ThrowEyes(props) {

    const [character, setCharacter] = useState(setChar()); // set the one current character that's looking at a particular target
    const [errorMessage, setErrorMessage] = useState(null);
    
    const easyTargets = [false,true,false,true,false]; // true is display a target in this position, false is display a gap
    const mediumTargets = [false,true,true,true,false]; // true is display a target in this position, false is display a gap
    const hardTargets = [true,true,true,true,true]; // true is display a target in this position, false is display a gap
    
    const difficulty = props.difficulty; // current difficulty/level
    const levels = props.numLevels; // total levels in the game

    // randomize images on difficulty change
    useEffect(() => {
        setChar();
    }, [difficulty]);

    // randomly select the eyeball position of a character based on the difficulty
    function setChar() {
        if(difficulty === 1) {
            return returnRandomThrowEyesChar(props.shuffledImages.easy); // if difficulty is 1, use the array with 2 images
        }
        else if (difficulty === 2) {
            return returnRandomThrowEyesChar(props.shuffledImages.medium); // if difficulty is 2, use the array with 3 images
        }
        else if (difficulty === 3) {
            return returnRandomThrowEyesChar(props.shuffledImages.hard); // if difficulty is 3, use the array with 5 images
        }
    }

    // check if level has been cleared
    function winCondition(targetID) {
        props.setFinishTime(new Date().getTime()); // When user clicks an option set the finish time
        
        const correctSelection = (targetID === character.id); // truth value of the win condition
        ValidateWinCondition(correctSelection, props.setLevelCompleted, props.setPopupState, props.setAttemptNumber, props.attemptNumber); // validate win condition
        setCharacter(setChar()); // randomize which target character is looking at
    }

    return (
        <>
            <div className="container-fluid">
                <DeviceOrientation lockOrientation={'landscape'}>

                    {/* If using a mobile device and in landscape mode, display the game */}
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

                    {/* If using a small mobile device and in portrait mode, display prompt to use the device in landscape mode */}
                    <Orientation orientation='portrait' alwaysRender={false}>
                        <div className="container">
                            <div className="row justify-content-center mt-5">
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
    );
}
