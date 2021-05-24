/*
Author: Samuel Black
https://github.com/Samuel-Black
*/

import React, { useEffect, useState } from 'react';
import { shuffleArray } from '../../components/images/Image-Functions';
import SimpleBar from 'simplebar-react';
import ResponsiveSimpleBar from '../../components/Responsive-SimpleBar';
import ValidateWinCondition from './Validate-Win-Condition';
import './Cards-Game.scss';

export default function CardsGame(props) {

    const [currentCards, setCurrentCards] = useState([]); // current selectable cards in play
    const [errorMessage, setErrorMessage] = useState(null);

    const levels = props.numLevels; // total levels in the game

    // on difficulty change, get the cards and randomize the order 
    useEffect(() => {
        shuffleArray(props.shuffledImages.incorrect);
        ShuffleCards();
    }, [props.difficulty]);

    // function to slice the array accordingly and set the current cards for the given difficulty/level
    const setCards = (index) => {
        let cards = [];
        cards = props.shuffledImages.correct; // put correct card in array
        cards = cards.concat(props.shuffledImages.incorrect.slice(0, index)); // put index amount of incorrect cards into array depending on difficulty/level
        shuffleArray(cards); // randomize the order
        setCurrentCards(cards); // set the cards
    }

    // function to set the current cards
    const ShuffleCards = () => {
        if(props.difficulty === 1) {
            setCards(2); // use two incorrect images for first level
        }
        else if(props.difficulty === 2) {
            setCards(4); // use four incorrect images for second level
        }
        else if(props.difficulty === 3) {
            setCards(props.shuffledImages.incorrect.length); // use all of the incorrect images for third level
        }
    }

    // check if level has been cleared
    const WinCondition = (selection) => {
        props.setFinishTime(new Date().getTime()); // When user clicks an option set the finish time
        
        const correctSelection = (selection === 'true'); // truth value of the win condition
        ValidateWinCondition(correctSelection, props.setLevelCompleted, props.setPopupState, props.setAttemptNumber, props.attemptNumber); // validate win condition
    }

    return (
        <div id="Card-Game" className="container-fluid">
            <div className="row justify-content-center">
                <SimpleBar style={{ width: '70vw' }} autoHide={false}>
                    <div className="container-fluid">
                        <ResponsiveSimpleBar>

                            {/* While the current player has not compelted the entire game, display the below */}
                            <>
                                {currentCards.map((image, i) => {
                                    return(
                                        <div key={i} className="d-flex align-items-end card-option mr-2">
                                            <a onClick={() => WinCondition(image.correct)} >
                                                <img src={image.default} />
                                            </a>
                                        </div>
                                    )
                                })}
                            </>
                            
                        </ResponsiveSimpleBar>
                    </div>
                </SimpleBar>
            </div>
        </div>
    );
}
