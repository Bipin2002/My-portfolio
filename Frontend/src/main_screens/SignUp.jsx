import React, { useState } from 'react';
import axios from 'axios';
import '../style/SignUp.css';
import {Link, useNavigate } from 'react-router-dom';

function SignUp() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleSignup = async () => {
        try {
            console.log("hello")
            await axios.post('http://localhost:5000/signup', { username, email, password });
            navigate('/');
        } catch (error) {
            console.error(error.response.data.error || 'Something went wrong');
        }
    };


    return (
        <div className="signup">
            <form>
                <h1>Sign Up</h1>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="button" onClick={handleSignup}>Sign up</button>
                <Link className='link' to="/">Back to Home</Link>
            </form>
            
        </div>
    );
}

export default SignUp