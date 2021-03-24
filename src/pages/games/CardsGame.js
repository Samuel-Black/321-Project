import React, { useEffect, useState } from 'react'
import { shuffleArray } from '../../components/images/Image-Functions'
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

    return (
        <>
            <div className="container-fluid">
                <div className="d-flex align-items-center justify-content-center">
                    {difficulty <= levels &&
                    <>
                        {currentCards.map((image, i) => {
                            return(
                                <div key={i} className="d-inline-flex card-option mr-2">
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
        </>
    )
}