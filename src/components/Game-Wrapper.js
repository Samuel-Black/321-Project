/*
Author: Samuel Black
https://github.com/Samuel-Black
*/

import React, { useState, useEffect } from 'react';
import { useAuthPlayer, useAuthUser } from '../libs';
import GamePopup from './Game-Popup';
import Axios from 'axios';
import { CreateAttemptURL, CreateLocalAttemptURL } from './Request-URL';
import { updateLocalProgress, getLocalPlayer } from './localstorage/Local-Storage-Functions';

export default function GameWrapper(props) {

    const currentPlayer = useAuthPlayer();
    const user = useAuthUser();

    const [difficulty , setDifficulty] = useState(1); // current difficulty/level for a game e.g. Kick-Legs, level 1
    const [levelCompleted, setLevelCompleted] = useState('False'); // False while level has not been succesfully completed, True otherwise
    const [attemptNumber, setAttemptNumber] = useState(0); // number of attempts in a current level
    const [popupState, setPopupState] = useState(true); // GamePopup, true = show, false = hide
    
    const [startTime, setStartTime] = useState(null); // store current time once user has start level
    const [finishTime, setFinishTime] = useState(null); // store current time once user has finished level
    const [timeTaken, setTimeTaken] = useState(null); // store calculated total time for a user to finish a level
    const [errorMessage, setErrorMessage] = useState(null);

    const gameTitle = props.GameName; // name of the game, e.g. Kick-Legs
    const levels = props.numLevels; // number of levels a game has, e.g. 3
    
    // insert level attempt into DBMS
    const CreateAttempt = () => {
        if(user !== false) { // If using a logged in account, store player in DB
            Axios.post(CreateAttemptURL, {
                GameName: props.GameName,
                LevelNumber: difficulty,
                UserName: user.attributes.sub,
                NickName: currentPlayer.player.NickName,
                Succesful: levelCompleted,
                TimeTaken: timeTaken
            }).then((response) => {
                
            }).catch((error) => {
                setErrorMessage(error);
                console.log(error);
            });
        }
        else if(user === false) { // If not using an account and not logged in, store player in local storage
            const localPlayer = getLocalPlayer(currentPlayer.player.NickName);
            const localPlayerBirthDay = localPlayer.Birthday;
            Axios.post(CreateLocalAttemptURL, {
                GameName: props.GameName,
                LevelNumber: difficulty,
                NickName: currentPlayer.player.NickName,
                BirthDay: localPlayerBirthDay,
                Succesful: levelCompleted,
                TimeTaken: timeTaken
            }).then((response) => {
                
            }).catch((error) => {
                setErrorMessage(error);
                console.log(error);
            })
        }
    }   

    useEffect(() => {
        if(popupState === false) // If the game popupscreen is set to false (closed) start the "timer"
            setStartTime(new Date().getTime());
    }, [popupState]);

    // Once the finishTime state is updated calculate the total time
    useEffect(() => { 
        setTimeTaken(Math.round( ( ( (finishTime - startTime) / 1000) + Number.EPSILON) * 100) / 100 );
    }, [finishTime]);
    
    // if timeTaken state is set and is not null or 0, an attempt in a level is finished
    useEffect(() => {
        if( (difficulty <= levels  && timeTaken !== null && timeTaken !== 0 ) ) { // Don't create attempt when all levels have been cleared or when timer is being initialized
            CreateAttempt();
            if(levelCompleted === 'True') { // If level was completed set it back to false for next level and increment the difficulty
                if(user === false) { // If no user is logged in, store progress in local storage
                    updateLocalProgress(currentPlayer.player.NickName, difficulty, props.SkillName, props.GameName);
                }
                setDifficulty(difficulty + 1); // increment difficulty/level
                setLevelCompleted('False');
            }
        }
    }, [timeTaken]);

    return (
        <div className="game-background">
            {props.backButton} {/* Back button in top left corner of all games */}

            {/* popup that shows at the start and after each level */}
            <GamePopup 
                open={popupState} 
                setOpen={setPopupState} 
                gameTitle={gameTitle} 
                levelsCleared={difficulty} 
                numLevels={levels} 
                levelPassed={attemptNumber < 1} 
                {...props}  
            />

            {/* game component */}
            <props.Game 
                setFinishTime={setFinishTime} 
                difficulty={difficulty} 
                setLevelCompleted={setLevelCompleted} 
                popupState={popupState} 
                setPopupState={setPopupState} 
                attemptNumber={attemptNumber} 
                setAttemptNumber={setAttemptNumber} 
                {...props} 
            />

        </div>
    );

}