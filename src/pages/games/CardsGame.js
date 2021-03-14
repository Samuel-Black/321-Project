import React, { useEffect, useState } from 'react'
import { shuffleArray } from '../../components/images/Image-Functions'
import GamePopup from '../../components/Game-Popup'
import { useAuthPlayer, useAuthUser } from '../../libs'
import Axios from 'axios'
import './CardsGame.scss'

export default function CardsGame(props) {

    const [popupState, setPopupState] = useState(true)
    const [difficulty, setDifficulty] = useState(1);
    const [attemptNumber, setAttemptNumber] = useState(0)
    const [startTime, setStartTime] = useState(null)
    const [finishTime, setFinishTime] = useState(null)
    const [timeTaken, setTimeTaken] = useState(null)
    const [currentCards, setCurrentCards] = useState([])
    const [levelCompleted, setLevelCompleted] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)

    const currentPlayer = useAuthPlayer()
    const user = useAuthUser()

    const gameTitle = 'Cards';
    const levels = props.numLevels;

    const CreateAttempt = () => {
        Axios.post('http://localhost:3001/api/createattempt', {
            GameName: props.GameName,
            LevelNumber: difficulty,
            UserName: user.attributes.sub,
            NickName: currentPlayer.player.NickName,
            Succesful: levelCompleted,
            TimeTaken: timeTaken
        }).then((response) => {
            
        }).catch((error) => {
            setErrorMessage(error)
            console.log(error)
        })
    }   

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

    useEffect(() => {
        if(popupState === false) // If the game popupscreen is set to false (closed) start the "timer"
            setStartTime(new Date().getTime())
    }, [popupState])

    useEffect(() => { // Once the finishTime state is updated calculate the total time
        setTimeTaken(Math.round( ( ( (finishTime - startTime) / 1000) + Number.EPSILON) * 100) / 100 )
    }, [finishTime])
    
    useEffect(() => {
        if( (difficulty <= levels  && timeTaken !== null && timeTaken !== 0 ) ) { // Don't create attempt when all levels have been cleared or when timer is being initialized
            //CreateAttempt()
            if(levelCompleted === true) { // If level was completed set it back to false for next level and increment the difficulty
                setDifficulty(difficulty + 1)
                setLevelCompleted(false)
            }
        }
    }, [timeTaken])

    const WinCondition = (selection) => {
        setFinishTime(new Date().getTime()) // When user clicks an option set the finish time
        
        if(selection === 'true') {
            setLevelCompleted(true)
            setPopupState(true)
            setAttemptNumber(0)
            ShuffleCards()
        }
        else {
            ShuffleCards()
            setAttemptNumber(attemptNumber + 1)
            setPopupState(true)
        }
    }

    return (
        <div className="game-background">
        {props.backButton}
        <GamePopup open={popupState} setOpen={setPopupState} gameTitle={gameTitle} levelsCleared={difficulty} numLevels={levels} levelPassed={attemptNumber < 1} />
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
        </div>
    )
}