/*
Author: Samuel Black
https://github.com/Samuel-Black
*/

import { loginUser, useAuthState, useAuthDispatch } from '../../libs';
import { Auth } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Oval } from 'react-loading-icons';
import PasswordStrengthBar from 'react-password-strength-bar';
import ReactCodeInput from 'react-verification-code-input';
import PasswordValidator, { getPasswordErrorMessage } from './PasswordValidator';
import './LoginPage.scss';

export default function LoginPage() {

    const [step, setStep] = useState(0); // 0 is login "page", 1 is input email "page" for forgotten password, 2 is confirm auth code and new password "page"

    // step == 0, states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // step == 1, states
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
    const [forgotPasswordEmailError, setForgotPasswordEmailError] = useState(null);

    // step == 2, states
    const [resetPassword, setResetPassword] = useState('');
    const [resetPasswordFocused, setResetPasswordFocused] = useState(false);
    const [resetPasswordError, setResetPasswordError] = useState(null);

    const [confirmResetPassword, setConfirmResetPassword] = useState('');
    const [confirmResetPasswordError, setConfirmResetPasswordError] = useState('');

    const [authenticationCode, setAuthenticationCode] = useState('');
    const [authCodeError, setAuthCodeError] = useState(null);

    const [allValidCredentials, setAllValidCredentials] = useState(false); // if password confirm password and authentication code are valid, true
    const [loading, setLoading] = useState(false); // some AWS Auth promise responses were causing errors with reducer

    const dispatch = useAuthDispatch(); // reducer
    let { errorMessage } = useAuthState(); // errors for AWS auth functionality

    // set errorMessage to null on component mount
    useEffect(() => {
        errorMessage = null;
    }, []);

    // set the password error message
    useEffect(() => {
        setResetPasswordError(getPasswordErrorMessage(resetPassword, resetPasswordFocused));
    }, [resetPasswordFocused]);

    // alert user if passwords do not match
    useEffect(() => {
        if (confirmResetPassword.length > 0 && resetPassword.length > 0 && resetPassword !== confirmResetPassword) {
            setConfirmResetPasswordError('Passwords do not match.');
        }
        else if (resetPassword == confirmResetPassword || confirmResetPassword.length === 0)
            setConfirmResetPasswordError(null);
    }, [confirmResetPassword]);

    // if the promise from the reducer returns without an error, the user is logged in and directed to the app home page
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await loginUser(dispatch, { email, password });
            setLoading(false);
        } catch (error) {
            errorMessage = error;
            setLoading(false);
        }
    }

    // if the promise 
    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await Auth.forgotPassword(forgotPasswordEmail);
            setStep(2);
            setForgotPasswordEmailError(null);
            setLoading(false);
        }
        catch (error) {
            setForgotPasswordEmailError(error);
            setLoading(false);
        }
    }

    // if the promise 
    const handleResetPasswordAuth = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await Auth.forgotPasswordSubmit(forgotPasswordEmail, authenticationCode, resetPassword);
            setStep(0);
            setResetPasswordError(null);
            setLoading(false);
        }
        catch (error) {
            setResetPasswordError(error.message);
            setLoading(false);
        }
    }

    // notify user if authentication code is not the appropriate length
    useEffect(() => {
        if(authenticationCode.length === 6) 
            setAuthCodeError(null);
        else 
            setAuthCodeError('Authentication Code must be 6 numbers.');
    }, [authenticationCode]);

    // check for all valid inputs
    useEffect(() => {
        validateCredentials();
    }, [authenticationCode, resetPassword, confirmResetPassword, confirmResetPasswordError]);

    // if the authentication code, password, password confirmation and authentication code are all valid, set to true
    const validateCredentials = () => {
        if(PasswordValidator.validate(resetPassword) && resetPassword === confirmResetPassword && authenticationCode.length === 6) 
            setAllValidCredentials(true);
        else 
            setAllValidCredentials(false);
    }

    return (
        <div id="Login-Background">
            <div className="container">
                <div id="Title-Row" className="row">
                    <div className="container">
                        <div id="Login-Title" class="row justify-content-center mt-5">
                            <h1>JumpStart</h1>
                        </div>
                    </div>
                </div>
                <div id="Login-Content-Row" className="row">
                    
                    {/* default display, log in form */}
                    {step === 0 &&
                        <div className="container">
                            <div className="row justify-content-center">
                                <h2>Sign In</h2>
                            </div>
                            <div className="row justify-content-center">
                                <div id="Login-Content" className="d-inline-flex flex-column align-items-center justify-content-center">
                                    <span>Don't have an account?&nbsp;
                                        <Link to='../Signup'>
                                            <a>Sign Up Here</a>
                                        </Link>
                                    </span>
                                    <form className="mt-3">
                                        <div className="d-flex">
                                            <label htmlFor="email">Email</label>
                                        </div>
                                        <div className="d-flex">
                                            <div className="form-group">
                                                <input type="text" id='email' className="form-control-lg" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} />
                                            </div>
                                        </div>
                                        <div className="d-flex">
                                            <label htmlFor="password" className="align-self-center">Password</label>
                                        </div>
                                        <div className="d-flex">
                                            <div className="form-group">
                                                <input type="password" id='password' className="form-control-lg" placeholder="password" value={password} minLength={8} onChange={(e) => setPassword(e.target.value)} disabled={loading} />
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-end">{errorMessage ? <p>{errorMessage}</p> : null}</div>
                                        <span>
                                            <a id="Forgot-Password-Link" onClick={() => setStep(1)}>
                                                <a>Forgot your password?</a>
                                            </a>
                                        </span>
                                        <div className="d-flex justify-content-end">
                                            {loading === true && <Oval />}<button id="Login-Button" className='btn btn-secondary' onClick={handleLogin} disabled={loading}>login</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    }

                    {/* input email for password reset form */}
                    {step === 1 &&
                        <div className="container">
                            <div className="row justify-content-center pb-4">
                                <h2>Reset your password</h2>
                            </div>
                            <div className="row justify-content-center">
                                <div id="Login-Content" className="d-inline-flex flex-column align-items-center justify-content-center">
                                    <span className='pb-3'>Return to login?&nbsp;
                                        <a onClick={() => setStep(0)} className='return-to-login-link'>
                                            <a>Click Here</a>
                                        </a>
                                    </span>
                                    <form>
                                        <div className="d-flex">
                                            <label htmlFor="email">Email</label>
                                        </div>
                                        <div className="d-flex">
                                            <div className="form-group">
                                                <input type="text" id='email' className="form-control-lg" placeholder="email" value={forgotPasswordEmail} onChange={(e) => setForgotPasswordEmail(e.target.value)} disabled={loading} />
                                            </div>
                                        </div>
                                        {forgotPasswordEmailError !== null ? <p>{forgotPasswordEmailError.message}</p> : null}
                                        <div className="d-flex justify-content-end">
                                            {loading === true && <Oval />}<button id="Login-Button" className='btn btn-secondary' onClick={handleResetPassword} disabled={loading}>Reset</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    }

                    {/* input authentication code, password, and password confirmation for for password reset form */}
                    {step === 2 &&
                        <div className="container">
                            <div className="row justify-content-center pb-4">
                                <h2>Check your email for the code.</h2>
                            </div>
                            <div className="row justify-content-center">
                                <form>
                                    <div id="Login-Content" className="d-inline-flex flex-column align-items-center justify-content-center">
                                        <div className="d-flex">
                                            <label htmlFor="email">Email</label>
                                        </div>
                                        <div className="d-flex pb-4">
                                            <input type="text" style={{color: "white"}} value={forgotPasswordEmail} className="form-control-lg" disabled name="email" />
                                        </div>
                                        <div className="d-flex">
                                            <label htmlFor="authenticationCode" className="align-self-center">Authentication Code</label>
                                        </div>
                                        <div id="Auth-Code-Input-Container" className="d-flex justify-content-center">
                                            <ReactCodeInput type={'number'} fields={6} autoFocus loading={loading} onChange={(code) => setAuthenticationCode(code)} />
                                        </div>
                                        {authCodeError}
                                        <div className="d-flex">
                                            <label htmlFor="password" className="align-self-center">New Password</label>
                                        </div>
                                        <div className="d-flex">
                                            <div className="form-group mb-0">
                                                <input type="password" id="password" className="form-control-lg" placeholder="password" value={resetPassword} onChange={(e) => setResetPassword(e.target.value)} name="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required disabled={loading} onFocus={() => setResetPasswordFocused(true)} onBlur={() => setResetPasswordFocused(false)} />
                                                <PasswordStrengthBar className="pt-1 password-strength-bar" password={resetPassword} minLength={8} />
                                            </div>
                                        </div>
                                        <div className="d-flex">
                                            <label htmlFor="confirmPassword" className="align-self-center">Confirm New Password</label>
                                        </div>
                                        <div className="d-flex">
                                            <div className="form-group">
                                                <input type="password" id="confirmPassword" className="form-control-lg" placeholder="confirm password" value={confirmResetPassword} onChange={(e) => setConfirmResetPassword(e.target.value)} name="confirmPassword" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required disabled={loading} />
                                            </div>
                                        </div>
                                        {confirmResetPasswordError}
                                        {resetPasswordError}
                                        <div className="d-flex justify-content-end">
                                            {loading === true && <Oval />}<button id="Reset-Password-Button" className={`btn btn-secondary ${allValidCredentials ? '' : 'button-disabled'}`} onClick={handleResetPasswordAuth} disabled={loading}>Reset</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
