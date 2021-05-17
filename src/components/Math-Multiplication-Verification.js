/*
Author: Samuel Black
https://github.com/Samuel-Black
*/

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { RiCloseCircleLine } from 'react-icons/ri';
import './Math-Multiplication-Verification.scss';

// function used in home page to ensure child doesn't navigate to the login page by mistake
export default function MathMultiplicationVerification(props) {

    const [num1, setNum1] = useState(0); // first number in the multiplication equation
    const [num2, setNum2] = useState(0); // second number in the multiplication equation
    const [answer, setAnswer] = useState(0); // user's answer to the multiplication equation
    const [answerFocused, setAnswerFocused] = useState(0); // user's answer to the multiplication equation

    const [error, setError] = useState(null); // error message if incorrect answer

    const navigate = useNavigate();

    // close the settings popup
    const closeModal = () => {
      props.setOpen(false);
    }

    useEffect(() => {
        if(answerFocused) // If answer is focused set error to null in the event that user got the answer wrong and recieved an error message
            setError(null);
    }, [answerFocused]);

    // generate random integers on component mount
    useEffect(() => {
        setNum1(Math.floor(Math.random() * (6 - 2)) + 2); // generate a random integer between 2 and 5
        setNum2(Math.floor(Math.random() * (11 - 2)) + 2); // generate a random integer between 2 and 10
        setError(null); // ensure error is initialized as null on component mount
    }, []);
    
    // generate random integers on close and reopen of modal
    useEffect(() => {
        if(props.open) {
            setNum1(Math.floor(Math.random() * (6 - 2)) + 2); // generate a random integer between 2 and 5
            setNum2(Math.floor(Math.random() * (11 - 2)) + 2); // generate a random integer between 2 and 10
            setError(null); // ensure error is initialized as null on component mount
            setAnswer(0); // clear answer input
        }
    }, [props.open]);

    const validateAnswer = () => {
        if(answer !== 0 || answer.length > 0) { // ensure there is an integer to parse before parsing
            if(num1 * num2 === parseInt(answer)) {
                navigate('/Login');
                setError(null);
            }
        }
        setError("Oops! That's not the right answer.");
    }
    
    return ( 
        <div className='d-flex align-self-start mr-auto'>
            <Popup 
                modal
                open={props.open} 
                closeOnDocumentClick
                closeOnEscape
                onClose={closeModal}
            >
                <div id='Equation-Popup-Container' className='container'>
                    <div className='row'>
                        <div className='d-inline-flex ml-auto'>
                            <a onClick={() => closeModal()}>
                                <RiCloseCircleLine size={45} />
                            </a>
                        </div>
                    </div>
                    <div id='Equation-Popup-Header' className='row justify-content-center ml-4 mr-4 pt-1 pb-1 mt-2'>
                        Solve the equation to be redirected to the login page!
                    </div>
                    <div id='Equation-Popup-Content' className='row justify-content-center ml-5 mr-5 pt-3 pb-3 mt-3'>
                        <div className='d-flex justify-content-center align-items-center flex-wrap'>
                            <div className='d-flex'>{num1} x {num2} = &nbsp;</div>
                            <input type="number" id='Equation-Answer' className="form-control-lg" placeholder="?" value={answer} onChange={(e) => setAnswer(e.target.value)} onFocus={() => setAnswerFocused(true)} onBlur={() => setAnswerFocused(false)}  />
                        </div>
                    </div>
                    {error}
                    <button type="button" id='Equation-Popup-Confirmation-Button' className="btn btn-secondary mt-3 mb-2" onClick={() => validateAnswer()}>Redirect</button>
                </div>
            </Popup>
        </div>
    );
}