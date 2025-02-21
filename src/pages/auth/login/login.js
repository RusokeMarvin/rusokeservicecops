import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { doSignInWithEmailAndPassword, doSignInWithGoogle, doPasswordReset } from '../../../firebase/auth';  // Import the password reset function
import { useAuth } from '../../../contexts/authContext';
import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas';
import google from './../../../Images/Googlelogo.png';
import './login.css';

const Login = () => {
    const { userLoggedIn } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isResettingPassword, setIsResettingPassword] = useState(false);  // State for password reset
    const [resetEmailSent, setResetEmailSent] = useState(false);  // State for successful reset email
    const [showResetPopup, setShowResetPopup] = useState(false);  // State to control the popup visibility

    // Rive Animation Setup
    const { rive, RiveComponent } = useRive({
        src: '/animation.riv',
        stateMachines: 'Login Machine',
        autoplay: true,
        layout: new Layout({
            fit: Fit.Contain,
            alignment: Alignment.Center,
        }),
    });

    const [isChecking, setIsChecking] = useState(null);
    const [isHandsUp, setIsHandsUp] = useState(null);
    const [trigSuccess, setTrigSuccess] = useState(null);
    const [trigFail, setTrigFail] = useState(null);

    useEffect(() => {
        if (rive && rive.stateMachineInputs) {
            const inputs = rive.stateMachineInputs('Login Machine');
            if (inputs) {
                setIsChecking(inputs.find(input => input.name === 'isChecking') || null);
                setIsHandsUp(inputs.find(input => input.name === 'isHandsUp') || null);
                setTrigSuccess(inputs.find(input => input.name === 'trigSuccess') || null);
                setTrigFail(inputs.find(input => input.name === 'trigFail') || null);
            }
        }
    }, [rive]);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            if (isChecking) isChecking.value = true;
            try {
                await doSignInWithEmailAndPassword(email, password);
                if (trigSuccess) trigSuccess.fire(); // Success animation
            } catch (err) {
                setErrorMessage(err.message);
                if (trigFail) trigFail.fire(); // Failure animation
            } finally {
                setIsSigningIn(false);
            }
        }
    };

    const onGoogleSignIn = async (e) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            try {
                await doSignInWithGoogle();
                if (trigSuccess && trigSuccess.fire) trigSuccess.fire();
            } catch (err) {
                if (trigFail && trigFail.fire) trigFail.fire();
            } finally {
                setIsSigningIn(false);
            }
        }
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        if (!isResettingPassword) {
            setIsResettingPassword(true);
            try {
                await doPasswordReset(email);
                setResetEmailSent(true);  // Indicate that the reset email has been sent
                alert("Password reset email sent! Please check your inbox");  // Show alert
            } catch (err) {
                setErrorMessage(err.message);
            } finally {
                setIsResettingPassword(false);
            }
        }
    };
    

    return (
        <div>
            {userLoggedIn && <Navigate to="/home" replace />}
            <main className="login-container">
                <div className="riv">
                    <RiveComponent />
                </div>
                <div className="login-card">
                    <form onSubmit={onSubmit} className="login-form">
                        <div className="input-group">
                            <label>Email</label>
                            <input
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (isHandsUp) isHandsUp.value = false;
                                    if (isChecking) isChecking.value = true;
                                }}
                            />
                        </div>
                        <div className="input-group">
                            <label>Password</label>
                            <input
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    if (isChecking) isChecking.value = false;
                                    if (isHandsUp) isHandsUp.value = true;
                                }}
                            />
                        </div>
                        {errorMessage && <span className="error-message">{errorMessage}</span>}
                        <button type="submit" disabled={isSigningIn} className="login-btn">
                            {isSigningIn ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>
                    <p className="register-link">
                        Don't have an account? <Link to="/register">Sign up</Link>
                    </p>
                    <div className="divider">
                        <div className="line"></div>
                        <span>OR</span>
                        <div className="line"></div>
                    </div>
                    <button disabled={isSigningIn} onClick={onGoogleSignIn} className="google-btn">
                        <img src={google} alt="Google Logo" className='googlelogo' />
                        {isSigningIn ? 'Signing In...' : 'Continue with Google'}
                    </button>

                    {/* Forgot Password Link */}
                    <p className="forgot-password-link">
                        <a href="#" onClick={() => setShowResetPopup(true)}>
                            Forgot your password?
                        </a>
                    </p>


                </div>
            </main>

            {/* Password Reset Popup */}
            {showResetPopup && (
                <div className="reset-popup">
                    <div className="reset-popup-content">
                        <h3>Reset Password</h3>
                        <p>Enter your email address to receive a password reset link.</p>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                        <button onClick={handleForgotPassword} disabled={isResettingPassword}>
                            {isResettingPassword ? 'Sending...' : 'Send Reset Link'}
                        </button>
                        <button onClick={() => setShowResetPopup(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
