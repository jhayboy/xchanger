import React, {useState, useEffect} from "react"
import { Link } from "react-router-dom";
import 'firebase/firestore';
import {doc, onSnapshot, setDoc, getDoc} from "firebase/firestore"
import db from "./firebase"
import {auth} from "./firebase"
import {IoIosArrowBack} from "react-icons/io"
import {RxAvatar} from "react-icons/rx"
import {CiEdit} from "react-icons/ci"
import {AiOutlineCloseCircle} from "react-icons/ai"




export default function Profile(){
    const [profile, setProfile] = useState([])
    const [main, setMain] = useState([])
    const [info, setInfo] = useState(true)
    const [currentUser, setCurrentUser] = useState()
    const userId = localStorage.getItem('firebaseUserId');
    const [bankinfo, setBankInfo] = useState({accNo: "", accName: "", bankName: ""})
    const [bankbut, setBankBut] = useState(true)
     

    
    

    const handleChange = (e)=>{
        setBankInfo({...bankinfo,[e.target.name]: e.target.value})
    }
    const handleClick = (e)=>{
        setInfo(false)
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        const docRef = doc(db, "bankinfo", userId)
        const payload = {accNo: bankinfo.accNo, accName: bankinfo.accName, bankName: bankinfo.bankName}
        setDoc(docRef, payload)
        setInfo(true)
        setBankBut(true)
    }



    
        
    useEffect(()=>{
        
        auth.onAuthStateChanged((user) => {
            if (user){
                setCurrentUser(user.email)
                
            }
        })
        
    },[userId])

    useEffect(()=>{
        async function fetch(){
            const docRef = doc(db, "profiledetails", userId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setMain(docSnap.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }  
        }
        fetch()
        
        
    })
// IF THERE IS NO VALUE IN THE ADD ACOUUNT FORM LET THE BUTTON BE DISABLED
    useEffect(()=>{
        if (bankinfo.accName.length > 1 && bankinfo.accNo.length > 1 && bankinfo.bankName.length > 1){
            setBankBut(false)
        }
    },[bankinfo])

    useEffect(() =>{
        onSnapshot(doc(db, "bankinfo", userId), (doc) => {
            // console.log(doc.data());
            const datal = doc.data()
            setProfile(datal)
        });
    })


    return(
        <div className="flex flex-col justify-center items-center bg-slate-400 px-5 h-screen">
            <div className="flex justify-between items-center w-full py-5 ">
                <Link to='/welcome'>
                    <IoIosArrowBack size={20} className="text-blue-600"/>
                </Link>
                <p className="text-lg font-s text-bold text-blue-600">View Profile</p>
                <p></p>
            </div>
            <div className="bg-white w-full h-[85%] flex flex-col items-center px-5 py-10 gap-5 rounded-2xl">
                <div className="flex flex-col items-center mb-5 gap-2">
                    <RxAvatar size={40}/>
                    <p>{main.firstname}'s Profile</p>
                </div>
                <div className="w-full flex gap-2">
                    <div className="w-[50%]">
                        <p className="text-slate-300 text-sm">Firstname</p>
                        <p className="w-full h-10 bg-slate-200 rounded-lg border-2 border-black flex items-center px-2">{main.firstname}</p>
                    </div>
                    <div className="w-[50%]">
                        <p className="text-slate-300 text-sm">Lastname</p>
                        <p className="w-full h-10 bg-slate-200 rounded-lg border border-slate-100 flex items-center px-2">{main.lastname}</p>
                    </div>
                </div>
                <div className="w-full flex-start">
                    <p className="text-slate-300 text-sm">Email</p>
                    <p className="w-full h-10 bg-slate-200 rounded-lg border border-slate-100 flex items-center px-2">{currentUser}</p>
                </div>
                <div className="w-full flex-start">
                    <p className="text-slate-300 text-sm">Bank Details</p>
                    <div className="w-full bg-slate-200 rounded-lg border border-slate-100 flex items-center px-2 text-sm gap-2 py-2">
                        {profile.accNo === "null" ? <p>Add bank account</p> : <div className="flex items-center px-2 text-sm gap-2 py-2"><div className="h-6 w-6 rounded-full bg-white flex justify-center items-center">Bank</div>
                        <div>
                            <p>{profile.accNo} - {profile.accName}</p>
                            <p>{profile.bankName}</p>
                        </div></div>
                        }
                        <CiEdit onClick={handleClick} size={20} className="ml-auto"/>
                    </div>
                </div>
                <div className={!info ? "fixed w-full px-5 top-0 bg-white/80 h-screen flex flex-col justify-center items-center" : "hidden"}>
                    <div className="w-full bg-white px-5 py-8">
                        <AiOutlineCloseCircle onClick={()=>setInfo(true)} className="ml-auto flex mb-5" size={18}/>
                        <form className="flex flex-col gap-2">
                            <input 
                                type="text" 
                                onChange={handleChange}
                                value={bankinfo.accNo}
                                placeholder="Account Number" 
                                name="accNo" 
                                className="w-full h-10 bg-slate-200 rounded-lg border border-slate-100 flex items-center px-2" 
                                maxLength="10"
                            />
                            <input 
                                type="text" 
                                onChange={handleChange}
                                value={bankinfo.accName}
                                placeholder="Account Name" 
                                name="accName" 
                                className="w-full h-10 bg-slate-200 rounded-lg border border-slate-100 flex items-center px-2"
                            />
                            <input 
                                type="text" 
                                onChange={handleChange}
                                value={bankinfo.bankName}
                                placeholder="Bank Name" 
                                name="bankName" 
                                className="w-full h-10 bg-slate-200 rounded-lg border border-slate-100 flex items-center px-2"
                            />
                            <button disabled={bankbut} onClick={handleSubmit} className="bg-blue-600 px-3 py-1 w-20 text-white rounded-lg mt-2">submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}