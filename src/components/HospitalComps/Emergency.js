import React from 'react'
import Audio from './Audio'

const Emergency = ({ name, type, text, voiceUrl, uid, huid, select, index, selected, getDoctorsFunc, hospCode, doctorsShown }) => {
    return (
        <div className=''>
            {
                selected ?
                    <div className='flex justify-between border-b px-4 py-1 cursor-pointer hover:bg-red-500 bg-red-600 text-white items-center' onClick={() => {
                        console.log(doctorsShown)
                        console.log("WIEHBWFEIB")
                        doctorsShown([])
                        select(index)
                        getDoctorsFunc(hospCode)
                    }}>
                        <p>{name}</p>
                        <p className=''>{type}</p>
                        <p className='w-32'>{text}</p>
                        <Audio vmurl={voiceUrl}/>
                    </div>
                    :
                    <div className='flex justify-between border-b px-4 py-1 cursor-pointer hover:bg-gray-100 border-r items-center' onClick={() => {
                        console.log(doctorsShown)
                        console.log("WIEHBWFEIB")
                        doctorsShown([])
                        select(index)
                        getDoctorsFunc(hospCode)
                    }}>
                        <p>{name}</p>
                        <p className=''>{type}</p>
                        <p className='w-32'>{text}</p>
                        <Audio vmurl={voiceUrl}/>
                    </div>
            }

        </div>
    )
}

export default Emergency