import React, { useEffect, useState } from 'react'
import { shuffleArray, returnRandomHopArmsCharacters } from '../../components/images/Image-Functions'
import SimpleBar from 'simplebar-react';
import { SizeMe } from 'react-sizeme';
import './CardsGame.scss'
import './Hop-Arms.scss'

export default function HopArms(props) {
    const [currentCards, setCurrentCards] = useState([])
    const [characters, setCharacters] = useState({
        character1: null,
        character2: null,
        character3: null,
        character4: null,
    })
    const [charactersReady, setCharactersReady] = useState(false);
    const [rowWidth, setRowWidth] = useState(null);
    const [contentWidth, setContentWidth] = useState(null);

    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        const randomized = returnRandomHopArmsCharacters(props.shuffledImages);
        setCharacters({
            character1: randomized[0],
            character2: randomized[1],
            character3: randomized[2],
            character4: randomized[3],
        });
        setCharactersReady(true)
    }, [])

    console.log(characters)

    const difficulty = props.difficulty
    const levels = props.numLevels

    useEffect(() => {
        if(characters.character1 !== null || characters.character2 !== null || characters.character3 !== null || characters.character4 !== null) {
            ShuffleCards()
        }
    }, [difficulty, charactersReady])

    const ShuffleCards = () => {
        let dummy = []
        if(difficulty === 1) {
            dummy = characters.character1.correct;
            dummy = dummy.concat(characters.character1.incorrect.slice(0, characters.character1.incorrect.length))
            //shuffleArray(dummy)
            setCurrentCards(dummy)
        }
        else if(difficulty === 2) {
            dummy = characters.character2.correct;
            dummy = dummy.concat(characters.character2.incorrect.slice(0, characters.character2.incorrect.length))
            //shuffleArray(dummy)
            setCurrentCards(dummy)
        }
        else if(difficulty === 3) {
            dummy = characters.character3.correct;
            dummy = dummy.concat(characters.character3.incorrect.slice(0, characters.character3.incorrect.length))
            shuffleArray(dummy)
            setCurrentCards(dummy)
        }
        else if(difficulty === 4) {
            dummy = characters.character4.correct;
            dummy = dummy.concat(characters.character4.incorrect.slice(0, characters.character4.incorrect.length))
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

    console.log('rowWidth: ', rowWidth)
    console.log('contentWidth: ', contentWidth)

    function SetRowJustification() { // cards are cut off by the simplebar component when statically defined as centered, this is a solution
        if(contentWidth > rowWidth) {
            return '';
        } else
            return 'justify-content-center';
    }

    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <SimpleBar style={{ width: '85vw' }} autoHide={false}>
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
                                                    <div className="d-flex align-items-end hop-arms-flex">
                                                    {setContentWidth(size.width)}
                                                        {difficulty <= levels &&
                                                            <>
                                                                {currentCards.map((image, i) => {
                                                                    return(
                                                                        <div key={i} className="card-option hop-arms-character mr-2">
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
    )
}