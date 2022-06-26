import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { auth, logout } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
const Navbar = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) navigate("/auth");
    }, [user, loading]);

    return (
        <div className='px-16 flex items-center justify-between pt-4'>
            <div className='cursor-pointer'>
                <p className='text-4xl text-red-600 font-bold'>CodeRed</p>
            </div>
            <div className='flex items-center space-x-8'>
                <div onClick={logout} className='bg-red-600 px-4 py-2 shadow-lg hover:bg-red-500 cursor-pointer'>
                    <p className='text-white'>Logout</p>
                </div>
            </div>
        </div>
    )
}

export default Navbar