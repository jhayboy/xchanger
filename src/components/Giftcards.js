import React, {useEffect, useState, useContext} from "react"
import Coin from "./Data"
import {Link} from "react-router-dom"
import Giftproceed from './Giftproceed'
import {TbCurrencyDollar} from 'react-icons/tb'
import { GiftContext } from "../GiftComponent/GiftContext"
import { PriceContext } from "../GiftComponent/PriceContext"
import { QuantityContext } from "../GiftComponent/QuantityContext"
import { TotalContext } from "../GiftComponent/TotalContext"
import { SellContext } from "../GiftComponent/SellContext"   /*for what*/

// get the $100 GIFTCARD WHICH IS THE AMOUNT

export default function GiftCards(){
  const {setSell} = useContext(SellContext)
  const {setTotals} = useContext(TotalContext)
  const {setPrice} = useContext(PriceContext)
  const {setQuantities} = useContext(QuantityContext)
  const {setTrade} = useContext(GiftContext)
  const [buyCard, setBuyCard] = useState(true)
  const [sellCard, setSellCard] = useState(true)
  const [coin, setCoin] = useState(false)
  const [cardPrice, setCardPrice] = useState({price: "", quantity: ""})
  const [activeCard, setActiveCard] = useState([])
  const [next, setNext] = useState(true)
  const selltotal = activeCard.price * cardPrice.price
  const buytotal = activeCard.buyprice * cardPrice.price

  const hugetotal = buyCard  ? buytotal : activeCard.buyprice ?  selltotal : activeCard.price 
  const paymentprice = hugetotal * cardPrice.quantity
  const handleClick = (item) => {
    setCoin(!coin)
    setActiveCard(item)
  }
  useEffect(()=>{
    if (cardPrice.price.length > 0 && cardPrice.quantity.length > 0){
      setNext(false)
    }
    if (cardPrice.price.length === 0 && cardPrice.quantity.length === 0){
      setNext(true)
    }
  },[cardPrice])
  useEffect(()=>{
    if (buyCard){
      setTrade("buy")
    }
    
  })
  const handleSubmit = ()=> {
    setQuantities(activeCard)
    setTotals(buytotal)
    setPrice(cardPrice)
  }

  const handleBuy =()=>{
    setBuyCard(true)
    setSellCard(true)
    setTrade("buy")
  }
  const handleSell =()=>{
    setSellCard(false)
    setBuyCard(false)
    setTrade("sell")
  }

  useEffect(()=> {
    if (cardPrice.price) {
      setSell(selltotal)
    }
  },[cardPrice.price, setSell,  selltotal])
  const handleChange = (event) =>{
    setCardPrice({...cardPrice,[event.target.name]: event.target.value})
    
  }

  

    return(
        <div>
            <div className="h-screen overflow-scroll scrollbar-hide md:h-screen px-8 pb-20 pt-32 dark:bg-[#010f24]">
                {Coin.map((item) => {
                  return(
                    <div onClick={()=>handleClick(item)} key={item.id} className="flex justify-between items-center mt-8 pb-3 border border-t-0 border-x-0 border-b-slate-200 dark:border-b-slate-700 ">
                        <div className="flex justify-center items-center gap-2">
                          <div>
                            <img src={item.image} alt={item.name} className="w-10 h-10 rounded-full object-cover"/>
                          </div>
                          <div>
                            <p className="font-semibold dark:text-white">{item.name}</p>
                            <p className="text-slate-600 font-semibold uppercase">{
                            item.symbol}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <p className="dark:text-white">{item.perd}</p>
                        </div>
                    </div>
                  )
                })}
              </div>

              {coin ? <div onClick={handleClick} className="fixed bg-black/80 w-full h-screen top-0 z-10"></div> : ""}
              <div className={coin ? "fixed bottom-0 right-0 left-0 bg-slate-200 p-8 top-52 z-10 rounded-t-3xl overflow-y-auto scrollbar-y-hide" : "fixed bottom-0 right-0 left-0 bg-slate-200 p-8 top-52 z-10 rounded-t-3xl hidden"}>
                <div className="flex flex-col justify-between  items-center w-full">
                  <div className="border-2 border-slate-400 border-t-0 border-x-0 w-full flex flex-col items-center justify-center">
                    <img src={activeCard.image} alt='cardImage' className="object-cover w-20 h-20 rounded-full mx-auto"/>
                    <p className="my-5">{activeCard.name}</p>
                  </div>
                  <div className="gap-2 flex ">
                    <button onClick={handleBuy} className={buyCard ? "px-5 py-2 text-white font-semibold mt-2 bg-blue-600" : "px-5 py-2 text-white font-semibold mt-2 bg-blue-400"}>BUY</button>
                    <button onClick={handleSell} className={sellCard ? "px-5 py-2 text-white font-semibold mt-2 bg-blue-400" : "px-5 py-2 text-white font-semibold mt-2 bg-blue-600"}>SELL</button>
                  </div>
                  <div className="mt-5 flex items-center justify-center w-full bg-white rounded-lg py-2">
                    <div className="flex justify-end w-[40%]">
                      <TbCurrencyDollar className=""/>
                    </div>
                    <input name="price" value={cardPrice.price} onChange={handleChange} placeholder='amount' type="number" className="appearance-none w-[50%] border-none outline-none bg-transparent font-semibold"/>
                  </div>
                  <div className="bg-white mt-3 w-full rounded-xl py-3 flex flex-col justify-center items-center ">
                    
                    <p className="font-semibold">{cardPrice.price ? cardPrice.price : "0"} ~ NGN {hugetotal}</p>
                  </div>
                  <div className="bg-white mt-3 w-full rounded-xl py-3 flex flex-col justify-center items-center ">
                    <input type="number" name="quantity" onChange={handleChange} value={cardPrice.quantity} placeholder="Quantity" className="appearance-none border-none outline-none font-semibold text-center" />
                  </div>
                  <Link to='/giftcardtrading' >
                    <button disabled={next} onClick={handleSubmit} className="px-5 py-2 text-white font-semibold mt-3 bg-blue-600">Proceed</button>
                  </Link>
                  {/* Buy and sell crypto section for Picoin */}

                <div className="hidden">
                  <Giftproceed cardsellprice={activeCard.price} cardbuyprice={activeCard.buyprice}/>
                </div>
                </div>
              </div>
        </div>
    )
}