import React, {useState, useContext, useEffect} from "react"
import { PaystackButton } from 'react-paystack'
import { StackPriceContext } from "../Stack/StackPriceContext"
import 'firebase/firestore';
import {doc, getDoc} from "firebase/firestore"
import db from "./firebase"
import {auth} from "./firebase"


const Paystack = () =>{
  const {payment} = useContext(StackPriceContext)
  const userId = localStorage.getItem('firebaseUserId');
  const publicKey = "pk_live_dc52ed0c16dd74ec90c5c9400fe5b0dd2b6ccac2"
  const amount = payment * 100 // Remember, set in kobo!
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [lock, setLock] = useState(true)
  const [main, setMain] = useState([])
  const Usersname = main.firstname + " " + main.lastname

  useEffect(() =>{
    if (name && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email) && phone) {
        setLock(false)
    } else{
        setLock(true)
    }
},[name, phone, email])

  useEffect (()=> {
    auth.onAuthStateChanged((user) => {
      setEmail(user.email)
    })
  })

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
  const componentProps = {
    email,
    amount,
    metadata: {
      name,
      phone,
    },
    publicKey,
    text: "Pay Now",
    onSuccess: () =>
      alert("Thanks for doing business with us! Come back soon!!"),
    onClose: () => alert("Thanks for the attempt, we hope you change your mind"),
  }
    return (
        <div className="flex flex-col items-center justify-center h-screen px-8 bg-[#010f24] text-white">
          <div className='flex justify-center items-center gap-1 text-white mb-3'>
            <p className='font-semibold text-2xl'>Exhancy</p>
        </div>
      {/* <h1 className="text-2xl font-bold mb-4 text-white">Contact Support</h1> */}
            <div className="w-full max-w-sm">
                <div className="checkout-field md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label className="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4">
                      Name
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      type="text"
                      className="w-full px-1 py-2 text-black border-0 outline-0"
                      id="name"
                      value={Usersname}
                      onChange={(e) => setName(e.target.value)}
                      />
                  </div>
                </div>
                
                <div className="checkout-field md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label className="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4">
                      Email
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      type="text"
                      className="w-full px-1 py-2 text-black border-0 outline-0"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      />
                  </div>
                </div>
                
                <div className="checkout-field md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label className="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4">
                      Phone
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      type="text"
                      className="w-full px-1 py-2 text-black border-0 outline-0"
                      id="phone"
                      value={main.MobileNumber}
                      onChange={(e) => setPhone(e.target.value)}
                      />
                  </div>
                </div>
                 <PaystackButton disabled={lock} className="paystack-button bg-green-600 p-3" {...componentProps} />
            </div>
        </div>
    )
}

export default Paystack