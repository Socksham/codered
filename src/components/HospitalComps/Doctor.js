import React, { useEffect, useState } from 'react'

const Doctor = ({ name, specializations, puid, duid, huid, modalFunc, selected, index, pastEmergenciesFunc }) => {

    const [specializationComma, setSpecializationComma] = useState("")

    const contactDoctor = async () => {
        //TODO: DATABASE STUFF
    }

    useEffect(() => {
        console.log(specializations)
        var tempStr = ""
        for(var i = 0; i < specializations.length; i++){
            if(i == specializations.length - 1){
                tempStr += specializations[i]
            }else{
                tempStr += specializations[i] + ","
            }
        }
        setSpecializationComma(tempStr)
    }, [])

    return (
        <div className='h-full'>
            <div className='flex justify-between border-b pl-4 hover:bg-gray-100 h-full'>
                <div className='w-full flex justify-between cursor-pointer items-center ' onClick={() => {
                    selected(index)
                    modalFunc(true)
                    pastEmergenciesFunc(duid)
                }}>
                    <p>{name}</p>
                    <p className='w-32 truncate text-ellipsis'>{specializationComma}</p>
                    <div></div>
                </div>
                <div className='bg-red-600 text-white px-4 py-[0.2rem] h-full cursor-pointer border-y' onClick={contactDoctor}>
                    <p>Send</p>
                </div>
            </div>
        </div>

    )
}

export default Doctor