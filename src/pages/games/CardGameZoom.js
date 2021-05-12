/*
Author: Samuel Black
https://github.com/Samuel-Black
*/

import React, { useEffect, useState } from 'react';
import { shuffleArray } from '../../components/images/Image-Functions';
import SimpleBar from 'simplebar-react';
import ResponsiveSimpleBar from '../../components/ResponsiveSimpleBar';
import './CardsGame.scss';

export default function CardsGameZoom(props) {
    const [currentCards, setCurrentCards] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);

    const difficulty = props.difficulty;
    const levels = props.numLevels;

    useEffect(() => {
        if(difficulty <= 3) {
            shuffleArray(props.shuffledImages.Full.incorrect);
        } else
            shuffleArray(props.shuffledImages.Zoom.incorrect);
        ShuffleCards();
    }, [difficulty])

    const ShuffleCards = () => {
        let dummy = [];
        if(difficulty === 1) {
            dummy = props.shuffledImages.Full.correct;
            dummy = dummy.concat(props.shuffledImages.Full.incorrect.slice(0, 2));
            shuffleArray(dummy);
            setCurrentCards(dummy);
        }
        else if(difficulty === 2) {
            dummy = props.shuffledImages.Full.correct;
            dummy = dummy.concat(props.shuffledImages.Full.incorrect.slice(0, 4));
            shuffleArray(dummy);
            setCurrentCards(dummy);
        }
        else if(difficulty === 3) {
            dummy = props.shuffledImages.Full.correct;
            dummy = dummy.concat(props.shuffledImages.Full.incorrect.slice(0, props.shuffledImages.Full.incorrect.length));
            shuffleArray(dummy);
            setCurrentCards(dummy);
        }
        else if(difficulty === 4) {
            dummy = props.shuffledImages.Zoom.correct;
            dummy = dummy.concat(props.shuffledImages.Zoom.incorrect.slice(0, 2));
            shuffleArray(dummy);
            setCurrentCards(dummy);
        }
        else if(difficulty === 5) {
            dummy = props.shuffledImages.Zoom.correct;
            dummy = dummy.concat(props.shuffledImages.Zoom.incorrect.slice(0, 4));
            shuffleArray(dummy);
            setCurrentCards(dummy);
        }
        else if(difficulty === 6) {
            dummy = props.shuffledImages.Zoom.correct;
            dummy = dummy.concat(props.shuffledImages.Zoom.incorrect.slice(0, props.shuffledImages.Zoom.incorrect.length));
            shuffleArray(dummy);
            setCurrentCards(dummy);
        }
    }

    const WinCondition = (selection) => {
        props.setFinishTime(new Date().getTime()); // When user clicks an option set the finish time
        
        if(selection === 'true') {
            props.setLevelCompleted('True');
            props.setPopupState(true);
            props.setAttemptNumber(0);
            ShuffleCards();
        }
        else {
            props.setAttemptNumber(props.attemptNumber + 1);
            props.setPopupState(true);
        }
    }

    return (
        <div id='Card-Game' className="container-fluid">
            <div className="row justify-content-center">
                <SimpleBar style={{ width: '70vw' }} autoHide={false}>
                    <div className="container-fluid">
                        <ResponsiveSimpleBar>
                            {difficulty <= levels &&
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
                            }
                        </ResponsiveSimpleBar>
                    </div>
                </SimpleBar>
            </div>
        </div>
    )
}