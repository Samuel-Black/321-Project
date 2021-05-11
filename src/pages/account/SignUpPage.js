import React, { useState, useEffect } from 'react';
import { signupUser, confirmUserSignUp, useAuthState, useAuthDispatch } from '../../libs';
import { Auth } from 'aws-amplify';
import { Link } from 'react-router-dom';
import { Oval } from 'react-loading-icons';
import { useNavigate } from 'react-router-dom';
import ReactCodeInput from 'react-verification-code-input';
import PasswordStrengthBar from 'react-password-strength-bar';
import './SignupPage.scss';
const passwordValidator = require('password-validator');
const isEmail = require('sane-email-validation');

export default function SignupPage() {
    
    const schema = new passwordValidator();
    const navigate = useNavigate();

    schema
    .is().min(8)                                    // Minimum length 8
    .is().max(16)                                  // Maximum length 100
    .has().uppercase(1)                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits(1)                                // Must have at least 1 digit
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123', 'Spacebar123', 'Qwerty123', 'Asdf123']);

    const [email, setEmail] = useState('');
    const [emailFocused, setEmailFocused] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
    const [authenticationSuccesful, setAuthenticationSuccesful] = useState(false);
    const [authenticationCode, setAuthenticationCode] = useState('');
    const [allValidCredentials, setAllValidCredentials] = useState(false);
    const [step, setStep] = useState(0);
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [confirmPasswordError, setConfirmPasswordError] = useState(null);
    const [authCodeError, setAuthCodeError] = useState(null);
    const [autoCompleteSignUp, setAutoCompleteSignUp] = useState(false);

    const dispatch = useAuthDispatch();
    let { loading, errorMessage } = useAuthState();

    useEffect(() => {
        if (email.length > 0 && !emailFocused && !isEmail(email)) // If there is something in the email input field, and It's not focused, and the address Isn't valid, set error message
            setEmailError(`${email} is not a valid email address.`);
        else if (isEmail(email) || email.length === 0) 
            setEmailError(null);
    }, [email, emailFocused]);

    useEffect(() => {
        if (!passwordFocused && !schema.validate(password) && password.length > 0) {
            const errors = schema.validate(password, {list: true});
            let errorMessageString = 'Password must ';
            for (let i = 0; i < errors.length; i++) {
                errorMessageString += `${PasswordErrorMessage(errors[i])}${(i === errors.length - 1) ? '.' : ', '}`;
            }
            setPasswordError(errorMessageString);
        }
        else if (schema.validate(password) || password.length === 0)
            setPasswordError(null);
    }, [passwordFocused]);

    function PasswordErrorMessage(val) {
        switch(val) {
            case 'min':
                return 'be at least 8 characters';
            case 'spaces':
                return 'not contain spaces';
            case 'uppercase':
                return 'have at least 1 uppercase letter';
            case 'lowercase':
                return 'have at least 1 uppercase letter';
            case 'digits':
                return 'have at least 2 numbers';
            case 'oneOf':
                return ` not be a common password: ${password}`;
        }
    }

    useEffect(() => {
        if (confirmPassword.length > 0 && password.length > 0 && password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match.');
        }
        else if (password == confirmPassword || confirmPassword.length === 0)
            setConfirmPasswordError(null);
    }, [confirmPassword]);


    useEffect(() => {
        errorMessage = null;
    }, []);

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            await signupUser(dispatch, { email, password });
            setStep(1);
        } catch (error) {
            errorMessage = error;
        } 
    }
    
    const confirmSignUp = async () => {
        setAuthCodeError(null);
        try {
            await Auth.confirmSignUp(email, authenticationCode);
            navigate('../Login');
        } catch (error) {
            setAuthCodeError(error);
        }
    }

    useEffect(() => {
        if(authenticationCode.length === 6 && autoCompleteSignUp === true) {
            confirmSignUp();
            setAutoCompleteSignUp(false);
        }
    }, [autoCompleteSignUp]);

    const validateCredentials = () => {
        if(isEmail(email) && schema.validate(password) && password === confirmPassword) 
            setAllValidCredentials(true);
        else 
            setAllValidCredentials(false);
    }

    useEffect(() => {
        validateCredentials();
    }, [email, password, confirmPassword, confirmPasswordError])
    
    useEffect(() => {
        if(authenticationSuccesful === true) {
            authenticationSuccesful(false);
        }
    }, [authenticationSuccesful])

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
                                                    <input type="password" id="confirmPassword" className="form-control-lg" placeholder="confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} name="confirmPassword" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required disabled={loading} onFocus={() => setConfirmPasswordFocused(true)} onBlur={() => setConfirmPasswordFocused(false)} />
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