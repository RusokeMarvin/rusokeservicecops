import React, { useState,useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/authContext';
import { doCreateUserWithEmailAndPassword } from '../../../firebase/auth';
import './register.css';

const validationRules = {
    email: {
        required: true,
        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        errorMessage: "Invalid email format"
    },
    password: {
        required: true,
        minLength: 8,
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
        errorMessage: "Password must be at least 8 characters, include uppercase, lowercase, number, and symbol"
    },
    confirmPassword: {
        required: true,
        matchField: "password",
        errorMessage: "Passwords do not match"
    }
};

const Register = () => {
    const { userLoggedIn } = useAuth();
    const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
    const [errors, setErrors] = useState({});
    const [isRegistering, setIsRegistering] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    useEffect(() => {
        const savedEmail = localStorage.getItem("rememberedEmail");
        if (savedEmail) {
            setFormData((prev) => ({ ...prev, email: savedEmail }));
            setRememberMe(true);
        }
    }, []);
    


    const validateField = (name, value) => {
        if (!validationRules[name]) return; // Ignore fields without validation rules
    
        let error = "";
        const rules = validationRules[name];
    
        if (rules.required && !value.trim()) {
            error = `${name} is required`;
        } else if (rules.pattern && !rules.pattern.test(value)) {
            error = rules.errorMessage;
        } else if (rules.minLength && value.length < rules.minLength) {
            error = `Must be at least ${rules.minLength} characters`;
        } else if (rules.matchField && formData[rules.matchField] !== value) {
            error = rules.errorMessage;
        }
    
        setErrors((prev) => ({ ...prev, [name]: error }));
    };
    

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (type === "checkbox") {
            setRememberMe(checked);
        } else {
            validateField(name, value);
        }
    };


    const onSubmit = async (e) => {
        e.preventDefault();
    
        Object.keys(formData)
    .filter((key) => validationRules[key]) // Ignore fields without validation rules
    .forEach((key) => validateField(key, formData[key]));

    
        if (Object.values(errors).some((error) => error)) return;
    
        setIsRegistering(true);
        try {
            await doCreateUserWithEmailAndPassword(formData.email, formData.password);
    
            if (rememberMe) {
                localStorage.setItem("rememberedEmail", formData.email);
            } else {
                localStorage.removeItem("rememberedEmail");
            }
        } catch (error) {
            setErrors((prev) => ({ ...prev, form: error.message }));
            setIsRegistering(false);
        }
    };
    

    return (
        <>
            {userLoggedIn && <Navigate to="/home" replace={true} />}

            <div className="register-container">
                <div className="register-box">
                    <h3 className="register-title">Create a New Account</h3>
                    <form onSubmit={onSubmit}>
                        <input
                            type="text"
                            name="name"
                            className="register-input"
                            placeholder="Name"
                        />
                        <input
                            type="email"
                            name="email"
                            className="register-input"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <span className="register-error">{errors.email}</span>}

                        <input
                            type="password"
                            name="password"
                            className="register-input"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors.password && <span className="register-error">{errors.password}</span>}

                        <input
                            type="password"
                            name="confirmPassword"
                            className="register-input"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                        {errors.confirmPassword && <span className="register-error">{errors.confirmPassword}</span>}

                        {errors.form && <span className="register-error">{errors.form}</span>}

                        <label className="remember-me">
                            <input
                                type="checkbox"
                                name="rememberMe"
                                checked={rememberMe}
                                onChange={handleChange}
                            />
                            Remember Me
                        </label>

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
    );
};

export default Register;
