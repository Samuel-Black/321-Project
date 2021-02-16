import React, { useState } from 'react'
import Popup from 'reactjs-popup'
import './Game-Popup.scss'
import { BsStarFill, BsStar } from 'react-icons/bs'
import { TiHome, TiArrowBack } from 'react-icons/ti'
import { FaPlay } from 'react-icons/fa'

let stars = [];

function returnStars(props) {
    for(let i = 0; i < 3; i++) {
        if(i < props.levelsCleared) {
            stars[i] = <BsStarFill />
        }
        else if(i == props.levelsCleared) {
            stars[i] = <BsStarFill activeStar={i == props.levelsCleared ? " activeStar" : ""} />
        }
        else {
            stars[i] = <BsStar />
        }
    }
    console.log(stars)
    return stars;
}

const PopupExample = (props) => (
    
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
                    <h2 id="Level-Text" className="row justify-content-md-center">Level {props.levelsCleared + 1}</h2>
                </div>
                <div className="d-flex justify-content-start">
                    <a
                        id="Popup-Back-Button"
                        onClick={() => {
                            close();
                        }}
                    >
                        <TiArrowBack />Back
                    </a>
                    <a
                        id="Popup-Play-Button"
                        className="ml-auto"
                        onClick={() => {
                            close();
                        }}
                    >
                        Play<FaPlay />
                    </a>
                </div>
            </div>
        )}
    </Popup>
);

export default PopupExample;