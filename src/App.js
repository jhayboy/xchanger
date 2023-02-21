import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Homes";
import Login from "./components/Login";
import Welcome from "./components/Welcome";
import Register from "./components/Register";
import Trade from "./components/Trade";
import Profile from "./components/Profile";
import Payment from "./components/Payment";
import Giftproceed from "./components/Giftproceed";
import ConfirmTrade from "./components/ConfirmTrade";
import EmailStart from "./SupportEngine/EmailStart";
import Paystack from "./components/Paystack";
import Admin from "./Admin/Admin";
import About from "./components/About";
import Wallet from "./components/Wallet"
import { UserContext } from "./components/UserContext";
import { AmountContext } from "./components/AmountContext";
import { GiftContext } from "./GiftComponent/GiftContext";
import { QuantityContext } from "./GiftComponent/QuantityContext";
import { PriceContext } from "./GiftComponent/PriceContext";
import { TotalContext } from "./GiftComponent/TotalContext";
import { UsersContext } from "./ProfileComponent/UsersContext";
import { SellContext } from "./GiftComponent/SellContext";
import { StackPriceContext } from "./Stack/StackPriceContext";
import { WalletContext } from "./GiftComponent/WalletContext";
import Forgotten from "./components/Forgotten";
// import { AuthContext } from "./components/Auth";

function App() {
const [list, setList] = useState("")
const [tradeAmount, setTradeAmount] = useState("")
const [trade, setTrade] = useState("")
const [price, setPrice] = useState('')
const [quantities, setQuantities] = useState('')
const [totals, setTotals] = useState('')
const [users, setUsers] = useState('')
const [sell, setSell] = useState('')
const [payment, setPayment] = useState('')
const [walletad, setWalletad] = useState('')

 
  return (
    <WalletContext.Provider value={{walletad, setWalletad}}>
      <StackPriceContext.Provider value={{payment, setPayment}}>
        <SellContext.Provider value={{sell, setSell}}>
          <UsersContext.Provider value={{users, setUsers}}>
            <QuantityContext.Provider value={{quantities, setQuantities}}>
              <TotalContext.Provider value={{totals, setTotals}}>
                <PriceContext.Provider value={{price, setPrice}}>
                  <GiftContext.Provider value={{trade, setTrade}}>
                    <AmountContext.Provider value={{tradeAmount, setTradeAmount}}>
                      <UserContext.Provider value={{list, setList}}>
                        <Router>
                          <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/resetpassword" element={<Forgotten />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/welcome" element={<Welcome />} />
                            <Route path="/tradeCoin" element={<Trade />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/adminonly" element={<Admin />} />
                            <Route path="/wallet" element={<Wallet />} />
                            <Route path="/confirmtrade" element={<ConfirmTrade />} />
                            <Route path="/paymentaddress" element={<Payment />} />
                            <Route path="/emailsupport" element={<EmailStart />} />
                            <Route path="/giftcardtrading" element={<Giftproceed />} />
                            <Route path="/payment" element={<Paystack />} />
                            <Route path="/about" element={<About />} />
                          </Routes>
                        </Router>
                      </UserContext.Provider>
                    </AmountContext.Provider>
                  </GiftContext.Provider>
                </PriceContext.Provider>
              </TotalContext.Provider>
            </QuantityContext.Provider>
          </UsersContext.Provider>
        </SellContext.Provider>
      </StackPriceContext.Provider>
    </WalletContext.Provider>
  );
}

export default App;
