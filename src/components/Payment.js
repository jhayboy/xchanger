import React, { useState, useRef, useContext, useEffect } from 'react'
import {IoIosArrowBack} from "react-icons/io"
import {FiClipboard} from "react-icons/fi"
import {BsCheckCircleFill} from "react-icons/bs"
import {CiWarning} from 'react-icons/ci'
import {Link, useNavigate} from "react-router-dom"
import {doc, onSnapshot, addDoc, collection, serverTimestamp } from "firebase/firestore"
import db from "./firebase"
import {auth} from "./firebase"
import { UserContext } from './UserContext'
import { AmountContext } from "./AmountContext"
import { UsersContext } from '../ProfileComponent/UsersContext'
import { GiftContext } from "../GiftComponent/GiftContext"

export default function Payment(){
    const navigate = useNavigate()
    const {trade} = useContext(GiftContext)
    const {users} = useContext(UsersContext)
    const {list} = useContext(UserContext)
    const {tradeAmount} = useContext(AmountContext)
    const [profile, setProfile] = useState([])
    const [trans, setTrans] = useState(true)
    const [copy, setCopy] = useState(true)
    const [accNull, setAccNull] = useState(true)
    const [currentUser, setCurrentUser] = useState('')
    const userId = localStorage.getItem("firebaseUserId")
    const wallet = "GA3ZATDGG7WBTCNBZYKII6UTKWLTHQVH4GU4FUKEBSVZNTLMQ343NTPI"
    const smartchain = "0xdecedfdf6a33975d26391916478c76f2d9aaaab4"
    const Core = "0x515384a826f92caa87ccb790c0a87b4d2bb6e2e9"
    const sold = trade === "sellprice"? "sold" : "bought"
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
    "July", "Aug", "Sep", "Oct", "Nov", "Dec"
];
    const date = new Date();
    const monthNumber = date.getMonth();
    const monthName = monthNames[monthNumber];
    const today = date.getDate()
    const year = date.getFullYear()

    const handleClick = () =>{
        navigator.clipboard.writeText(list.symbol !== "PI" ? smartchain : wallet);
        setCopy(false)
    }
    const handleTrans = async()=>{
        setTrans(false)
        const coin = list.symbol
        const docRef = await addDoc(collection(db, "Transaction"), {
            date: today,
            month: monthName,
            year: year,
            time: realtime,
            sold: sold,
            amount: tradeAmount,
            coin: coin,
            price: users,
            timestamp: serverTimestamp(),
            status: "pending",
            unique: userId,
            email: currentUser
        });
        console.log("Document written with ID: ", docRef.id)
    }

    const [time, setTime] = useState(new Date());
    const [ timeOfDay, setTimeOfDay] = useState('');
  
    useEffect(() => {
      const interval = setInterval(() => {
        setTime(new Date());
      }, 1000);
      return () => clearInterval(interval);
    }, []);
    // console.log(timeOfDay)
    

    useEffect(()=>{
        if (!tradeAmount){
            navigate('/welcome')
        }
    })
    useEffect(() => {
        const hours = time.getHours();
        const minutes = time.getMinutes();
      setTimeOfDay(hours < 12 ? 'AM' : 'PM');
    }, [time, setTimeOfDay]);
    const realtime = time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    
    useEffect(()=>{
        
        auth.onAuthStateChanged((user) => {
            if (user){
                setCurrentUser(user.email)
                
            }
        })
        
    },[userId])
    
 

    
    // the 5min interval countdown
    const formatTime = (time) => {
        let minutes = Math.floor(time / 60)
        let seconds = Math.floor(time - minutes * 60)

        if (minutes <= 10 ) minutes = '0' + minutes
        if (seconds < 10 ) seconds = '0' + seconds
        return minutes + ':' + seconds
    }
    const [countdown, setCountDown] = useState(300)
    const timerId = useRef()

    useEffect(()=> {
        timerId.current = setInterval(()=>{
            setCountDown(prev => prev - 1)
        }, 1000)
        return () => clearInterval(timerId.current)
    },[])

    useEffect(()=>{
        onSnapshot(doc(db, "bankinfo", userId), (doc) => {
            // console.log(doc.data());
            const datal = doc.data()
            setProfile(datal)
        });
    })
    useEffect(()=>{
        if(profile.accNo === "null"){
            setAccNull(true)
        } else{
            setAccNull(false)
        }
    },[profile])
    useEffect (() => {
        if(countdown <= 0) {
            clearInterval(timerId.current)
        }
    }, [countdown])
    // end of the 5min interval

    return(
        <div>
            <div className='w-full'>
                <div className="flex justify-between text-white items-center fixed top-0 right-0 left-0 bg-blue-600 w-full p-2">
                    <Link to='/tradeCoin'>
                        <IoIosArrowBack size={20}/>
                    </Link>
                    <p>Payment Address </p>
                    <p></p>
                </div>
                <div className={profile.accNo === "null" ? 'hidden' : 'flex flex-col p-8 mt-10'}>
                    <p>Payment Address: {!list.min ? "BNB Smart Chain (BEP20)" : ""} </p>
                    <div className='rounded-lg text-sm py-2 mt-1 bg-blue-600 overflow-auto px-2'>
                      <p>{!list.min ? smartchain : list.symbol === "PI" ? wallet : Core}</p>
                    </div>
                    <div className='flex items-center'>
                      <FiClipboard onClick={handleClick}/><p className={!copy ? "text-green-600" : ""}>{!copy ? "copied" : "copy"}</p>
                    </div>

                    <p className='mt-8 text-center'>Trasnfer {tradeAmount}{list.symbol} to the wallet address above in {formatTime(countdown)}, then come back and click on the transferred button.</p>
                    <div className='w-full flex justify-center items-center'>
                       <button disabled={accNull} onClick={handleTrans} className=" mt-8 bg-blue-600 p-3 text-white outline-none rounded-lg">Trasnferred</button>
                    </div>
                </div>

                {/* Adding of bank account to profile */}
                <div className={profile.accNo === "null" ? 'w-full flex flex-col justify-center items-center mt-20 gap-2' : 'hidden'}>
                    <div>
                        <CiWarning size={40} className='text-yellow-400 font-bold'/>
                        <p>you have not added a bank acocunt</p>
                        <Link to='/profile'>
                            <button className='bg-blue-600 px-2 py-1 text-white outline-none rounded-lg'>Add account</button>
                        </Link>
                    </div>
                </div>
                <div className={!trans ? "flex flex-col justify-center items-center gap-5 fixed top-0 bg-white bottom-0 px-5 w-full" : "hidden"}>
                        <BsCheckCircleFill size={40} className="text-green-500"/>
                    <p className="text-center">Once the transfer of {tradeAmount}{list.symbol} have been confirmed, &#8358;{users} will be deposited into your {profile.bankName} account with the account number {profile.accNo}</p>
                    <Link to='/welcome'>
                      <button className="bg-blue-600 p-3 px-5 rounded-lg text-white outline-none">Continue</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

