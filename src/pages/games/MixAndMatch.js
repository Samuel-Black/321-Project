import React, { useState, useEffect } from "react"
import Source from "../../components/mixandmatch/Source"
import Target from "../../components/mixandmatch/Target"
import { shuffleArray } from '../../components/images/Image-Functions'
import './MixAndMatch.scss'
import { ItemTypes } from '../../components/DragItemTypes'
import GamePopup from '../../components/Game-Popup'
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

//Known issue with Mix and Match, problem with drag and drop component when you drag the correct right card and then the correct left card if using {difficulty === 1 && } logic, find fix later
export default function MixAndMatch(props) {

    const [popupState, setPopupState] = useState(true)
    const [difficulty, setDifficulty] = useState(1);
    const [droppedItemLeft, setDroppedItemLeft] = useState({})
    const [droppedItemRight, setDroppedItemRight] = useState({})
    const [attemptNumber, setAttemptNumber] = useState(0)

    const gameTitle = 'Mix & Match';
    const levels = 1;

    onDropLeft = onDropLeft.bind(this)
    onDropRight = onDropRight.bind(this)

    useEffect(() => {
      randomizeImages()
    }, [difficulty, attemptNumber])

    useEffect(() => {
      winCondition()
    }, [droppedItemLeft, droppedItemRight])
  
    function onDropLeft(item) {
      setDroppedItemLeft(item)
    }
  
    function onDropRight(item) {
      setDroppedItemRight(item)
    }

    function randomizeImages() {
      props.shuffledImages.left = shuffleArray(props.shuffledImages.left)
      props.shuffledImages.right = shuffleArray(props.shuffledImages.right)
    }

    function clearDroppedCards() {
      setDroppedItemLeft({})
      setDroppedItemRight({})
    }

    function winCondition() {
      if( ((Object.keys(droppedItemLeft).length !== 0 && droppedItemLeft.constructor === Object) && (Object.keys(droppedItemRight).length !== 0 && droppedItemRight.constructor === Object))) {
        if(droppedItemLeft.correct === 'true' && droppedItemRight.correct === 'true') {
          setDifficulty(difficulty + 1)
          clearDroppedCards()
          setAttemptNumber(0)
          setPopupState(true)
        } 
        else if( (droppedItemLeft.correct === 'false' || droppedItemRight.correct === 'false') ) {
          setAttemptNumber(attemptNumber + 1)
          clearDroppedCards()
          setPopupState(true)
        }
      }
    }

    return (
      <div className="game-background">
        {props.backButton}
        <GamePopup open={popupState} setOpen={setPopupState} gameTitle={gameTitle} levelsCleared={difficulty} numLevels={levels} levelPassed={attemptNumber < 1} />
        <div className="container">
          
          {/* Uncomment when Card component is completed (First level of mix and match is select the correct image, no mixing or matching)
            {difficulty <= 1 &&
            <>
            </>
            }
          */}
        {props.vertical ? 
        <>
           <div className="row align-items-center">
              <div className="col-lg align-self-center">

                <div className= "row justify-content-center vertical-match">
                  <Target position={ItemTypes.CARDLEFT} droppedItem={droppedItemLeft} onDrop={onDropLeft} />
                </div>
                <div className= "row justify-content-center vertical-match">
                  <Target position={ItemTypes.CARDRIGHT} droppedItem={droppedItemRight} onDrop={onDropRight} />
                </div>

              </div>
            </div>
            <div className="row justify-content-center">
              
              <div className="row vertical-match">
                {props.shuffledImages.left.map((image) => (
                  <Source image={image.default} correct={image.correct} position={image.position} />
                ))}
              </div>
              <div className="row vertical-match">
                {props.shuffledImages.right.map((image) => (
                  <Source image={image.default} correct={image.correct} position={image.position} />
                ))}
              </div>

            </div>
            </>
            :
            <>
            <div className="row align-items-center">

              <div className="col-lg-4 align-self-center horizontal-match">
                {props.shuffledImages.left.map((image) => (
                <div className="row justify-content-center">
                  <Source image={image.default} correct={image.correct} position={image.position} />
                </div>
                ))}
              </div>

              <div className= "row justify-content-center horizontal-match">
                <Target position={ItemTypes.CARDLEFT} droppedItem={droppedItemLeft} onDrop={onDropLeft} />
                <Target position={ItemTypes.CARDRIGHT} droppedItem={droppedItemRight} onDrop={onDropRight} />
              </div>

              <div className="col-lg-4 align-self-center horizontal-match">
                {props.shuffledImages.right.map((image) => (
                  <div className="row justify-content-center">
                    <Source image={image.default} correct={image.correct} position={image.position} />
                  </div>
                ))}
              </div>

            </div>
            </>
        }
          
        </div>
      </div>
    );
}
