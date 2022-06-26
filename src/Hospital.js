import React, { useEffect, useState } from 'react'
import Emergency from './components/HospitalComps/Emergency'
import Navbar from './components/Navbar'
import Doctor from './components/HospitalComps/Doctor'
import { collection, query, where, getDocs, doc, getDoc, setDoc } from "firebase/firestore";
import { db, auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Audio from './components/HospitalComps/Audio';

const Hospital = () => {

    const [showModal, setShowModal] = useState(false)
    const [emergencySelected, setEmergencySelected] = useState(null)
    const [user, loading, error] = useAuthState(auth);
    const [emergencies, setEmergencies] = useState([])
    const [doctors, setDoctors] = useState([])
    const [emergencyFilter, setEmergencyFilter] = useState("")
    const [doctorFilter, setDoctorFilter] = useState("")
    const [doctorsShown, setDoctorsShown] = useState([])
    const [pastEmergencies, setPastEmergencies] = useState([])
    const [doctorSelected, setDoctorSelected] = useState(null)
    const [emergenciesShown, setEmergenciesShown] = useState([])

    useEffect(() => {
        async function init() {
            const docRef = doc(db, "hospitals", user.uid);
            console.log(user.uid)
            const docSnap = await getDoc(docRef);
            var hospCode = docSnap.data().hospital_code

            var tempArr = []
            var arr1 = await addParamedicEmergencies(hospCode)
            var arr2 = await addPeopleEmergencies(hospCode)
            console.log("wefwef" + arr2)

            for (var i = 0; i < arr1.length; i++) {
                tempArr.push(arr1[i])
            }
            for (var i = 0; i < arr2.length; i++) {
                tempArr.push(arr2[i])
            }
            setEmergencies(tempArr)
            setEmergenciesShown(tempArr)
        }
        init()
    }, [user])

    const getPastEmergencies = async (uid) => {
        const q = query(collection(db, "doctoremergencies"), where("duid", "==", uid));
        var tempArr = []

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            tempArr.push(doc.data())
        });
        setPastEmergencies(tempArr)
    }

    const getDoctors = async (hospCode) => {
        const doctorsQuery = query(collection(db, "hospitaldoctor"), where("hospital_code", "==", hospCode));
        const doctorsSnap = await getDocs(doctorsQuery);
        doctorsSnap.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            setDoctors(old => [...old, doc.data()])
            setDoctorsShown(old => [...old, doc.data()])
        });
    }

    useEffect(() => {
        filterDoctors()
    }, [doctorFilter])

    useEffect(() => {
        filterEmergencies()
    }, [emergencyFilter])

    const filterDoctors = () => {
        var tempArr = [...doctors]
        var returnArr = []

        if (doctorFilter !== "") {
            for (var i = 0; i < tempArr.length; i++) {
                var specializationsArr = tempArr[i].specialization_list
                console.log(tempArr[i])

                for (var j = 0; j < specializationsArr.length; j++) {
                    if (specializationsArr[j].toUpperCase().includes(doctorFilter.toUpperCase())) {
                        console.log("HERE")
                        returnArr.push(tempArr[i])
                        return
                    }
                }
            }
            setDoctorsShown(returnArr)
        } else {
            setDoctorsShown(tempArr)
        }
    }

    const filterEmergencies = () => {
        var tempArr = [...emergencies]
        var returnArr = []

        if (emergencyFilter !== "") {

            for (var i = 0; i < tempArr.length; i++) {
                console.log(tempArr[i])
                var type = tempArr[i].type.toUpperCase()
                if (type.includes(emergencyFilter.toUpperCase())) {
                    console.log("HERE")
                    returnArr.push(tempArr[i])
                }

            }
            setEmergenciesShown(returnArr)
        } else {
            setEmergenciesShown(tempArr)
        }

    }

    const addPeopleEmergencies = async (hospCode) => {

        var tempArr = []

        const peopleEmergenciesQuery = query(collection(db, "peopleemergencies"), where("hospital_code", "==", hospCode));
        const peopleEmergenciesSnap = await getDocs(peopleEmergenciesQuery);
        peopleEmergenciesSnap.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            tempArr.push(doc.data())
        });
        console.log(tempArr)
        return tempArr
    }

    const addParamedicEmergencies = async (hospCode) => {

        var tempArr = []

        const paramedicEmergenciesQuery = query(collection(db, "paramedicemergencies"), where("hospital_code", "==", hospCode));
        const paramedicEmergenciesSnap = await getDocs(paramedicEmergenciesQuery);
        paramedicEmergenciesSnap.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            tempArr.push(doc.data())
        });

        return tempArr
    }

    return (
        <div className='min-h-screen max-h-screen flex flex-col'>
            <div className=''>
                <Navbar />
            </div>
            <div className='max-h-full flex flex-col flex-grow mt-4 px-16'>
                {/* <div className='bg-red-600 text-white px-4 py-1'>
                    <p>Sort</p>
                </div> */}
                <div className='relative flex-grow flex h-full'>
                    {/* <div className='flex h-full'> */}
                    <div className='w-7/12 pb-4'>
                        <div className='bg-white border-y border-l h-full overflow-y-auto'>
                            <div className='flex items-center justify-between pl-4 pr-1 py-1 border-b border-r'>
                                <p className='text-xl font-bold'>Emergencies</p>
                                <div>
                                    <input type="text" value={emergencyFilter} onChange={(e) => { setEmergencyFilter(e.target.value) }} className="border outline-none px-1" placeholder='Filter by emergency' />
                                </div>
                            </div>
                            <div className=''>
                                {
                                    emergenciesShown.map((emergency, index) => {
                                        return (
                                            <div key={index} >
                                                {
                                                    index == emergencySelected ?
                                                        <Emergency name={emergency.name} type={emergency.type} text={emergency.vmtext} uid={emergency.uid} huid={emergency.huid} hospCode={emergency.hospital_code} voiceUrl={emergency.vmurl} select={setEmergencySelected} getDoctorsFunc={getDoctors} doctorsShown={setDoctorsShown} index={index} selected={true} />
                                                        :
                                                        <Emergency name={emergency.name} type={emergency.type} text={emergency.vmtext} uid={emergency.uid} huid={emergency.huid} hospCode={emergency.hospital_code} voiceUrl={emergency.vmurl} select={setEmergencySelected} getDoctorsFunc={getDoctors} doctorsShown={setDoctorsShown} index={index} selected={false} />
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className='w-5/12 pb-4 '>
                        <div className='bg-white h-full border-y border-r'>
                            <div className='flex items-center justify-between pl-4 pr-1 py-1 border-b'>
                                <p className='text-xl font-bold'>Doctors Available</p>
                                <div>
                                    <input type="text" value={doctorFilter} onChange={(e) => { setDoctorFilter(e.target.value) }} className="border outline-none px-1" placeholder='Filter by specialization' />
                                </div>
                            </div>
                            {
                                emergencySelected !== null &&
                                <div>
                                    {
                                        doctorsShown.map((doctor, index) => {
                                            return (
                                                <Doctor name={doctor.name} specializations={doctor.specialization_list} modalFunc={setShowModal} selected={setDoctorSelected} index={index} pastEmergenciesFunc={getPastEmergencies} duid={doctor.duid} />
                                            )
                                        })
                                    }
                                </div>
                            }

                        </div>
                    </div>
                    {/* </div> */}
                </div>
            </div>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-full my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className='p-5 space-y-4'>
                                    <div>
                                        <p className='text-xl font-bold'>{doctorsShown[doctorSelected].name}</p>
                                        <p className='font-semibold'>Specializations: {doctorsShown[doctorSelected].specialization_list}</p>
                                    </div>
                                    <div className='h-full'>
                                        <p className='border-b text-lg font-semibold'>Past Emergencies</p>
                                        <div className='h-72 h-max-72 overflow-y-auto'>
                                            {
                                                pastEmergencies.map((pastEmergency, index) => {
                                                    return (
                                                        <div key={index} className="border-l">
                                                            <div className='flex justify-between border-b px-4 py-1 cursor-pointer hover:bg-gray-100 border-r'>
                                                                <p>{pastEmergency.name}</p>
                                                                <p className=''>{pastEmergency.type}</p>
                                                                <p className='w-64 text-ellipsis truncate overflow-hidden'>{pastEmergency.vmtext}</p>
                                                                <p>{pastEmergency.vmurl}</p>
                                                            </div>
                                                            {/* <Emergency name={pastEmergency.name} type={pastEmergency.type} text={pastEmergency.vmtext} uid={pastEmergency.duid} huid={pastEmergency.huid} voiceUrl={pastEmergency.vmurl} selected={false} /> */}
                                                        </div>

                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-end pb-5 px-5 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="bg-red-600 text-white hover:bg-red-500 font-bold uppercase text-sm px-6 py-3 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Send
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </div>
    )
}

export default Hospital