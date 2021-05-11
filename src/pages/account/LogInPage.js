import { loginUser, useAuthState, useAuthDispatch } from '../../libs';
import { Auth } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Oval } from 'react-loading-icons';
import PasswordStrengthBar from 'react-password-strength-bar';
import ReactCodeInput from 'react-verification-code-input';
import './LoginPage.scss';

const passwordValidator = require('password-validator');

export default function LoginPage() {
    
    const schema = new passwordValidator();

    schema
    .is().min(8)                                    // Minimum length 8
    .is().max(16)                                  // Maximum length 100
    .has().uppercase(1)                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits(1)                                // Must have at least 1 digit
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123', 'Spacebar123', 'Qwerty123', 'Asdf123']);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
    const [resetPassword, setResetPassword] = useState('');
    const [confirmResetPassword, setConfirmResetPassword] = useState('');
    const [confirmResetPasswordError, setConfirmResetPasswordError] = useState('');
    const [resetPasswordEmailError, setResetPasswordEmailError] = useState(null);
    const [resetPasswordError, setResetPasswordError] = useState(null);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [authCode, setAuthCode] = useState(null);
    const [authCodeError, setAuthCodeError] = useState(null);
    const [step, setStep] = useState(0);

    const dispatch = useAuthDispatch();
    
    let { loading, errorMessage } = useAuthState();

    useEffect(() => {
        errorMessage = null;
    }, []);

    useEffect(() => {
        if (!passwordFocused && !schema.validate(resetPassword) && resetPassword.length > 0) {
            const errors = schema.validate(resetPassword, {list: true});
            let errorMessageString = 'Password must ';
            for (let i = 0; i < errors.length; i++) {
                errorMessageString += `${PasswordErrorMessage(errors[i])}${(i === errors.length - 1) ? '.' : ', '}`;
            }
            setResetPasswordError(errorMessageString);
        }
        else if (schema.validate(password) || password.length === 0)
            setResetPasswordError(null);
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
                return ` not be a common password: ${resetPassword}`;
        }
    }

    useEffect(() => {
        if (confirmResetPassword.length > 0 && resetPassword.length > 0 && resetPassword !== confirmResetPassword) {
            setConfirmResetPasswordError('Passwords do not match.');
        }
        else if (password == confirmPassword || confirmPassword.length === 0)
            setConfirmResetPasswordError(null);
    }, [confirmResetPassword]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await loginUser(dispatch, { email, password });
        } catch (error) {
            errorMessage = error;
        }
    }

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            await Auth.forgotPassword(forgotPasswordEmail);
            setStep(2);
            setResetPasswordEmailError(null);
        }
        catch (error) {
            setResetPasswordEmailError(error);
        }
    }

    const handleResetPasswordAuth = async (e) => {
        e.preventDefault();
        try {
            await Auth.forgotPasswordSubmit(forgotPasswordEmail, authCode, resetPassword);
            setStep(0);
            setResetPasswordError(null);
        }
        catch (error) {
            setResetPasswordError(error);
        }
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
                                    <div className="d-flex">
                                        <label htmlFor="email">Email</label>
                                    </div>
                                    <div className="d-flex">
                                        <div className="form-group">
                                            <input type="text" id='email' className="form-control-lg" placeholder="email" value={forgotPasswordEmail} onChange={(e) => setForgotPasswordEmail(e.target.value)} disabled={loading} />
                                        </div>
                                    </div>
                                    {resetPasswordEmailError !== null ? <p>{resetPasswordEmailError.message}</p> : null}
                                    <div className="d-flex justify-content-end">
                                        {loading === true && <Oval />}<button id="Login-Button" className='btn btn-secondary' onClick={handleResetPassword} disabled={loading}>Reset</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {step === 2 &&
                        <div className="container">
                            <div className="row justify-content-center pb-4">
                                <h2>Check your email for the code.</h2>
                            </div>
                            <div className="row justify-content-center">
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
                                        <ReactCodeInput type={'number'} fields={6} autoFocus loading={loading} onChange={(code) => setAuthCode(code)} />
                                    </div>
                                    <div className="d-flex">
                                        <label htmlFor="password" className="align-self-center">New Password</label>
                                    </div>
                                    <div className="d-flex">
                                        <div className="form-group mb-0">
                                            <input type="password" id="password" className="form-control-lg" placeholder="password" value={resetPassword} onChange={(e) => setResetPassword(e.target.value)} name="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required disabled={loading} onFocus={() => setPasswordFocused(true)} onBlur={() => setPasswordFocused(false)} />
                                            <PasswordStrengthBar className="pt-1 password-strength-bar" password={resetPassword} minLength={8} />
                                        </div>
                                    </div>
                                    {resetPasswordError}
                                    <div className="d-flex">
                                        <label htmlFor="confirmPassword" className="align-self-center">Confirm New Password</label>
                                    </div>
                                    <div className="d-flex">
                                        <div className="form-group">
                                            <input type="password" id="confirmPassword" className="form-control-lg" placeholder="confirm password" value={confirmResetPassword} onChange={(e) => setConfirmResetPassword(e.target.value)} name="confirmPassword" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required disabled={loading} onFocus={() => setConfirmPasswordFocused(true)} onBlur={() => setConfirmPasswordFocused(false)} />
                                        </div>
                                    </div>
                                    {confirmResetPasswordError}
                                    {resetPasswordError !== null ? <p>{resetPasswordError.message}</p> : null}
                                    <div className="d-flex justify-content-end">
                                        {loading === true && <Oval />}<button id="Reset-Password-Button" className='btn btn-secondary' onClick={handleResetPasswordAuth} disabled={loading}>Reset</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
