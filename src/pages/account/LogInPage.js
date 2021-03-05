import { loginUser, useAuthState, useAuthDispatch, useAuthUser } from '../../libs'
import React, { useState } from 'react'
import { Navigate, Link } from 'react-router-dom';
import { Oval } from 'react-loading-icons'
import './LoginPage.scss'

export default function LoginPage() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useAuthDispatch()
    
    let { loading, errorMessage } = useAuthState()

    errorMessage = null

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            await loginUser(dispatch, { email, password })
        } catch (error) {
            errorMessage = error
        }
    }

    return (
        <div id="Login-Background">
            <div className="container">
                <div id="Title-Row" className="row">
                    <div className="container">
                        <div id="Login-Title" class="row justify-content-md-center">
                            <h1>JumpStart</h1>
                        </div>
                    </div>
                </div>
                <div id="Login-Content-Row" className="row">
                    <div className="container">
                        <div className="row justify-content-md-center">
                            <h2>Sign In</h2>
                        </div>
                        <div className="row justify-content-md-center">
                            <div id="Login-Content" className="d-inline-flex flex-column align-items-center justify-content-center">
                                <span>Don't have an account?&nbsp;
                                    <Link to='../Signup'>
                                        <a>Sign Up Here</a>
                                    </Link>
                                </span>
                                <form className="mt-3">
                                    <div className="d-flex">
                                        <label htmlFor="email" className="align-self-center">Email</label>
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
                                    <div className="d-flex justify-content-end">
                                        {loading === true && <Oval />}<button id="Login-Button" onClick={handleLogin} disabled={loading}>login</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}