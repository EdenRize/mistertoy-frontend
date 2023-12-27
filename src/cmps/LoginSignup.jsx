import { useState } from 'react'
import { login, signup } from '../store/actions/user.actions.js'
import { LoginForm } from './LoginForm.jsx'
import { showErrorMsgRedux, showSuccessMsgRedux } from '../store/actions/app.actions.js'

export function LoginSignup({ onSetUser }) {

    const [isSignup, setIsSignUp] = useState(false)

    function onLogin(credentials) {
        isSignup ? _signup(credentials) : _login(credentials)
    }

    function _login(credentials) {
        login(credentials)
            .then(onSetUser)
            .then(() => { showSuccessMsgRedux('Logged in successfully') })
            .catch((err) => { showErrorMsgRedux('Oops try again') })
    }

    function _signup(credentials) {
        signup(credentials)
            .then(onSetUser)
            .then(() => { showSuccessMsgRedux('Signed in successfully') })
            .catch((err) => { showErrorMsgRedux('Oops try again') })
    }

    return (
        <div className="login-page">
            <LoginForm
                onLogin={onLogin}
                isSignup={isSignup}
            />
            <div className="btns">
                <a href="#" onClick={() => setIsSignUp(!isSignup)}>
                    {isSignup ?
                        'Already a member? Login' :
                        'New user? Signup here'
                    }
                </a >
            </div>
        </div >
    )
}
