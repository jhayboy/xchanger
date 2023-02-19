import React, {useState} from "react"
import { PaystackButton } from 'react-paystack'


const Paystack = () =>{
    const publicKey = "pk_live_dc52ed0c16dd74ec90c5c9400fe5b0dd2b6ccac2"
  const amount = 1000000 // Remember, set in kobo!
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")

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
    onClose: () => alert("Wait! You need this oil, don't go!!!!"),
  }
    return (
        <div>
            <div className="checkout-form">
                <div className="checkout-field">
                    <label>Name</label>
                    <input
                    type="text"
                    id="name"
                    onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="checkout-field">
                    <label>Email</label>
                    <input
                    type="text"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="checkout-field">
                    <label>Phone</label>
                    <input
                    type="text"
                    id="phone"
                    onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div className="checkout-field">
                    <label>Address</label>
                    <input
                    type="text"
                    id="phone"
                    onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                 <PaystackButton className="paystack-button" {...componentProps} />
            </div>
        </div>
    )
}

export default Paystack