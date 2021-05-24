/*
Author: Samuel Black
https://github.com/Samuel-Black
*/

import React, { useEffect, useState } from 'react';
import { shuffleArray, returnRandomHopArmsCharacters } from '../../components/images/Image-Functions';
import SimpleBar from 'simplebar-react';
import ResponsiveSimpleBar from '../../components/Responsive-SimpleBar';
import ValidateWinCondition from './Validate-Win-Condition';
import './Cards-Game.scss';
import './Hop-Arms.scss';

export default function HopArms(props) {
    const [currentCards, setCurrentCards] = useState([]); // current selectable characters in play
    const [characters, setCharacters] = useState({ // four characters/levels
        character1: null,
        character2: null,
        character3: null,
        character4: null,
    });
    const [charactersReady, setCharactersReady] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        const randomized = returnRandomHopArmsCharacters(props.shuffledImages);
        setCharacters({
            character1: randomized[0],
            character2: randomized[1],
            character3: randomized[2],
            character4: randomized[3],
        });
        setCharactersReady(true);
    }, []);

    const levels = props.numLevels; // total levels in the game

    // on difficulty change, if the character states are not null, randomize their order.
    useEffect(() => {
        if(characters.character1 !== null || characters.character2 !== null || characters.character3 !== null || characters.character4 !== null) {
            ShuffleCards();
        }
    }, [props.difficulty, charactersReady]);

    // function to slice the array accordingly and set the current cards for the given difficulty/level
    const setCards = (currentCharacter) => {
        let cards = []
        cards = currentCharacter.correct; // put correct card in array
        cards = cards.concat(currentCharacter.incorrect.slice(0, currentCharacter.incorrect.length)); // put incorrect cards in the array
        shuffleArray(cards); // randomize the order
        setCurrentCards(cards); // set the cards
    }

    // function to set the current cards
    const ShuffleCards = () => {
        if(props.difficulty === 1) {
            setCards(characters.character1); // set cards for level/difficulty 1
        }
        else if(props.difficulty === 2) {
            setCards(characters.character2); // set cards for level/difficulty 2
        }
        else if(props.difficulty === 3) {
            setCards(characters.character3); // set cards for level/difficulty 3
        }
        else if(props.difficulty === 4) {
            setCards(characters.character4); // set cards for level/difficulty 4
        }
    }

    // check if level has been cleared
    const WinCondition = (selection) => {
        props.setFinishTime(new Date().getTime()); // When user clicks an option set the finish time
        
        const correctSelection = (selection === 'true'); // truth value of the win condition
        ValidateWinCondition(correctSelection, props.setLevelCompleted, props.setPopupState, props.setAttemptNumber, props.attemptNumber); // validate win condition
    }

    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <SimpleBar style={{ width: '85vw' }} autoHide={false}>
                    <div className="container-fluid">
                        <ResponsiveSimpleBar>

                            {/* while the current player has not completed the entire game, display the below */}
                            <>
                                {currentCards.map((image, i) => {
                                    return(
                                        <div key={i} className="card-option d-flex align-items-end hop-arms-character mr-2">
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
    )
}