import { loginUser, useAuthState, useAuthDispatch, useAuthUser } from '../../libs'
import React, { useState } from 'react'
import { Navigate, Link } from 'react-router-dom';
import './LoginPage.scss'

export default function LoginPage(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useAuthDispatch()
    const userData = useAuthUser()
    
    const { loading, errorMessage } = useAuthState()

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            await loginUser(dispatch, { email, password })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
        {userData != false ?
            <Navigate to={'../'} replace={true} />
            :
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
                                    <form>
                                        <div className="d-flex">
                                            <label htmlFor="email" className="mr-auto align-self-center">Email</label>
                                            <div className="form-group">
                                                <input type="text" id='email' className="form-control-lg" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} />
                                            </div>
                                        </div>
                                        <div className="d-flex">
                                            <label htmlFor="password" className="mr-auto align-self-center">Password</label>
                                            <div className="form-group">
                                                <input type="password" id='password' className="form-control-lg" placeholder="password" value={password} minLength={8} onChange={(e) => setPassword(e.target.value)} disabled={loading} />
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-end">{errorMessage ? <p>{errorMessage}</p> : null}</div>
                                        <div className="d-flex justify-content-end">
                                            <button onClick={handleLogin} disabled={loading}>login</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
        </>
    )
}