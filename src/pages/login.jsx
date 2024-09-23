// src/pages/login.jsx
import React, { useState } from 'react';
import { login } from "../services/api.js";
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { fetchStudents } from '../redux/actions/studentActions.js';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const loginKeSistem = await login(username, password);
        if (loginKeSistem && loginKeSistem.data.code === 200) {
            alert("LOGIN BERHASIL");
            localStorage.setItem("token", loginKeSistem.data.response.token);
            dispatch(fetchStudents()); // Fetch student data after successful login
            navigate('/student-list');
        }
        if (loginKeSistem && loginKeSistem.data.code === 401) {
            alert("LOGIN GAGAL");
        }
    };

    return (
        <div className='container'>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" value={username} onChange={handleUsernameChange} required />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange} required />
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
