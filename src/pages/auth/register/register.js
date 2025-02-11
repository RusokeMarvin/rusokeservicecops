import React, { useState } from 'react'
import { Navigate, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/authContext'
import { doCreateUserWithEmailAndPassword } from '../../../firebase/auth'
import './register.css'

const Register = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [isRegistering, setIsRegistering] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const { userLoggedIn } = useAuth()

    const onSubmit = async (e) => {
        e.preventDefault()
        if(!isRegistering) {
            setIsRegistering(true)
            await doCreateUserWithEmailAndPassword(email, password)
        }
    }

    return (
        <>
            {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}

            <div className="register-container">
    <div className="register-box">
        <h3 className="register-title">Create a New Account</h3>
        <form onSubmit={onSubmit}>
            <input
                type="email"
                className="register-input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                className="register-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                type="password"
                className="register-input"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setconfirmPassword(e.target.value)}
            />
            {errorMessage && <span className="register-error">{errorMessage}</span>}
            <button type="submit" className="register-button" disabled={isRegistering}>
                {isRegistering ? 'Signing Up...' : 'Sign Up'}
            </button>
        </form>
        <div className="register-link">
            Already have an account? <Link to="/login">Continue</Link>
        </div>
    </div>
</div>

        </>
    )
}

export default Register