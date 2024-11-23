import React from 'react';
import LoginHeader from '../components/LoginHeader';
import LoginForm from '../components/LoginForm';

function Login () {
    return (
        <div className='flex h-screen'>
            <LoginHeader />
            <LoginForm />
        </div>
    );
}

export default Login;