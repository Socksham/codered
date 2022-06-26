import React, { useEffect, useState } from 'react'
import { setNumber, auth, checkNumber } from './firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

const PhoneNumber = () => {

    const navigate = useNavigate();
    const [user, loading, error] = useAuthState(auth);
    const [pnumber, setPNumber] = useState("")

    const setPNumberHandler = async () => {
        if(pnumber != ""){
            await setNumber(user.uid, pnumber)
        }
        if (user) {
            // console.log("HERE")
            // console.log(await checkNumber(user.uid))
            if(await checkNumber(user.uid)){
                navigate("/hospital");
            }else{
                navigate("/phonenumber")
            }
        }else {
            navigate("/auth")
        }
    }

    useEffect(() => {
        setPNumberHandler()
    }, [user, loading])

    return (
        <div className='min-h-screen flex flex-col bg-gray-100'>
            <div className='relative flex-grow flex h-full w-full items-center justify-center px-64 py-4'>
                <div className='w-96 h-full bg-white shadow-lg rounded-lg py-10 px-6 space-y-4'>
                    <p>Phone Number*</p>
                    <input type="text" className='h-full p-2 w-full border outline-none rounded focus:border-red-400 border-2' value={pnumber} onChange={(e) => setPNumber(e.target.value)}/>
                    <div className='flex w-full justify-end'>
                        <button className='bg-red-600 text-white px-2 py-1 rounded-lg text-lg hover:bg-red-400' onClick={setPNumberHandler}>Next</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PhoneNumber