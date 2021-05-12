/*
Author: Samuel Black
https://github.com/Samuel-Black
*/

import React, { useState, useEffect } from 'react';
import { signupUser, confirmUserSignUp, useAuthState, useAuthDispatch } from '../../libs';
import { Auth } from 'aws-amplify';
import { Link } from 'react-router-dom';
import { Oval } from 'react-loading-icons';
import { useNavigate } from 'react-router-dom';
import ReactCodeInput from 'react-verification-code-input';
import PasswordStrengthBar from 'react-password-strength-bar';
import PasswordValidator, { getPasswordErrorMessage } from './PasswordValidator';
import './SignupPage.scss';
const isEmail = require('sane-email-validation');

export default function SignupPage() {
    
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [emailFocused, setEmailFocused] = useState(false);
    const [emailError, setEmailError] = useState(null);

    const [password, setPassword] = useState('');
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [passwordError, setPasswordError] = useState(null);

    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState(null);

    const [authenticationCode, setAuthenticationCode] = useState(''); 
    const [authCodeError, setAuthCodeError] = useState(null);

    const [step, setStep] = useState(0); // 0 is sign up "page", 1 is input authentication code sent via email "page"
    const [allValidCredentials, setAllValidCredentials] = useState(false); // if email, password and confirm password are valid, true
    const [autoCompleteSignUp, setAutoCompleteSignUp] = useState(false); // if authentication code input has 6 numbers, true

    const dispatch = useAuthDispatch(); // reducer
    let { loading, errorMessage } = useAuthState(); // errors/loading for AWS auth functionality

    // If there is something in the email input field, and It's not focused, and the address Isn't valid, set error message
    useEffect(() => {
        if (email.length > 0 && !emailFocused && !isEmail(email)) 
            setEmailError(`${email} is not a valid email address.`);
        else if (isEmail(email) || email.length === 0) 
            setEmailError(null);
    }, [email, emailFocused]);

    // set the password error message
    useEffect(() => {
        setPasswordError(getPasswordErrorMessage(password, passwordFocused));
    }, [passwordFocused]);

    // If the password input field and the confirm password input field do not match, prompt the user
    useEffect(() => {
        if (confirmPassword.length > 0 && password.length > 0 && password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match.');
        }
        else if (password == confirmPassword || confirmPassword.length === 0)
            setConfirmPasswordError(null);
    }, [confirmPassword]);


    // set the error message to null on component mount
    useEffect(() => {
        errorMessage = null;
    }, []);

    // if the promise from the reducer returns without an error, set the "page" to the authentication code input "page" [(setStep()]
    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            await signupUser(dispatch, { email, password });
            setStep(1);
        } catch (error) {
            errorMessage = error;
        } 
    }
    
    // if the promise from the reducer returns without an error, authentication was succesful, redirect the user to the login page
    const confirmSignUp = async () => {
        setAuthCodeError(null);
        try {
            await Auth.confirmSignUp(email, authenticationCode);
            navigate('../Login');
        } catch (error) {
            setAuthCodeError(error);
        }
    }

    // if the authentication code in setStep(1) contains 6 numbers, automatically send the form for authentication 
    useEffect(() => {
        if(authenticationCode.length === 6 && autoCompleteSignUp === true) {
            confirmSignUp();
            setAutoCompleteSignUp(false);
        }
    }, [autoCompleteSignUp]);

    // if email, password and password confirmation are all valid, set to true
    const validateCredentials = () => {
        if(isEmail(email) && PasswordValidator.validate(password) && password === confirmPassword) 
            setAllValidCredentials(true);
        else 
            setAllValidCredentials(false);
    }

    // on below state changes, check if all are valid
    useEffect(() => {
        validateCredentials();
    }, [email, password, confirmPassword, confirmPasswordError]);

    return (
        <div id="Signup-Background">
            <div className="container pb-5">
                <div id="Title-Row" className="row">
                    <div className="container">
                        <div id="Signup-Title" class="row justify-content-center">
                            <h1>JumpStart</h1>
                        </div>
                    </div>
                </div>
                <div id="Signup-Content-Row" className="row mt-4">
                    <div className="container">
                        <div className="row justify-content-center">
                            <h2>{step === 0 ? 'Sign Up' : 'Confirm Sign Up'}</h2>
                        </div>
                        <div className="row justify-content-center">
                            <div id="Signup-Content" className="d-inline-flex flex-column align-items-center justify-content-center">
                                
                                {/* default display, sign up form*/}
                                {step === 0 &&
                                    <>
                                        <span>Already have an account?&nbsp;
                                            <Link to='../Login'>
                                                <a>Log In Here</a>
                                            </Link>
                                        </span>
                                        <form className="mt-3">
                                            <div className="d-flex">
                                                <label htmlFor="email" className="align-self-center">Email</label>
                                            </div>
                                            <div className="d-flex">
                                                <div className="form-group">
                                                    <input type="text" id="email" className="form-control-lg" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" required disabled={loading} onFocus={() => setEmailFocused(true)} onBlur={() => setEmailFocused(false)} />
                                                    
                                                </div>
                                            </div>
                                            {emailError}
                                            <div className="d-flex">
                                                <label htmlFor="password" className="align-self-center">Password</label>
                                            </div>
                                            <div className="d-flex">
                                                <div className="form-group mb-0">
                                                    <input type="password" id="password" className="form-control-lg" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required disabled={loading} onFocus={() => setPasswordFocused(true)} onBlur={() => setPasswordFocused(false)} />
                                                    <PasswordStrengthBar className="pt-1 password-strength-bar" password={password} minLength={8} />
                                                </div>
                                            </div>
                                            {passwordError}
                                            <div className="d-flex">
                                                <label htmlFor="confirmPassword" className="align-self-center">Confirm Password</label>
                                            </div>
                                            <div className="d-flex">
                                                <div className="form-group">
                                                    <input type="password" id="confirmPassword" className="form-control-lg" placeholder="confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} name="confirmPassword" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required disabled={loading} />
                                                </div>
                                            </div>
                                            {confirmPasswordError}
                                            <div className="d-flex justify-content-end">{errorMessage ? <p>{errorMessage}</p> : null}</div>
                                            <div className="d-flex justify-content-end">
                                                {loading === true && <Oval />}<button id='Signup-Button' className={`btn btn-secondary ${allValidCredentials ? '' : 'button-disabled'}`} onClick={handleSignUp} disabled={loading}>Create</button>
                                            </div>
                                        </form>
                                    </>
                                }
                                {/* authentication code input */}
                                {step === 1 && 
                                    <div>
                                        <div className="d-flex pt-4">
                                            <label htmlFor="email" className="align-self-center">Email</label>
                                        </div>
                                        <div className="d-flex pb-4">
                                            <input type="text" style={{color: "white"}} value={email} className="form-control-lg" disabled name="email" />
                                        </div>
                                        <div className="d-flex">
                                            <label htmlFor="authenticationCode" className="align-self-center">Authentication Code</label>
                                        </div>
                                        <div id="Auth-Code-Input-Container" className="d-flex justify-content-center">
                                            <ReactCodeInput type={'number'} fields={6} autoFocus loading={loading} onChange={(code) => setAuthenticationCode(code)} onComplete={() => setAutoCompleteSignUp(true)} />
                                        </div>
                                        <div className="d-flex justify-content-center">{authCodeError !== null ? <p>{authCodeError.message}</p> : null}</div>
                                        <div className="d-flex justify-content-center pt-5">
                                            {loading === true && <Oval />}<button id="Signup-Authenticate-Button" className='btn btn-secondary' onClick={confirmSignUp} disabled={loading} >Authenticate</button>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}