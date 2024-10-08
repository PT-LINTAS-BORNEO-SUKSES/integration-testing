import React, {useState} from 'react';
import {login} from "../services/api.js";

const LoginPage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Lakukan sesuatu dengan username dan password, misalnya kirim ke server
        console.log('Submitted Username:', username);
        console.log('Submitted Password:', password);
        const loginKeSistem = await login(username, password)
        console.log("Login ke Sistem", loginKeSistem.data.code)
        if(loginKeSistem.data.code === 200){
            alert("HOREEE LOGIN BERHASILL :)")
            localStorage.setItem("token", loginKeSistem.data.response.token);
        }
        if(loginKeSistem.data.code === 401){
            alert("YAHHH MAAF LOGIN GAGAL :(")
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" value={username} onChange={handleUsernameChange} required />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange} required />
                </div>
                <div>
                    <button type="submit" onClick={handleSubmit}>Login</button>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;