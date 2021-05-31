/*
Author: Samuel Black
https://github.com/Samuel-Black
*/

import React, { useState, useEffect } from "react"
import { shuffleArray } from '../../components/images/Image-Functions'
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { FaHandPointUp } from 'react-icons/fa';
import ResponsiveSimpleBar from '../../components/Responsive-SimpleBar';
import ValidateWinCondition from './Validate-Win-Condition';
import '../../components/Hand-Drag-Animation.scss'
import SwiperComponent from '../../components/mixmatch/Swiper-Component';
import './Mix-And-Match.scss'

export default function MixAndMatch(props) {

    const [panel1, setPanel1] = useState(null); // panel 1 for matching card parts
    const [panel2, setPanel2] = useState(null); // panel 2 for matching card parts
    const [panel3, setPanel3] = useState(null); // panel 3 for matching card parts
    const [showHand, setShowHand] = useState(false); // state for showing hand animation for a couple seconds when user first loads into the game

    const [errorMessage, setErrorMessage] = useState(null);

    const levels = props.numLevels; // total levels in the game

    // when popup state is false (user has selected play), show a hand dragging animation to prompt the user to slide the cards
    useEffect(() => {
      if(props.popupState === false && props.attemptNumber === 0 && props.difficulty > 1) { // only play animation when > 1 difficulty/level since mix & match starts at level 2
        setShowHand(true);
        setTimeout(() => setShowHand(false), 4000); // stop hand dragging animation after 4 seconds
      }
    }, [props.popupState]);

    function randomizeImages() {
      if(props.difficulty === 1) {
        props.shuffledImages.easy = shuffleArray(props.shuffledImages.easy); // randomize easy array
      }
      if(props.difficulty === 2) {
        props.shuffledImages.medium.Panel1 = shuffleArray(props.shuffledImages.medium.Panel1); // randomize medium arrays
        props.shuffledImages.medium.Panel2 = shuffleArray(props.shuffledImages.medium.Panel2);
      }
      if(props.difficulty === 3) {
        props.shuffledImages.hard.Panel1 = shuffleArray(props.shuffledImages.hard.Panel1); // randomize hard arrays
        props.shuffledImages.hard.Panel2 = shuffleArray(props.shuffledImages.hard.Panel2);
        props.shuffledImages.hard.Panel3 = shuffleArray(props.shuffledImages.hard.Panel3);
      }
    }

    // randomize image array order on component mount
    useEffect(() => {
      randomizeImages();
    }, [props.difficulty])

    // check if level has been cleared
    function winCondition(selection) {
      props.setFinishTime(new Date().getTime()); // When user clicks an option set the finish time
      
      if(props.difficulty === 1) {
        const correctSelection = (selection === 'true'); // truth value of the win condition
        ValidateWinCondition(correctSelection, props.setLevelCompleted, props.setPopupState, props.setAttemptNumber, props.attemptNumber); // validate win condition
      }
      else {
        if(props.difficulty === 2) {
          const correctSelection = (panel1 === 'true' && panel2 === 'true'); // truth value of the win condition
          ValidateWinCondition(correctSelection, props.setLevelCompleted, props.setPopupState, props.setAttemptNumber, props.attemptNumber); // validate win condition
        }
        if(props.difficulty === 3) {
          const correctSelection = (panel1 === 'true' && panel2 === 'true' && panel3 === 'true'); // truth value of the win condition
          ValidateWinCondition(correctSelection, props.setLevelCompleted, props.setPopupState, props.setAttemptNumber, props.attemptNumber); // validate win condition
        }
      }
    }

    return (
      <>
        {/* while the current player has not completed the entire game, display the below */}
        {props.difficulty <= levels &&
          <>
            {/* the first level/difficulty of Mix & Match is the same as the card selection game */}
            {props.difficulty === 1 &&
              <div id='Card-Game' className="container-fluid">
                <div className="row justify-content-center">
                  <SimpleBar style={{ width: '70vw' }} autoHide={false} className='simplebar-visible'>
                    <div className="container-fluid">
                      <ResponsiveSimpleBar>
                        {props.shuffledImages.easy.map((image, i) => {
                            return(
                              <div key={i} className="d-flex align-items-end card-option mr-2">
                                <a onClick={() => winCondition(image.correct)} >
                                    <img src={image.default} />
                                </a>
                              </div>
                            )
                        })}
                      </ResponsiveSimpleBar>
                    </div>
                  </SimpleBar>
                </div>
              </div>
            }

            {/* the second level/difficulty of Mix & Match and above is the card match game type */}
            {props.difficulty > 1 &&
              <div className="container">
                
                {/* if the cards are matched vertically, display the below */}
                {props.vertical ? 
                  <>
                    {showHand === true && <FaHandPointUp size={80} className="horizontal-drag-hand" />}

                    {/* if the difficulty is 2, there are two panels to match */}
                    {props.difficulty === 2 &&
                      <>
                        <div className= "row justify-content-center match vertical-match mt-5" >
                          <SwiperComponent direction={'horizontal'} setPanel={setPanel1} images={props.shuffledImages.medium.Panel1} />
                        </div>
                        <div className= "row justify-content-center match vertical-match">
                          <SwiperComponent direction={'horizontal'} setPanel={setPanel2} images={props.shuffledImages.medium.Panel2} />
                        </div>
                      </>
                    }

                    {/* if the difficulty is 3, there are three panels to match */}
                    {props.difficulty === 3 &&
                      <>
                        <div className= "row justify-content-center match vertical-match mt-5">
                          <SwiperComponent direction={'horizontal'} setPanel={setPanel1} images={props.shuffledImages.hard.Panel1} />
                        </div>
                        <div className= "row justify-content-center match vertical-match">
                          <SwiperComponent direction={'horizontal'} setPanel={setPanel2} images={props.shuffledImages.hard.Panel2} />
                        </div>
                        <div className= "row justify-content-center match vertical-match">
                          <SwiperComponent direction={'horizontal'} setPanel={setPanel3} images={props.shuffledImages.hard.Panel3} />
                        </div>
                      </>
                    }
                  </>

                : // If the card matching is not vertical, there is only one more level with two panels

                  <>
                    {showHand === true && <FaHandPointUp size={80} className="vertical-drag-hand" />}
                    <div className="row justify-content-center mt-5">
                      <div className= "row horizontal-match match mt-5">
                        <SwiperComponent direction={'vertical'} setPanel={setPanel1} images={props.shuffledImages.medium.Panel1} />
                        <SwiperComponent direction={'vertical'} setPanel={setPanel2} images={props.shuffledImages.medium.Panel2} />
                      </div>
                    </div>
                  </>
                  
                }

                <div className= "row justify-content-center mt-1">
                  <button className="button btn-secondary" onClick={() => winCondition()}>Confirm!</button>
                </div>
              </div>
            }
          </>
        }
      </>
    );
}
