import React, {useState, useEffect,useContext} from "react"
import {IoIosArrowBack} from "react-icons/io"
import {Link, useNavigate} from "react-router-dom"
import { UserContext } from "./UserContext"
import { GiftContext } from "../GiftComponent/GiftContext"

export default function Trade(){
    const {trade} = useContext(GiftContext)
    const {list} = useContext(UserContext)
    // getting the values of the input 
    const [address, setAddress] = useState({quantity:""})
    const [next, setNext] = useState(true)
    const navigate = useNavigate()
    // const [close, setClose] = useState(true)

   useEffect(()=>{
    if (!trade){
        navigate('/welcome')
    }
   })
   useEffect(() => {
    if (!address) {
        setNext(true)
    }
    if (address) {
        setNext(false)
    }
   },[address])
    const handleChange = (event) =>{
        setAddress({...address, [event.target.name]: event.target.value})
    }
    console.log(list.name)
    return(
        <div>
            <div className="flex justify-between text-white items-center fixed top-0 right-0 left-0 bg-blue-600 w-full p-2">                
                <Link to='/welcome'>
                  <IoIosArrowBack size={20}/>
                </Link>
                <p>Input your {list.name} wallet address</p>
                <p></p>
            </div>
            <div className="flex flex-col justify-center items-center px-8 mt-20">
                <p>Your {list.name} will be sent to this address</p>
                <div className="flex justify-start items-center w-full border p-2 mt-5">
                    <img className="w-5" src={list.image} alt="logo"/>
                    <input 
                        onChange={handleChange} 
                        value={address.quantity} 
                        type="text" 
                        name="quantity" 
                        className="outline-none border-0 ml-2 appearance-none" 
                        placeholder="Wallet Address"
                    />
                </div>
                <Link to='/payment'>
                    <button disabled={next} className=" mt-5 bg-blue-600 p-3 text-white outline-none">Proceed to payment</button>
                </Link>
            </div> 
        </div>
    )
}