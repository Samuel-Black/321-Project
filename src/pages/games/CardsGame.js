import React, { useEffect, useState } from 'react';
import { shuffleArray } from '../../components/images/Image-Functions';
import SimpleBar from 'simplebar-react';
import { SizeMe } from 'react-sizeme';
import './CardsGame.scss';

export default function CardsGame(props) {

    const [currentCards, setCurrentCards] = useState([]);
    const [rowWidth, setRowWidth] = useState(null);
    const [contentWidth, setContentWidth] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const difficulty = props.difficulty;
    const levels = props.numLevels;

    useEffect(() => {
        shuffleArray(props.shuffledImages.incorrect);
        ShuffleCards();
    }, [difficulty])

    const ShuffleCards = () => {
        let dummy = [];
        if(difficulty === 1) {
            dummy = props.shuffledImages.correct;
            dummy = dummy.concat(props.shuffledImages.incorrect.slice(0, 2));
            shuffleArray(dummy);
            setCurrentCards(dummy);
        }
        else if(difficulty === 2) {
            dummy = props.shuffledImages.correct;
            dummy = dummy.concat(props.shuffledImages.incorrect.slice(0, 4));
            shuffleArray(dummy);
            setCurrentCards(dummy);
        }
        else if(difficulty === 3) {
            dummy = props.shuffledImages.correct;
            dummy = dummy.concat(props.shuffledImages.incorrect.slice(0, props.shuffledImages.incorrect.length));
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

    function SetRowJustification() { // cards are cut off by the simplebar component when statically defined as centered, this is a solution
        if(contentWidth > rowWidth) {
            return '';
        } else
            return 'justify-content-center';
    }

    return (
        <div id="Card-Game" className="container-fluid">
            <div className="row justify-content-center">
                <SimpleBar style={{ width: '70vw' }} autoHide={false}>
                    <div className="container-fluid">
                        <SizeMe
                            monitorWidth
                            refreshRate={16}>
                            {({ size }) => 
                                <div className={`row ${SetRowJustification()}`}>
                                    {setRowWidth(size.width)}
                                    <SizeMe
                                    monitorWidth
                                    refreshRate={16}>
                                        {({ size }) => 
                                            <div className="d-flex">
                                                {setContentWidth(size.width)}
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
                                            </div>
                                        }
                                    </SizeMe>
                                </div>
                            }
                        </SizeMe>
                    </div>
                </SimpleBar>
            </div>
        </div>
    );
}