import React, { useState } from 'react'
import { signupUser, confirmUserSignUp, useAuthState, useAuthDispatch } from '../../libs'
import { Link } from 'react-router-dom';
import { Oval } from 'react-loading-icons'
import { useNavigate } from 'react-router-dom'
import './SignupPage.scss'

export default function SignupPage(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [authenticationCode, setAuthenticationCode] = useState('')
    const [step, setStep] = useState(0)

    const navigate = useNavigate();

    const dispatch = useAuthDispatch()
    let { loading, errorMessage } = useAuthState()

    errorMessage = null

    const handleSignUp = async (e) => {
        e.preventDefault()
        try {
            await signupUser(dispatch, { email, password })
            setStep(1)
        } catch (error) {
            console.log(error)
        }
    }
    
    const goBack = () => {
        setStep(0)
    }
    
    const confirmSignUp = async (e) => {
        e.preventDefault()
        try {
            await confirmUserSignUp(dispatch, { email, authenticationCode })
            if(errorMessage === null)
                navigate('../Login')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div id="Signup-Background">
            <div className="container">
                <div id="Title-Row" className="row">
                    <div className="container">
                        <div id="Login-Title" class="row justify-content-md-center">
                            <h1>JumpStart</h1>
                        </div>
                    </div>
                </div>
                <div id="Signup-Content-Row" className="row mt-4">
                    <div className="container">
                        <div className="row justify-content-md-center">
                            <h2>{step === 0 ? 'Sign Up' : 'Confirm Sign Up'}</h2>
                        </div>
                        <div className="row justify-content-md-center">
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
                                                    <input type="text" id="email" className="form-control-lg" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" required disabled={loading} />
                                                </div>
                                            </div>
                                            <div className="d-flex">
                                                <label htmlFor="password" className="align-self-center">Password</label>
                                            </div>
                                            <div className="d-flex">
                                                <div className="form-group">
                                                    <input type="password" id="password" className="form-control-lg" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required disabled={loading} />
                                                </div>
                                            </div>
                                            <div className="d-flex">
                                                <label htmlFor="confirmPassword" className="align-self-center">Confirm Password</label>
                                            </div>
                                            <div className="d-flex">
                                                <div className="form-group">
                                                    <input type="password" id="confirmPassword" className="form-control-lg" placeholder="confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} name="confirmPassword" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required disabled={loading} />
                                                </div>
                                            </div>
                                            <div className="d-flex">
                                                <label htmlFor="email" className="align-self-center">Phone Number</label>
                                            </div>
                                            <div className="d-flex">
                                                <div className="form-group">
                                                    <input type="tel" id="phoneNumber" className="form-control-lg" placeholder="phone number (optional)" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} name="phoneNumber" disabled={loading} />
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-end">{errorMessage ? <p>{errorMessage}</p> : null}</div>
                                            <div className="d-flex justify-content-end">
                                                {loading === true && <Oval />}<button onClick={handleSignUp} disabled={loading}>Create Account</button>
                                            </div>
                                        </form>
                                    </>
                                }
                                {step === 1 &&
                                    <div>
                                        <form className="mt-3">
                                            <div className="d-flex">
                                                <label htmlFor="email" className="align-self-center">Email</label>
                                            </div>
                                            <div className="d-flex">
                                                <div className="form-group">
                                                    <input type="text" value={email} className="form-control-lg" disabled name="email" />
                                                </div>
                                            </div>
                                            <div className="d-flex">
                                                <label htmlFor="authenticationCode" className="align-self-center">Authentication Code</label>
                                            </div>
                                            <div className="d-flex">
                                                <div className="form-group">
                                                    <input type="text" value={authenticationCode} className="form-control-lg" onChange={(e) => setAuthenticationCode(e.target.value)} name="authenticationCode" required />
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-end">{errorMessage ? <p>{errorMessage}</p> : null}</div>
                                            <div className="d-flex justify-content-between">
                                                <button onClick={goBack} disabled={loading}>Go Back</button>{loading === true && <Oval />}<button onClick={confirmSignUp} disabled={loading} >Authenticate</button>
                                            </div>
                                        </form>
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