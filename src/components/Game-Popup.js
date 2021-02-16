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
        if(i < props.levelsCleared) {
            stars[i] = <BsStarFill />
        }
        else if(i == props.levelsCleared) {
            stars[i] = <BsStarFill activeStar=" activeStar" />
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
        <Popup open={true} closeOnDocumentClick={false} closeOnEscape={false} lockScroll={true} modal>
            {close => (
                <div className="game-popup container">
                    <div className="header col-lg-12">
                        <h1 className="row justify-content-md-center">{props.gameTitle}</h1>
                    </div>
                    <div className="content col-lg-12">
                        <div className="row justify-content-md-center">
                            {returnStars(props).map((star) =>
                                <div className={star.props.activeStar}>
                                    {star}
                                </div>
                            )
                            }
                        </div>
                        {props.levelsCleared >= props.numLevels ? <h2 id="Level-Text" className="row justify-content-md-center">You did it!</h2> : <h2 id="Level-Text" className="row justify-content-md-center">Level {props.levelsCleared + 1}</h2> }
                    </div>

                    {props.levelsCleared >= props.numLevels ?
                        <div className="d-flex justify-content-center">
                            <a
                                id="Popup-Home-Button"
                                onClick={() => {
                                    navigate(-1);
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
                                    close();
                                }}
                            >
                                <span>Play</span><span id="Play-Icon"><FaPlay /></span>
                            </a>
                        </div>
                    }

                </div>
            )}
        </Popup>
    );
}
