import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';


const Navbar = () => {
    const { user }=useAuth();
    return (
        <nav className='flex justify-between items-center p-4 bg-gray-800 text-white'>
            <div className='font-bold text-lg'>Resume Analyser</div>
            <div className='flex gap-4'>
                <Link to='/' className='hover:underline'>Dashboard</Link>
                <Link to='/history' className='hover:underline'>History</Link>
                {!user ? (
                    <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Registration</Link>
                    </>
                ) : (
                    <span>Welcome</span>
                )}

            </div>
        </nav>
    )
}

export default Navbar
