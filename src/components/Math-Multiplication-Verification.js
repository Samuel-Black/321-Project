/*
Author: Samuel Black
https://github.com/Samuel-Black
*/

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import './Math-Multiplication-Verification.scss';

// function used in home page to ensure child doesn't navigate to the login page by mistake
export default function MathMultiplicationVerification(props) {

    const [num1, setNum1] = useState(0); // first number in the multiplication equation
    const [num2, setNum2] = useState(0); // second number in the multiplication equation
    const [answer, setAnswer] = useState(0); // user's answer to the multiplication equation

    const navigate = useNavigate();

    // close the settings popup
    const closeModal = () => {
      props.setOpen(false);
    }

    useEffect(() => {
        setNum1(Math.floor(Math.random() * (6 - 2)) + 2); // generate a random integer between 2 and 5
        setNum2(Math.floor(Math.random() * (11 - 2)) + 2); // generate a random integer between 2 and 10
    }, []);

    const validateAnswer = () => {
        if(answer !== 0 || answer.length > 0) {
            if(num1 * num2 === parseInt(answer)) {
                navigate('/Login');
            }
        }
        console.log('false');
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
                    <div id='Equation-Popup-Header' className='row justify-content-center ml-4 mr-4 pt-1 pb-1 mt-2'>
                        Solve the equation to be redirected to the login page!
                    </div>
                    <div id='Equation-Popup-Content' className='row justify-content-center ml-5 mr-5 pt-3 pb-3 mt-3'>
                        <div className='d-flex justify-content-center align-items-center flex-wrap'>
                            <div className='d-flex'>{num1} x {num2} = &nbsp;</div>
                            <input type="number" id='Equation-Answer' className="form-control-lg" placeholder="?" value={answer} onChange={(e) => setAnswer(e.target.value)} />
                        </div>
                    </div>
                    <button type="button" id='Equation-Popup-Confirmation-Button' className="btn btn-secondary mt-3 mb-2" onClick={() => validateAnswer()}>Redirect</button>
                </div>
            </Popup>
        </div>
    );
}