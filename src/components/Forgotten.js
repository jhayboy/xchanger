import React, {useState} from "react"
import {FaReact} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import {IoIosArrowBack} from 'react-icons/io'
import {auth} from "./firebase"
import { sendPasswordResetEmail } from "firebase/auth";


export default function Forgotten(){
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(true)
    const [alerts, setAlerts] = useState(true)
    const handleSubmit = async () =>{
        setLoading(false)
        try {
        await sendPasswordResetEmail(auth, email)
        setLoading(true)
        setAlerts(false)
        } catch (error) {
        setLoading(true)
        }
    }


    return(
        
        <div className="bg-black">
            <div className="flex w-full justify-center items-center px-5 py-5 bg-black text-white">
                <Link to='/login'>
                    <IoIosArrowBack size={20} className=""/>
                </Link>
                <p className="font-bold text-xl w-full flex items-center justify-center">Forgotten Password</p>
                <p></p>
            </div>
            <div className="w-full h-screen bg-black flex flex-col justify-center items-center ">
                <div className="text-white gap-4 flex flex-col justify-center items-center w-[375px] px-8 ">
                    <input 
                    className="w-full h-10 pl-3 border rounded-lg text-black outline-none"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}/>
                    <button className="bg-[#00df9a] text-black cursor-pointer border-0 rounded-lg text-lg font-semibold hover:text-slate-700 w-full" onClick={handleSubmit}>Rest Password</button>
                </div>
            </div>
            <div className={!loading ? "fixed flex justify-center items-center bg-white opacity-75 top-0 bottom-0 left-0 right-0" : "hidden"}>
                <FaReact className="animate-spin text-black font-bold" size={50}/>
            </div>
            <div className={!alerts ? "fixed flex justify-center items-center bg-white top-0 bottom-0 left-0 right-0" : "hidden"}>
                <div>
                    <p>Password reset email sent successfully</p>
                    <Link to='/login'>
                        <button className="bg-[#00df9a] text-black cursor-pointer border-0 rounded-lg text-lg font-semibold hover:text-slate-700 w-full">continue</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}