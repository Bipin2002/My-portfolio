import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/login', { username, password });
            const token = response.data.token;
            if (token) {
                localStorage.setItem('token', token);
                navigate('/Dashboard');
            }
        } catch (error) {
            console.error(error.response.data.error || 'Invalid credentials');
        }
    };

    return (
        <div className="login">
            <div>
                <form>
                    <h1>Login</h1>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>

                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="button" onClick={handleLogin}>Login</button>
                    <p>Not Registered? <a href='/SignUp'>Signup</a></p>
                </form>
            </div>
        </div>
    );
}

export default Login;
