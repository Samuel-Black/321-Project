import React, { useEffect, useState } from 'react'
import { shuffleArray } from '../../components/images/Image-Functions'
import SimpleBar from 'simplebar-react';
import './CardsGame.scss'

export default function CardsGame(props) {

    const [currentCards, setCurrentCards] = useState([])
    const [errorMessage, setErrorMessage] = useState(null)

    const difficulty = props.difficulty
    const levels = props.numLevels

    useEffect(() => {
        shuffleArray(props.shuffledImages.incorrect)
        ShuffleCards()
    }, [difficulty])

    const ShuffleCards = () => {
        let dummy = []
        if(difficulty === 1) {
            dummy = props.shuffledImages.correct
            dummy = dummy.concat(props.shuffledImages.incorrect.slice(0, 2))
            shuffleArray(dummy)
            setCurrentCards(dummy)
        }
        else if(difficulty === 2) {
            dummy = props.shuffledImages.correct
            dummy = dummy.concat(props.shuffledImages.incorrect.slice(0, 4))
            shuffleArray(dummy)
            setCurrentCards(dummy)
        }
        else if(difficulty === 3) {
            dummy = props.shuffledImages.correct
            dummy = dummy.concat(props.shuffledImages.incorrect.slice(0, props.shuffledImages.incorrect.length))
            shuffleArray(dummy)
            setCurrentCards(dummy)
        }
    }

    const WinCondition = (selection) => {
        props.setFinishTime(new Date().getTime()) // When user clicks an option set the finish time
        
        if(selection === 'true') {
            props.setLevelCompleted('True')
            props.setPopupState(true)
            props.setAttemptNumber(0)
            ShuffleCards()
        }
        else {
            ShuffleCards()
            props.setAttemptNumber(props.attemptNumber + 1)
            props.setPopupState(true)
        }
    }

    // Hook
    function useWindowSize() {
        // Initialize state with undefined width/height so server and client renders match
        // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
        const [windowSize, setWindowSize] = useState({
            width: undefined,
            height: undefined,
        });

        useEffect(() => {
            // Handler to call on window resize
            function handleResize() {
            // Set window width/height to state
                setWindowSize({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            }
            
            // Add event listener
            window.addEventListener("resize", handleResize);
            // Call handler right away so state gets updated with initial window size
            handleResize();
            // Remove event listener on cleanup
            return () => window.removeEventListener("resize", handleResize);
        }, []); // Empty array ensures that effect is only run on mount

        return windowSize;
    }

    function SetRowJustification(width) { // cards are cut off by the simplebar component when statically defined as centered, this is a solution
        if( (width < 1000 && currentCards.length === 3) || (width < 1668 && currentCards.length === 5) || (currentCards.length > 5) ) {
            return '';
        } else
            return 'justify-content-center';
    }

    console.log(SetRowJustification(useWindowSize().width))

    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <SimpleBar style={{ width: '70vw' }} autoHide={false}>
                    <div className="container-fluid">
                        <div className={`row ${SetRowJustification(useWindowSize().width)}`}>
                            <div className="d-flex">
                                {difficulty <= levels &&
                                    <>
                                        {currentCards.map((image, i) => {
                                            return(
                                                <div key={i} className="card-option mr-2">
                                                    <a onClick={() => WinCondition(image.correct)} >
                                                        <img src={image.default} />
                                                    </a>
                                                </div>
                                            )
                                        })}
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </SimpleBar>
            </div>
        </div>
    )
}