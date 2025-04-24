'use client';
import {useState} from 'react';
import {useRouter} from 'next/navigation';
import './login.css';

export default function LoginForm() {
    const [myName, setName] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    
    const validUsername = process.env.NEXT_PUBLIC_USERNAME;
    const validPassword = process.env.NEXT_PUBLIC_PASSWORD;

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Logging in with:', {myName, password});
        if (myName === validUsername && password === validPassword) {
            console.log('Login successful');
            router.push('/chatpage');
        } else {
            console.log('Invalid login');
            alert('Invalid username or password');
        }
    };
    
    return (
        <div className="login-page">
            <div className="login-container">
                <h1 className="login-title">¡Chaté a me!</h1>
                <h2 className="login-subtitle">Login</h2>
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="login-field">
                        <label className="login-label">Name:</label>
                        <input
                            type="text"
                            value={myName}
                            onChange={(e) => setName(e.target.value)}
                            className="login-input"
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div className="login-field">
                        <label className="login-label">Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="login-input"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button type="submit" className="login-submit-button">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}