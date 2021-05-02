import React, { useRef } from 'react';
import Popup from 'reactjs-popup';
import './Game-Popup.scss';
import { BsStarFill, BsStar } from 'react-icons/bs';
import { TiHome, TiArrowBack } from 'react-icons/ti';
import { FaPlay } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import SimpleBar from 'simplebar-react';


function returnStars(props) {
    let stars = [];
    for(let i = 0; i < props.numLevels; i++) {
        if(i + 1 < props.levelsCleared) {
            stars[i] = <BsStarFill />
        }
        else if(i + 1 === props.levelsCleared) {
            stars[i] = <BsStarFill activestar=" activestar" />
        }
        else {
            stars[i] = <BsStar />
        }
    }
    return stars;
}

export default function GamePopup(props) {
    
    const navigate = useNavigate();

    const playButtonRef = useRef();

    function returnGameInstructions() {
        if(props.gameType === 'Cards' || (props.gameType === 'Mix & Match' && props.levelsCleared === 0)) {
            return 'Select the correct card!';
        }
        if(props.gameType === 'Mix & Match' && props.levelsCleared > 0) {
            return 'Drag the sliders to match the cards and create the correct image!';
        }
        if(props.gameType === 'Targets' && props.levelsCleared > 0) {
            return 'Select the target that fshabkj is looking at!';
        }
    }

    return(
        <Popup open={props.open} closeOnDocumentClick={false} closeOnEscape={false} lockScroll={true} modal>
            {close => (
                <>
                {props.levelPassed ?
                    <div className="game-popup container">
                        <div className="header col-lg-12">
                            <h1 className="row justify-content-center">{props.gameTitle}</h1>
                        </div>
                        <div className="content col-lg-12">
                            <div className="row justify-content-center">
                                {returnStars(props).map((star,i) =>
                                    <div key={i} className={star.props.activestar}>
                                        {star}
                                    </div>
                                )}
                            </div>
                            {props.levelsCleared > props.numLevels ? <h2 id="Level-Text" className="row justify-content-center">You did it!</h2> : <h2 id="Level-Text" className="row justify-content-center">Level {props.levelsCleared}</h2> }
                        </div>

                        {props.levelsCleared > props.numLevels ?
                            <div className="d-flex justify-content-center mt-3 mb-2">
                                <button onClick={() => { 
                                        navigate(-1);
                                    }} 
                                className="button btn-secondary">
                                    Home <TiHome />
                                </button>
                            </div>
                        :
                            <>
                                <SimpleBar className="mt-1 mb-3" style={{ height: '13vh' }} autoHide={false}>
                                    <div id="Popup-Comment" className="d-flex justify-content-center">
                                        {props.gameInstructions}
                                    </div>
                                </SimpleBar>
                                <div className="d-flex justify-content-center mb-2">
                                        <button onClick={() => { 
                                            close(); props.setOpen(false);
                                            }} 
                                        className="button btn-secondary">
                                            Play <FaPlay />
                                        </button>
                                </div>
                            </>
                        }

                    </div>

                    :

                    <div className="game-popup container">
                        <div className="header col-lg-12">
                            <h1 className="row justify-content-center">{props.gameTitle}</h1>
                        </div>
                        <div className="content col-lg-12">
                            <div className="row justify-content-center">
                                {returnStars(props).map((star, i) =>
                                    <div key={i} className={star.props.activestar}>
                                        {star}
                                    </div>
                                )}
                            </div>
                            {props.levelsCleared > props.numLevels ? <h2 id="Level-Text" className="row justify-content-center">Try Again!</h2> : <h2 id="Level-Text" className="row justify-content-center">Level {props.levelsCleared}</h2> }
                        </div>

                        <SimpleBar className="mt-1 mb-3" style={{ height: '13vh' }} autoHide={false}>
                            <div id="Popup-Comment" className="d-flex justify-content-center">
                                {props.gameInstructions}
                            </div>
                        </SimpleBar>
                        
                        <div className="d-flex justify-content-center mb-2">
                            <button id="Retry-Button" onClick={() => { 
                                close(); props.setOpen(false);
                                }} 
                            className="button btn-secondary">
                                Retry <FaPlay />
                            </button>
                        </div>

                    </div>
                }
                </>
            )}
        </Popup>
    );
}
