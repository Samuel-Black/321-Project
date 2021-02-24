import React, {Component} from 'react'
import { Auth } from 'aws-amplify'

export default class LogInPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            authenticationCode: '',
            step: 0
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    signUp = async () => {
        const { email, password } = this.state
        try {
            await Auth.signUp({ email, password })
            console.log('Sign up succesful!')
            this.setState({ step: 1 })
        } 
        catch (err) {
            console.log('Error signing up ', err)
        }
    }
    
    confirmSignUp = async () => {
        const { email, authenticationCode } = this.state
        try {
            await Auth.confirmSignUp(email, authenticationCode)
            console.log('Succesfully authenticated new user!')
        }
        catch(err) {
            console.log('Error confirming sign up ', err)
        }
    }

    render() {
        return (
            <div>
                {this.state.step === 0 &&
                    <div>
                        <span>Username: <input type="text" value={this.state.email} onChange={this.onChange} name="email" /></span>
                        <span>Password: <input type="text" value={this.state.pass} onChange={this.onChange} name="password" type="password" /></span>
                        <button onClick={this.signUp} />
                    </div>
                }
                {this.state.step === 1 &&
                    <div>
                        <span>Username: <input type="text" value={this.state.email} onChange={this.onChange} name="email" /></span>
                        <span>Authentication Code: <input type="text" value={this.state.authenticationCode} onChange={this.onChange} name="authenticationCode" /></span>
                        <button onClick={this.confirmSignUp} />
                    </div>
                }
            </div>
        )
    }
}