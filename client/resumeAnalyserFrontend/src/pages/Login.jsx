import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';

const Login = () => {

    const [email ,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit =async (e) => {
        e.preventDefault();
        const {data}=await loginUser({email, password});
        localStorage.setItem('token', data.token);
        navigate('/');
    }
    return (
        <div className='max-w-md mx-auto p-6'>
            <h2 className='text-2xl mb-4 font-bold'>Login</h2>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <input className="w-full p-2 border rounded" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className="w-full p-2 border rounded" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" className='bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700'>Login</button>
            </form>
        </div>
    )
}

export default Login
