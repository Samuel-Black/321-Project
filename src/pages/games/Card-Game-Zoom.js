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

export default function CardsGameZoom(props) {

    const [currentCards, setCurrentCards] = useState([]); // current selectable cards in play
    const [errorMessage, setErrorMessage] = useState(null);

    const levels = props.numLevels; // total levels in the game

    // on difficulty change, get the cards and randomize the order 
    useEffect(() => {
        if(props.difficulty <= 3) {
            shuffleArray(props.shuffledImages.Full.incorrect);
        } else
            shuffleArray(props.shuffledImages.Zoom.incorrect);
        ShuffleCards();
    }, [props.difficulty]);

    // function to slice the array accordingly and set the current cards for the given difficulty/level
    const setCards = (index) => {
        let cards = [];
        if(props.difficulty <= 3) {
            cards = props.shuffledImages.Full.correct; // put correct image in array, if not past level 3 use the full size/not zoomed in images
            cards = cards.concat(props.shuffledImages.Full.incorrect.slice(0, index)); // put index amount of incorrect cards into array depending on difficulty/level
        }
        else if (props.difficulty > 3 && props.difficulty <= 6) {
            cards = props.shuffledImages.Zoom.correct; // put correct image in array, if past level 3 use the zoomed in images
            cards = cards.concat(props.shuffledImages.Zoom.incorrect.slice(0, index)); // put index amount of incorrect cards into array depending on difficulty/level
        }
        shuffleArray(cards); // randomize the order
        setCurrentCards(cards); // set the cards
    }

    const ShuffleCards = () => {
        if(props.difficulty === 1 || props.difficulty === 4) {
            setCards(2); // use two incorrect images for first levels
        }
        else if(props.difficulty === 2 || props.difficulty === 5) {
            setCards(4); // use four incorrect images for second last levels
        }
        else if(props.difficulty === 3 || props.difficulty === 6) {
            setCards(props.shuffledImages.Full.incorrect.length); // use entire array for final levels
        }
    }

    // check if level has been cleared
    const WinCondition = (selection) => {
        props.setFinishTime(new Date().getTime()); // When user clicks an option set the finish time
        
        const correctSelection = (selection === 'true'); // truth value of the win condition
        ValidateWinCondition(correctSelection, props.setLevelCompleted, props.setPopupState, props.setAttemptNumber, props.attemptNumber); // validate win condition
    }

    return (
        <div id='Card-Game' className="container-fluid">
            <div className="row justify-content-center">
                <SimpleBar style={{ width: '70vw' }} autoHide={false}>
                    <div className="container-fluid">
                        <ResponsiveSimpleBar>
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
