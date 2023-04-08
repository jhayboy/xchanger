import React, {useState, useEffect} from "react"
import { Link } from "react-router-dom";
import 'firebase/firestore';
import axios from "axios"
import {doc, onSnapshot, setDoc, getDoc} from "firebase/firestore"
// onAuthStateChanged,
import {  sendEmailVerification} from "firebase/auth"
import {MdVerified} from "react-icons/md"
import db from "./firebase"
import {auth} from "./firebase"
import {IoIosArrowBack} from "react-icons/io"
import {RxAvatar} from "react-icons/rx"
import {CiEdit} from "react-icons/ci"
import {AiOutlineCloseCircle, AiOutlinePlus} from "react-icons/ai"




export default function Profile(){
    const [profile, setProfile] = useState([])
    const [main, setMain] = useState([])
    const [info, setInfo] = useState(true)
    const [currentUser, setCurrentUser] = useState()
    const userId = localStorage.getItem('firebaseUserId');
    const [bankinfo, setBankInfo] = useState({accNo: "", accName: "", bankName: ""})
    const [verified, setVerified] = useState()
    const [bankbut, setBankBut] = useState(true)
    const [sent, setSent] = useState(false)
    const [listed, setListed] = useState([])
    const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=ngn&order=market_cap_desc&per_page=3&page=1&sparkline=false'
     

    
    
    const Sendemail = () => {
       auth.onAuthStateChanged((user) => {
           sendEmailVerification(user)
           .then(() => {
               // Email verification sent!
               setSent(true);
               // ...
            });
            setTimeout(()=> {
                setSent(false)
            }, 4000)

       })
    }
    
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
                setVerified(user.emailVerified)
                
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
    useEffect(()=>{
        axios.get(url).then((response)=>{
          setListed(response.data)
          // console.log(response.data)
        }).catch((error)=>{
          console.log(error)
        })
    },[])


    return(
        <div className="flex flex-col justify-center items-center bg-slate-400 px-5 h-screen">
            <div className={sent ? "fixed top-0 right-0 left-0 w-full flex justify-center items-center" : "hidden"}>
                <div className="w-[90%] bg-white gap-2 py-3 flex justify-center items-center mt-2 rounded-md">
                    <p className="text-sm">Email Verification sent! Check your mail box</p>
                    <MdVerified size={20 } className="text-green-500"/>
                </div>
            </div>
            <div className="flex justify-between items-center w-full py-5 ">
                <Link to='/welcome'>
                    <IoIosArrowBack size={20} className="text-blue-600"/>
                </Link>
                <p className="text-lg font-s text-bold text-blue-600">View Profile</p>
                <p></p>
            </div>
            <div className="bg-white w-full h-[85%] flex flex-col items-center px-5 py-10 gap-5 rounded-2xl overflow-hidden overflow-auto">
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
                    <div>{verified === true ? <p className="text-sm text-green-500 ">verified</p> : <p onClick={Sendemail} className="text-sm text-red-500">verify your email</p>}</div>
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
                <p className="flex items-center gap-2">Add Wallet Address <AiOutlinePlus/></p>
                </div>
                <div className="w-full bg-slate-200 rounded-lg border border-slate-100 flex flex-col px-2 text-sm gap-2 py-2">
                    {listed.map((item) => {
                        return(
                            <div className="flex items-center" key={item.id}>
                                <img className="w-5 h-5 rounded-full" src={item.image} alt={item.id}/>
                                <p>{item.name}</p>
                            </div>
                        )
                    })}
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