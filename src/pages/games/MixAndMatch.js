import React, { useState, useEffect } from "react"
import Source from "../../components/mixandmatch/Source"
import Target from "../../components/mixandmatch/Target"
import { shuffleArray } from '../../components/images/Image-Functions'
import { ItemTypes } from '../../components/DragItemTypes'
//import SimpleBar from 'simplebar-react';
import './MixAndMatch.scss'
import 'simplebar/dist/simplebar.min.css';

//Known issue with Mix and Match, problem with drag and drop component when you drag the correct right card and then the correct left card if using {difficulty === 1 && } logic, find fix later
export default function MixAndMatch(props) {

    const difficulty = props.difficulty
    const levels = props.numLevels;

    const [droppedItemPanel1, setDroppedItemPanel1] = useState({})
    const [droppedItemPanel2, setDroppedItemPanel2] = useState({})
    const [droppedItemPanel3, setDroppedItemPanel3] = useState({})
    const [errorMessage, setErrorMessage] = useState(null)

    onDropPanel1 = onDropPanel1.bind(this)
    onDropPanel2 = onDropPanel2.bind(this)
    onDropPanel3 = onDropPanel3.bind(this)

    useEffect(() => {
      if(difficulty >= 2 ) {
        winCondition()
      }
    }, [droppedItemPanel1, droppedItemPanel2, droppedItemPanel3])

    useEffect(() => {
      if(props.popupState === false) {
        clearDroppedCards()
        randomizeImages()
        props.setStartTime(new Date().getTime())
      }
    }, [props.popupState])
  
    function onDropPanel1(item) {
      setDroppedItemPanel1(item)
    }
    function onDropPanel2(item) {
      setDroppedItemPanel2(item)
    }
    function onDropPanel3(item) {
      setDroppedItemPanel3(item)
    }

    function randomizeImages() {
      if(difficulty === 1) {
        props.shuffledImages.easy = shuffleArray(props.shuffledImages.easy)
      }
      if(difficulty === 2) {
        props.shuffledImages.medium.Panel1 = shuffleArray(props.shuffledImages.medium.Panel1)
        props.shuffledImages.medium.Panel2 = shuffleArray(props.shuffledImages.medium.Panel2)
      }
      if(difficulty === 3) {
        props.shuffledImages.hard.Panel1 = shuffleArray(props.shuffledImages.hard.Panel1)
        props.shuffledImages.hard.Panel2 = shuffleArray(props.shuffledImages.hard.Panel2)
        props.shuffledImages.hard.Panel3 = shuffleArray(props.shuffledImages.hard.Panel3)
      }
    }

    function clearDroppedCards() {
      setDroppedItemPanel1({})
      setDroppedItemPanel2({})
      if(difficulty === 3) {
        setDroppedItemPanel3({})
      }
    }

    function winCondition(selection) {
      
      if(difficulty === 1) {
        props.setFinishTime(new Date().getTime()) // When user clicks an option set the finish time
          if(selection === 'true') {
            props.setLevelCompleted('True')
            props.setPopupState(true)
            props.setAttemptNumber(0)
        }
        else if(selection === 'false') {
          props.setAttemptNumber(props.attemptNumber + 1)
          props.setPopupState(true)
          randomizeImages()
        }
      }

      else {
        if(difficulty === 2) {
          if( ((Object.keys(droppedItemPanel1).length !== 0 && droppedItemPanel1.constructor === Object) && (Object.keys(droppedItemPanel2).length !== 0 && droppedItemPanel2.constructor === Object))) {
            props.setFinishTime(new Date().getTime()) // When user clicks an option set the finish time
            if(droppedItemPanel1.correct === 'true' && droppedItemPanel2.correct === 'true') {
              props.setLevelCompleted('True')
              props.setPopupState(true)
              props.setAttemptNumber(0)
            } 
            else if( (droppedItemPanel1.correct === 'false' || droppedItemPanel2.correct === 'false') ) {
              props.setAttemptNumber(props.attemptNumber + 1)
              props.setPopupState(true)
            }
            clearDroppedCards()
            randomizeImages()
          }
        }
        if(difficulty === 3) {
          if( ((Object.keys(droppedItemPanel1).length !== 0 && droppedItemPanel1.constructor === Object) && (Object.keys(droppedItemPanel2).length !== 0 && droppedItemPanel2.constructor === Object) && (Object.keys(droppedItemPanel3).length !== 0 && droppedItemPanel3.constructor === Object))) {
            props.setFinishTime(new Date().getTime()) // When user clicks an option set the finish time
            if(droppedItemPanel1.correct === 'true' && droppedItemPanel2.correct === 'true' && droppedItemPanel3.correct === 'true') {
              props.setLevelCompleted('True')
              props.setPopupState(true)
              props.setAttemptNumber(0)
            } 
            else if( (droppedItemPanel1.correct === 'false' || droppedItemPanel2.correct === 'false' || droppedItemPanel3.correct === 'false') ) {
              props.setAttemptNumber(props.attemptNumber + 1)
              props.setPopupState(true)
            }
            clearDroppedCards()
            randomizeImages()
          }
        }
      }
    }

    return (
      <>
        {difficulty <= levels &&
        <>
          {difficulty === 1 &&
            <div className="container-fluid">
              <div className="d-flex align-items-center justify-content-center">
                  {props.shuffledImages.easy.map((image, i) => {
                      return(
                          <div key={i} className="d-inline-flex card-option mr-2">
                              <a onClick={() => winCondition(image.correct)} >
                                  <img src={image.default} />
                              </a>
                          </div>
                      )
                  })}
              </div>
            </div>
          }
          {difficulty > 1 &&
          <div className="container">
            {props.vertical ? 
            <>
              <div className="row align-items-center">
                  <div className="col-lg align-self-center">
                  
                  {difficulty === 2 &&
                  <>
                    <div className= "row justify-content-center vertical-match">
                      <Target position={ItemTypes.CARDPANEL1} droppedItem={droppedItemPanel1} onDrop={onDropPanel1} />
                    </div>
                    <div className= "row justify-content-center vertical-match">
                      <Target position={ItemTypes.CARDPANEL2} droppedItem={droppedItemPanel2} onDrop={onDropPanel2} />
                    </div>
                  </>
                  }
                  {difficulty === 3 &&
                  <>
                    <div className= "row justify-content-center vertical-match">
                      <Target position={ItemTypes.CARDPANEL1} droppedItem={droppedItemPanel1} onDrop={onDropPanel1} />
                    </div>
                    <div className= "row justify-content-center vertical-match">
                      <Target position={ItemTypes.CARDPANEL2} droppedItem={droppedItemPanel2} onDrop={onDropPanel2} />
                    </div>
                    <div className= "row justify-content-center vertical-match">
                      <Target position={ItemTypes.CARDPANEL3} droppedItem={droppedItemPanel3} onDrop={onDropPanel3} />
                    </div>
                  </>
                  }

                  </div>
                </div>
                <div className="row justify-content-center">
                  
                  {difficulty === 2 &&
                  <>
                    <div className="row vertical-match">
                      {props.shuffledImages.medium.Panel1.map((image) => (
                        <Source image={image.default} correct={image.correct} position={image.position} />
                      ))}
                    </div>
                    <div className="row vertical-match">
                      {props.shuffledImages.medium.Panel2.map((image) => (
                        <Source image={image.default} correct={image.correct} position={image.position} />
                      ))}
                    </div>
                  </>
                  }
                  
                  {difficulty === 3 &&
                  <>
                    <div className="row vertical-match">
                      {props.shuffledImages.hard.Panel1.map((image) => (
                        <Source image={image.default} correct={image.correct} position={image.position} />
                      ))}
                    </div>
                    <div className="row vertical-match">
                      {props.shuffledImages.hard.Panel2.map((image) => (
                        <Source image={image.default} correct={image.correct} position={image.position} />
                      ))}
                    </div>
                    <div className="row vertical-match">
                      {props.shuffledImages.hard.Panel3.map((image) => (
                        <Source image={image.default} correct={image.correct} position={image.position} />
                      ))}
                    </div>
                  </>
                  }

                </div>
                </>
                :
                <>
                <div className="row align-items-center">

                  <div className="col-lg-4 align-self-center horizontal-match">
                    {props.shuffledImages.medium.Panel1.map((image) => (
                    <div className="row justify-content-center">
                      <Source image={image.default} correct={image.correct} position={image.position} />
                    </div>
                    ))}
                  </div>

                  <div className= "row justify-content-center horizontal-match">
                    <Target position={ItemTypes.CARDPANEL1} droppedItem={droppedItemPanel1} onDrop={onDropPanel1} />
                    <Target position={ItemTypes.CARDPANEL2} droppedItem={droppedItemPanel2} onDrop={onDropPanel2} />
                  </div>

                  <div className="col-lg-4 align-self-center horizontal-match">
                    {props.shuffledImages.medium.Panel2.map((image) => (
                      <div className="row justify-content-center">
                        <Source image={image.default} correct={image.correct} position={image.position} />
                      </div>
                    ))}
                  </div>

                </div>
                </>
            }
          </div>
          }
          </>
        }
      </>
    )
}
