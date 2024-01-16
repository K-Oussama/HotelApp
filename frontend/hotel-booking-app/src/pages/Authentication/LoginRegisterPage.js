import React, { useState, useEffect } from 'react';
import { login, register } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const LoginRegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');


    const [isRegistering, setIsRegistering] = useState(false);

    const navigate = useNavigate();

    // if localStorage.getItem('authToken') is not null then navigate to dashboard in useEffect hook
    useEffect(() => {
        if (localStorage.getItem('authToken')) {
            navigate('/');
        }
    });



    const handleLogin = () => {
        // if login does not throw error then navigate to dashboard
        login(username, password, navigate);


    };

    const handleRegister = () => {
        register(fullname, email, username, password, navigate);
    };

    const style = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f5f5f5'
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            width: '300px',
            padding: '20px',
            borderRadius: '5px',
            boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.15)',
            backgroundColor: '#fff'
        },
        input: {
            margin: '10px 0',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ddd'
        },
        button: {
            margin: '10px 0',
            padding: '10px',
            borderRadius: '5px',
            border: 'none',
            color: '#fff',
            backgroundColor: '#007bff',
            cursor: 'pointer'
        },
        switchButton: {
            margin: '10px 0',
            padding: '10px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: '#6c757d',
            color: '#fff',
            cursor: 'pointer'
        }
    };

    return (
        // login inputs and if register registration input form JSX code here

        <div style={style.container}>
        {isRegistering ? (
            <div style={style.form}>
                <h1>Register</h1>
                <input
                    style={style.input}
                    type="text"
                    placeholder="Full Name"
                    onChange={(e) => setFullname(e.target.value)}
                />
                <input style={style.input}
                    type="text"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input style={style.input}
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input style={style.input}
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button style={style.button} onClick={handleRegister}>Register</button>
            </div>
        ) : (
            <div style={style.form}>
                <h1>Login</h1>
                <input style={style.input}
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input style={style.input}
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button style={style.button} onClick={handleLogin}>Login</button>
            </div>
        )}
        <button style={style.switchButton} onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? 'Switch to Login' : 'Switch to Register'}
        </button>
    </div>
    );
};

export default LoginRegisterPage;