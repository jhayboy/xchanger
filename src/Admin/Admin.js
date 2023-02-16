import React, {useState} from 'react'
import Pending from './Pending'
import Success from './Success'
import Failed from './Failed'


export default function Admin(){
    const [success, setSuccess] = useState(true)
    const [pending, setPending] = useState(true)
    const [failed, setFailed] = useState(true)
    // if the id is not that of the admin let it go back to login
    const handleSuccess = () => {
        setSuccess(false)
        setPending(false)
        setFailed(true)
    }

    const handlePending = () => {
        setPending(true)
        setSuccess(true)
        setFailed(true)
    }
    

    const handleFailed = () => {
        setFailed(false)
        setPending(false)
        setSuccess(true)
    }
    return(
        <div className='bg-[#010f24] h-screen py-5'>
            <div className='text-white px-5 gap-5 flex flex-col'>
                <p>Admin DashBoard</p>
                <div className='flex justify-between items-center '>
                    <p onClick={handlePending} className={pending? 'text-[#00df9a]' : ''}>Pending</p>
                    <p onClick={handleSuccess} className={!success? 'text-[#00df9a]' : ''}>Successful</p>
                    <p onClick={handleFailed} className={!failed? 'text-[#00df9a]' : ''}>Failed</p>
                </div>
            </div>
            {pending ? <Pending/> : !success ? <Success/> : <Failed/>}
        </div>
    )
}