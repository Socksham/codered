import React, { useEffect, useState } from 'react'
import { auth, checkNameAddressOccupation, setNameAddressOccupation, checkNumber } from './firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

const HospitalNA = () => {

    const navigate = useNavigate();
    const [user, loading, error] = useAuthState(auth);
    const [hName, setHName] = useState("")
    const [hAddress, setHAddress] = useState("")
    const [occupation, setOccupation] = useState("")

    const setNA = async () => {
        if(hName != "" && hAddress != "" && occupation != ""){
            await setNameAddressOccupation(user.uid, hName, hAddress, occupation)
        }
        if (user) {
            var isnameaddress = await checkNameAddressOccupation(user.uid)
            var ispnumber = await checkNumber(user.uid)
            if (isnameaddress && ispnumber) {
                navigate("/hospital");
            } else if (!ispnumber) {
                navigate("/phonenumber")
            }
        } else {
            navigate("/auth")
        }
    }

    useEffect(() => {
        setNA()
    }, [user, loading])

    return (
        <div className='min-h-screen flex flex-col bg-gray-100'>
            <div className='relative flex-grow flex h-full w-full items-center justify-center px-64 py-4'>
                <div className='w-96 h-full bg-white shadow-lg rounded-lg py-10 px-6 space-y-4'>
                    <div>
                        <p>Hospital Name*</p>
                        <input type="text" className='h-full p-2 w-full border outline-none rounded focus:border-red-400 border-2' value={hName} onChange={(e) => setHName(e.target.value)} />
                    </div>
                    <div>
                        <p>Address*</p>
                        <input type="text" className='h-full p-2 w-full border outline-none rounded focus:border-red-400 border-2' value={hAddress} onChange={(e) => setHAddress(e.target.value)} />
                    </div>
                    <div>
                        <p>Occupation*</p>
                        <input type="text" className='h-full p-2 w-full border outline-none rounded focus:border-red-400 border-2' value={occupation} onChange={(e) => setOccupation(e.target.value)} />
                    </div>
                    <div className='flex w-full justify-end'>
                        <button className='bg-red-600 text-white px-2 py-1 rounded-lg text-lg hover:bg-red-400' onClick={setNA}>Next</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HospitalNA