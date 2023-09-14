import React, { useState } from 'react'
import Link from 'next/link'
import {AiFillPlusSquare, AiFillMinusSquare } from 'react-icons/ai';
import Head from 'next/head';
import Script from 'next/script';
import { useRouter } from 'next/router';


 const Checkout = ({cart,addtoCart, removeFromCart, clearCart,total,user}) => {
 const [name, setName] = useState('')
 const [email, setEmail] = useState(user.email)
 const [phone, setPhone] = useState('')
 const [address, setAddress] = useState('')
 const [pin, setPin] = useState('')
 const [city, setCity] = useState('')
 const [state, setState] = useState('')
 const [disable, setDisable] = useState(true)

 const router = useRouter();
 
 const handelchange = async (e)=>{
    if(e.target.name=='name'){
      setName(e.target.value);
    }
    if(e.target.name=='email'){
      setEmail(e.target.value);
    }
    if(e.target.name=='phone'){
      setPhone(e.target.value);
    }
    if(e.target.name=='address'){
      setAddress(e.target.value);
    }
    if(e.target.name=='pin'){
      setPin(e.target.value);
      if(e.target.value.length==6){
      const pins = await fetch('http://localhost:3000/api/pincode')
     const pinjson = await pins.json()
     if(Object.keys(pinjson).includes(e.target.value)){
       setCity(pinjson[e.target.value][0])
       setState(pinjson[e.target.value][1])
     }
    }
    else{
      setCity('')
      setState('')
    }
    }
   if(name.length>3 && address.length>3 && phone.length>3  && pin.length>3 ){
     setDisable(false)
   }
   else{
    setDisable(true)
   }
 }

 const handelSubmit = async(e)=>{
  let orderId = Math.random().toString()
   orderId = orderId.substring(9);
  e.preventDefault()
  const data = {cart,email,orderId,address, phone,total,city,state,name, pin}
  let res = await fetch("http://localhost:3000/api/addOrder", {
   method: "POST", // or 'PUT'
   headers: {
     "Content-Type": "application/json",
   },
   body: JSON.stringify(data),
 })

 let response = await res.json()
  setName('')
  setEmail('')
  setAddress('')
  setPhone('')
  setPin('')
  setState('')
  setCity('')
  router.push('/order?id='+orderId)
}
//   const initiatePay=()=>{
//     let txntoken;
//     let amount;
//     var config = {
//       "root": "",
//       "flow": "DEFAULT",
//       "data": {
//       "orderId": Math.random(), /* update order id */
//       "token": txntoken, /* update token value */
//       "tokenType": "TXN_TOKEN",
//       "amount": amount /* update amount */
//       },
//       "handler": {
//       "notifyMerchant": function(eventName,data){
//       console.log("notifyMerchant handler function called");
//       console.log("eventName => ",eventName);
//       console.log("data => ",data);
//       }
//       }
//       };
      
//       // initialze configuration using init method
//       window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
//       // after successfully updating configuration, invoke JS Checkout
//       window.Paytm.CheckoutJS.invoke();
//       }).catch(function onError(error){
//       console.log("error => ",error);
//       });
      
 //  }
  return (
    <div className='container mx-2 px-2 sm:m-auto'>
      <Head>
  <meta name="viewport" content="width=device-width height=device-height, initial-scale=1.0 , minimum-scale=1.0"/>
  </Head>
  <Script type="application/javascript" src={`${process.env.Paytm_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.Paytm_MID}.js`} onload="onScriptLoad();" crossorigin="anonymous"/>
      <h1 className="font-bold text-3xl my-8 text-center">Checkout</h1>
      <h2 className='font-semibold text-xl px-2'>1. Delivery Details</h2>
      <div className="mx-auto flex my-4">
        <div className="px-2 w-1/2">
        <div className="mb-4">
        <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
        <input onChange={handelchange} value={name} type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      </div>
      <div className="px-2 w-1/2">
      <div className="mb-4">
        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
        {user.value? <input value={user.email} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly/> :<input onChange={handelchange} value={email} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>}
      </div>
        </div>
        </div>
      <div className=" px-2 mx-auto">
        <label htmlFor="message" className="leading-7 text-sm text-gray-600">Address</label>
        <textarea onChange={handelchange} value={address} id="address" name="address" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-16 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
      </div>
      <div className="mx-auto flex my-4">
        <div className="px-2 w-1/2">
        <div className="mb-4">
        <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
        <input onChange={handelchange} value={phone} type="number" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      </div>
      <div className="px-2 w-1/2">
      <div className="mb-4">
        <label htmlFor="pin" className="leading-7 text-sm text-gray-600">Pincode</label>
        <input onChange={handelchange} value={pin} type="number" id="pin" name="pin" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
        </div>
        </div>
        <div className="mx-auto flex my-4">
        <div className="px-2 w-1/2">
      <div className="mb-4">
        <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
        <input value={city} type="text" id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly={true}/>
      </div>
        </div>
        <div className="px-2 w-1/2">
        <div className="mb-4">
        <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
        <input value={state} type="text" id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"readOnly={true}/>
      </div>
      </div>
      
        </div>
        <h2 className='font-semibold text-xl px-2'>2. Review cart items & Pay</h2>

        <div className="sideCart bg-pink-100 p-6 m-2">
       <ol className='list-decimal font-semibold'>
        {Object.keys(cart).length==0 && <div className='my-4 font-semibold'>No items in the Cart</div>}
        {Object.keys(cart).map((k)=>{return <li key={k}>
            <div className='item flex my-5'>
            <div className=' flex flex-col w-1/4'>
              <div>{cart[k].Name}</div> 
              <div>{cart[k].size}</div> 
              <div>{cart[k].variant}</div></div>
            <div className='flex items-center justify-center'><div className='mx-3'><img src={cart[k].imag} height={100} width={80} alt='image'/> </div><AiFillMinusSquare onClick={()=>{removeFromCart(k,1,cart[k].price,cart[k].Name,cart[k].size,cart[k].imag,cart[k].variant)}} className='mx-2 cursor-pointer text-pink-500'/>{cart[k].qty}<AiFillPlusSquare onClick={()=>{addtoCart(k,1,cart[k].price,cart[k].Name,cart[k].size,cart[k].imag,cart[k].variant)}} className='mx-2 cursor-pointer text-pink-500'/></div>
            </div>
        </li>})}
        <span className='font-bold'>SubTotal : ₹{total}</span>
       </ol>
      </div>
      <div className="mx-4">
       <Link href={''}><button onClick={handelSubmit} disabled = {disable} className="disabled:bg-pink-300 flex mr-2 text-white bg-pink-500 border-0 py-2 px-4 focus:outline-none hover:bg-pink-800 rounded text-sm">Pay ₹{total}</button></Link>
       </div>
    </div>
  )
}



export default Checkout
