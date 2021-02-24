import { loginUser, useAuthState, useAuthDispatch } from '../../libs'
import React, { useState } from 'react'
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';

export default function LoginPage(props) {

    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useAuthDispatch()
    const { loading, errorMessage } = useAuthState() //read the values of loading and errorMessage from context

const handleLogin = async (e) => {
    e.preventDefault()
    try {
        await loginUser(dispatch, { email, password })
        navigate('../')
    } catch (error) {
        console.log(error)
    }
}

    return (
        <div>
            <div className={{ width: 200 }}>
                <h1>Login Page</h1>
                {
                    errorMessage ? <p>{errorMessage}</p> : null
                }
                <form >
                    <div>
                        <div>
                            <label htmlFor="email">Username</label>
                            <input type="text" id='email' value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input type="password" id='password' value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} />
                        </div>
                    </div>
                    <button onClick={handleLogin} disabled={loading}>login</button>
                </form>
            </div>
        </div>
    )
}