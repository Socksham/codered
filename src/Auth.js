import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { auth, db, registerWithEmailAndPassword, signInWithEmailAndPassword, signInWithGoogle, checkNumber, checkNameAddressOccupation } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleOutlined, Loading3QuartersOutlined } from "@ant-design/icons"

const Auth = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const [number, setNumber] = useState("")
    const [name, setName] = useState("")
    const navigate = useNavigate();

    const [hasCreds, setHasCreds] = useState(true)

    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        async function func() {
            if (user) {
                // console.log("HERE")
                // console.log(await checkNumber(user.uid))
                var nao = await checkNameAddressOccupation(user.uid)
                var num = await checkNumber(user.uid)
                console.log(nao)
                console.log(num)
                if (nao && num) {
                    navigate("/hospital");
                } else {
                    navigate("/nameaddress")
                }
            }
        }
        func()
    }, [user, loading]);

    return (
        <div className="h-screen max-h-screen bg-gray-50">
            <div className=''>

                <div className="w-full h-full grid place-items-center">
                    <div className="flex h-full items-center w-full">
                        <div className="flex w-1/2 h-full">
                            <div className="flex flex-col h-full px-16 justify-center">
                                <div className="space-y-8">
                                    <div className='space-y-2'>
                                        <div className=''>
                                            <p className='text-4xl text-red-600 font-bold'>CodeRed</p>
                                        </div>
                                        <div className="text-xl font-semibold">
                                            <p>At the heart of healthcare</p>
                                        </div>
                                    </div>
                                    <div className="w-fit">
                                        <img src="https://images.unsplash.com/photo-1504439468489-c8920d796a29?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80" className="object-scale-down rounded-lg" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-1/2'>
                            <div className='relative z-0 object-fit h-screen flex justify-end'>
                                <img src="https://images.unsplash.com/photo-1573632400288-4390dee9df40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" className='w-full' />
                            </div>
                            <div className='flex justify-end absolute inset-0'>
                                <div className="flex justify-center items-center w-1/2 py-32 px-12">
                                    <div className="bg-white opacity-96 shadow-xl py-12 px-12 rounded-lg w-full mx-24">
                                        <div className="flex pb-6">
                                            {
                                                hasCreds ?
                                                    <div className="flex bg-red-300 rounded-full p-0.5">
                                                        <div className="bg-red-600 rounded-full px-4 py-1 cursor-pointer text-white" >
                                                            <p>Sign in</p>
                                                        </div>
                                                        <div className="rounded-full px-4 py-1 cursor-pointer" onClick={() => { setHasCreds(!hasCreds) }}>
                                                            <p>Sign up</p>
                                                        </div>
                                                    </div>
                                                    :
                                                    <div className="flex bg-red-300 rounded-full p-0.5">
                                                        <div className="rounded-full px-4 py-1 cursor-pointer" onClick={() => { setHasCreds(!hasCreds) }}>
                                                            <p>Sign in</p>
                                                        </div>
                                                        <div className="bg-red-600 rounded-full px-4 py-1 cursor-pointer text-white">
                                                            <p>Sign up</p>
                                                        </div>
                                                    </div>
                                            }
                                        </div>
                                        <div className="flex flex-col w-full">
                                            <div className="space-y-3 mb-6">
                                                {
                                                    !hasCreds &&
                                                    <div>
                                                        <p className="text-sm text-gray-400">Name*</p>
                                                        <input
                                                            type="text"
                                                            className="w-full text-sm pb-1 py-1 outline-none px-1"
                                                            value={name}
                                                            onChange={(e) => setName(e.target.value)}
                                                            placeholder=""
                                                        />
                                                        <div className="w-full h-px bg-gray-300" />
                                                    </div>
                                                }
                                                {
                                                    !hasCreds &&
                                                    <div>
                                                        <p className="text-sm text-gray-400">Phone Number*</p>
                                                        <input
                                                            type="text"
                                                            className="w-full text-sm pb-1 py-1 outline-none px-1"
                                                            value={number}
                                                            onChange={(e) => setNumber(e.target.value)}
                                                            placeholder=""
                                                        />
                                                        <div className="w-full h-px bg-gray-300" />
                                                    </div>
                                                }
                                                <div>
                                                    <p className="text-sm text-gray-400">Email*</p>
                                                    <input
                                                        type="text"
                                                        className="w-full text-sm pb-1 py-1 outline-none px-1"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        placeholder=""
                                                    />
                                                    <div className="w-full h-px bg-gray-300" />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-400">Password*</p>
                                                    <input
                                                        type="password"
                                                        className="w-full text-sm pb-1 py-1 outline-none px-1"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        placeholder=""
                                                    />
                                                    <div className="w-full h-px bg-gray-300" />
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-center w-full space-y-4">
                                                {
                                                    hasCreds ?
                                                        <div className="w-full">
                                                            {
                                                                !loading ?
                                                                    <button
                                                                        className="border w-full px-2 py-2 rounded-lg bg-red-600 text-white"
                                                                        onClick={() => signInWithEmailAndPassword(email, password)}
                                                                    >
                                                                        <p>Let's go!</p>
                                                                    </button>
                                                                    :
                                                                    <button className="border w-full px-2 py-2 rounded-lg bg-red-600 text-white">
                                                                        <div className="flex justify-center items-center">
                                                                            <p className="text-red-600">e</p>
                                                                            <Loading3QuartersOutlined spin={true} />
                                                                            <p className="text-red-600">e</p>
                                                                        </div>
                                                                    </button>
                                                            }
                                                        </div>
                                                        :
                                                        <div className="w-full">
                                                            {
                                                                !loading ?
                                                                    <button
                                                                        className="border w-full px-2 py-2 rounded-lg bg-red-600 text-white"
                                                                        onClick={() => registerWithEmailAndPassword(name, number, email, password)}
                                                                    >
                                                                        <p>Let's go!</p>
                                                                    </button>
                                                                    :
                                                                    <button className="border w-full px-2 py-2 rounded-lg bg-red-600 text-white">
                                                                        <div className="flex justify-center items-center">
                                                                            <p className="text-red-600">e</p>
                                                                            <Loading3QuartersOutlined spin={true} />
                                                                            <p className="text-red-600">e</p>
                                                                        </div>
                                                                    </button>
                                                            }
                                                        </div>
                                                }

                                                {
                                                    hasCreds ?
                                                        <div className="w-full">
                                                            {
                                                                !loading ?
                                                                    <button className="border border-gray-300 w-full px-2 py-2 rounded-lg" onClick={signInWithGoogle}>
                                                                        <div className="flex justify-center items-center space-x-2">
                                                                            <GoogleOutlined color="black" />
                                                                            <p>Sign In With Google</p>
                                                                        </div>

                                                                    </button>
                                                                    :
                                                                    <button className="border border-gray-300 w-full px-2 py-2 rounded-lg" onClick={signInWithGoogle}>
                                                                        <div className="flex justify-center items-center">
                                                                            <p className="text-white">e</p>
                                                                            <Loading3QuartersOutlined spin={true} />
                                                                            <p className="text-white">e</p>
                                                                        </div>
                                                                    </button>
                                                            }
                                                        </div>

                                                        :
                                                        <div className="w-full">
                                                            {
                                                                !loading ?
                                                                    <button className="border border-gray-300 w-full px-2 py-2 rounded-lg" onClick={signInWithGoogle}>
                                                                        <div className="flex justify-center items-center space-x-2">
                                                                            <GoogleOutlined color="black" />
                                                                            <p>Sign Up With Google</p>
                                                                        </div>

                                                                    </button>
                                                                    :
                                                                    <button className="border border-gray-300 w-full px-2 py-2 rounded-lg" onClick={signInWithGoogle}>
                                                                        <div className="flex justify-center items-center">
                                                                            <p className="text-white">e</p>
                                                                            <Loading3QuartersOutlined spin={true} />
                                                                            <p className="text-white">e</p>
                                                                        </div>
                                                                    </button>
                                                            }
                                                        </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>

        </div >
    )
}

export default Auth