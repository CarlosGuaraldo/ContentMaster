'use client';

import { useState } from 'react';

export default function AuthPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Handle form submission logic here

        if (isSignUp) {
            setMessage('Sign up successful!');
        } else {
            setMessage('Login successful!');
        }
    };

    return (
        <div>
            <h1>{isSignUp ? 'Sign Up' : 'Login'}</h1>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <br />
                <button type="submit">{isSignUp ? 'Sign Up' : 'Login'}</button>
            </form>
            <button onClick={() => setIsSignUp(!isSignUp)}>
                {isSignUp ? 'Switch to Login' : 'Switch to Sign Up'}
            </button>
        </div>
    );
}
