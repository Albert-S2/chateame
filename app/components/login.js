'use client';
import {useState} from 'react';
import {useRouter} from 'next/navigation';

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
        }
        else {
            console.log('Invalid login');
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
        <div>
            <label>Name:</label>
            <input
            type="text"
            value={myName}
            onChange={(e) => setName(e.target.value)}
            required
            />
        </div>
        <div>
            <label>Password:</label>
            <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
        </div>
        <button type="submit" value="submit" >Login</button>
        </form>
    );
}