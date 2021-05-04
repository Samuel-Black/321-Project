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

    function returnMinusFirstCap() { // return a string with the first letter converted to lower case
        var firstLetter = props.gameDescription.substr(0, 1);
        let lowerCased = firstLetter.toLowerCase() + props.gameDescription.substr(1);
        return lowerCased;
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
                            {props.levelsCleared > props.numLevels ? <h2 id="Level-Text" className="row justify-content-center">Great job, You did it!</h2> : <h2 id="Level-Text" className="row justify-content-center">Level {props.levelsCleared}</h2> }
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
                                <SimpleBar className="mt-1 mb-3" style={{ maxHeight: '25vh' }} autoHide={false}>
                                    <div id="Popup-Comment" className="d-flex justify-content-center">
                                        {props.levelsCleared > 1 ?
                                            <>
                                                Great job! <br />
                                                {(props.gameType === 'Mix & Match' && props.levelsCleared >= 2) ?
                                                    <>
                                                        {props.gameInstructions[1]}
                                                    </>
                                                :
                                                    <>
                                                        {props.gameInstructions}
                                                    </>
                                                }
                                            </>
                                        :
                                            <>
                                                {props.gameType === 'Mix & Match' ?
                                                    <>
                                                        {props.gameDescription}<br />
                                                        {props.gameInstructions[0]}
                                                    </>
                                                :
                                                    <>
                                                        {props.gameDescription}<br />
                                                        {props.gameInstructions}
                                                    </>
                                                }
                                            </>
                                        }
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

                        <SimpleBar className="mt-1 mb-3" style={{ maxHeight: '25vh' }} autoHide={false}>
                            <div id="Popup-Comment" className="d-flex justify-content-center">
                                    Oops!<br />Remember,&nbsp; 
                                    {props.levelsCleared > 1 ?
                                        <>
                                            {props.gameType === 'Mix & Match' ?
                                                <>
                                                    {returnMinusFirstCap()}<br />
                                                    {props.gameInstructions[1]}
                                                </>
                                            :
                                                <>
                                                    {returnMinusFirstCap()}<br />
                                                    {props.gameInstructions}
                                                </>
                                            }
                                        </>
                                    :
                                        <>
                                            {props.gameType === 'Mix & Match' ?
                                                <>
                                                    {returnMinusFirstCap()}<br />
                                                    {props.gameInstructions[0]}
                                                </>
                                            :
                                                <>
                                                    {returnMinusFirstCap()}<br />
                                                    {props.gameInstructions}
                                                </>
                                            }
                                        </>
                                    }
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
