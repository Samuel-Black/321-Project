/*
Author: Samuel Black
https://github.com/Samuel-Black
*/

import React from 'react';
import Popup from 'reactjs-popup';
import './Game-Popup.scss';
import { BsStarFill, BsStar } from 'react-icons/bs';
import { TiHome } from 'react-icons/ti';
import { FaPlay } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import SimpleBar from 'simplebar-react';

// return number of stars and style them according to progress
function returnStars(props) {
    let stars = [];
    for(let i = 0; i < props.numLevels; i++) {
        if(i + 1 < props.levelsCleared) { // for cleared levels return the filled star to represent number of completed levels
            stars[i] = <BsStarFill />;
        }
        else if(i + 1 === props.levelsCleared) { // for current level give star activestar property to give hover effect
            stars[i] = <BsStarFill activestar=" activestar" />;
        }
        else { // for cleared levels return the filled star to represent number of completed levels
            stars[i] = <BsStar />;
        }
    }
    return stars;
}

export default function GamePopup(props) {

    const navigate = useNavigate();
    
    // return a string with the first letter converted to lower case
    function returnMinusFirstCap() { 
        var firstLetter = props.gameDescription.substr(0, 1);
        return firstLetter.toLowerCase() + props.gameDescription.substr(1);
    }

    // if the number of levels cleared by a player is greater than the number of levels for a game, the game has been completed
    function gameCompleted() {
        return props.levelsCleared > props.numLevels;
    }

    // if the number of levels cleared by a player is greater than the number of levels for a game, the game has been completed
    function getLevelInstructions() {
        if(props.gameType === 'Mix & Match') { // If game type is Mix & Match there are different sets of instructions, return the appropriate one
            if(props.levelsCleared >= 2)
                return props.gameInstructions[1];
            else
                return props.gameInstructions[0];
        }
        return props.gameInstructions;
    }

    return(
        <Popup open={props.open} closeOnDocumentClick={false} closeOnEscape={false} lockScroll={true} modal>
            {close => (
                <>
                    {props.levelPassed ? /* if the level was succesfully completed, display the below */
                        <div className="game-popup container">
                            <div className="header col-lg-12">
                                <h1 className="row justify-content-center">{props.gameTitle}</h1>
                            </div>
                            <div className="content col-lg-12">
                                <div className="row justify-content-center">
                                    {returnStars(props).map((star,i) =>
                                        <div key={i} className={star.props.activestar}>
                                            {star}
                                        </div>
                                    )}
                                </div>
                                {/* display the conditional below based on whether the entire game was succesfully completed */}
                                {gameCompleted() ? <h2 id="Level-Text" className="row justify-content-center">Great job, You did it!</h2> : <h2 id="Level-Text" className="row justify-content-center">Level {props.levelsCleared}</h2> }
                            </div>

                            {gameCompleted() ? /* if the game was succesfully completed, display the below */
                                <>
                                    <SimpleBar className="mt-1 mb-3" style={{ maxHeight: '25vh' }} autoHide={false}>
                                        <div id="Popup-Comment" className="d-flex justify-content-center">
                                            Now you're an expert on{props.gameSuccess}
                                        </div>
                                    </SimpleBar>
                                    <div className="d-flex justify-content-center mt-3 mb-2">
                                        <button onClick={() => { 
                                                navigate(-1);
                                            }} 
                                        className="button btn-secondary">
                                            Home <TiHome />
                                        </button>
                                    </div>
                                </>
                            : /* else if the level was succesfully completed by the game still has more levels, display the below */
                                <>
                                    <SimpleBar className="mt-1 mb-3" style={{ maxHeight: '25vh' }} autoHide={false}>
                                        <div id="Popup-Comment" className="d-flex justify-content-center">
                                            {props.levelsCleared > 1 && <> Great job! <br /> </> } {/* if the user has completed a level display the congratulatory message */}
                                            {props.levelsCleared <= 1 && <> {props.gameDescription} <br /> </>} {/* display game description on initial GamePopup to tell user correct form/action for motor skill */}
                                            {getLevelInstructions()} {/* get instructions for level based on current level and game type being Mix & Match */}
                                        </div>
                                    </SimpleBar>
                                    <div className="d-flex justify-content-center mb-2">
                                            <button onClick={() => { 
                                                close(); props.setOpen(false);
                                                }} 
                                            className="button btn-secondary">
                                                Play <FaPlay />
                                            </button>
                                    </div>
                                </>
                            }

                        </div>

                    :
                        /* if the level was not succesfully completed, display the below */
                        <div className="game-popup container">
                            <div className="header col-lg-12">
                                <h1 className="row justify-content-center">{props.gameTitle}</h1>
                            </div>
                            <div className="content col-lg-12">
                                <div className="row justify-content-center">
                                    {returnStars(props).map((star, i) =>
                                        <div key={i} className={star.props.activestar}>
                                            {star}
                                        </div>
                                    )}
                                </div>
                                <h2 id="Level-Text" className="row justify-content-center">Level {props.levelsCleared}</h2>
                            </div>

                            <SimpleBar className="mt-1 mb-3" style={{ maxHeight: '25vh' }} autoHide={false}>
                                <div id="Popup-Comment" className="d-flex justify-content-center">
                                    Oops!<br />Remember,&nbsp; 
                                    {returnMinusFirstCap()}<br /> {/* return game description minus the first capital to make the grammar correct */}
                                    {getLevelInstructions()} {/* get instructions for level based on current level and game type being Mix & Match */}
                                </div>
                            </SimpleBar>
                            
                            <div className="d-flex justify-content-center mb-2">
                                <button id="Retry-Button" onClick={() => { 
                                    close(); props.setOpen(false);
                                    }} 
                                className="button btn-secondary">
                                    Retry <FaPlay />
                                </button>
                            </div>

                        </div>
                    }
                </>
            )}
        </Popup>
    );
}
