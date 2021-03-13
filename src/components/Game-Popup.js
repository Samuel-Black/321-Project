import React from 'react'
import Popup from 'reactjs-popup'
import './Game-Popup.scss'
import { BsStarFill, BsStar } from 'react-icons/bs'
import { TiHome, TiArrowBack } from 'react-icons/ti'
import { FaPlay } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';


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
    
    let navigate = useNavigate();

    return(
        <Popup open={props.open} closeOnDocumentClick={false} closeOnEscape={false} lockScroll={true} modal>
            {close => (
                <>
                {props.levelPassed ?
                    <div className="game-popup container">
                        <div className="header col-lg-12">
                            <h1 className="row justify-content-md-center">{props.gameTitle}</h1>
                        </div>
                        <div className="content col-lg-12">
                            <div className="row justify-content-md-center">
                                {returnStars(props).map((star,i) =>
                                    <div key={i} className={star.props.activestar}>
                                        {star}
                                    </div>
                                )
                                }
                            </div>
                            {props.levelsCleared > props.numLevels ? <h2 id="Level-Text" className="row justify-content-md-center">You did it!</h2> : <h2 id="Level-Text" className="row justify-content-md-center">Level {props.levelsCleared}</h2> }
                        </div>

                        {props.levelsCleared > props.numLevels ?
                            <div className="d-flex justify-content-center">
                                <a
                                    id="Popup-Home-Button"
                                    onClick={() => {
                                        navigate(-1)
                                    }}
                                >
                                    <span>Home</span><span id="Play-Icon"><TiHome /></span>
                                </a>
                            </div>
                            :
                            <div className="d-flex justify-content-center">
                                <a
                                    id="Popup-Play-Button"
                                    onClick={() => {
                                        close()
                                        props.setOpen(false)
                                    }}
                                >
                                    <span>Play</span><span id="Play-Icon"><FaPlay /></span>
                                </a>
                            </div>
                        }

                    </div>

                    :

                    <div className="game-popup container">
                        <div className="header col-lg-12">
                            <h1 className="row justify-content-md-center">{props.gameTitle}</h1>
                        </div>
                        <div className="content col-lg-12">
                            <div className="row justify-content-md-center">
                                {returnStars(props).map((star, i) =>
                                    <div key={i} className={star.props.activestar}>
                                        {star}
                                    </div>
                                )
                                }
                            </div>
                            {props.levelsCleared > props.numLevels ? <h2 id="Level-Text" className="row justify-content-md-center">Try Again!</h2> : <h2 id="Level-Text" className="row justify-content-md-center">Level {props.levelsCleared}</h2> }
                        </div>
                        
                        <div className="d-flex justify-content-center">
                            <a
                                id="Popup-Play-Button"
                                onClick={() => {
                                    close()
                                    props.setOpen(false)
                                }}
                            >
                                <span>Retry</span><span id="Play-Icon"><FaPlay /></span>
                            </a>
                        </div>

                    </div>
                }
                </>
            )}
        </Popup>
    );
}
