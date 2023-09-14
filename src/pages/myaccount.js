import { useRouter } from 'next/router'
import React from 'react'
import { useEffect,useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const myaccount = ({user}) => {

  const [name, setName] = useState('')
 const [email, setEmail] = useState(user.email)
 const [phone, setPhone] = useState('')
 const [address, setAddress] = useState('')
 const [pin, setPin] = useState('')
 const [city, setCity] = useState('')
 const [state, setState] = useState('')
 const [pass, setPass] = useState('');
 const [cpass, setCpass] = useState('');
  let router = useRouter()
  useEffect(()=>{
    if(localStorage.getItem('myuser')){
      if(Object.keys(JSON.parse(localStorage.getItem('myuser'))).length!=0){
          router.push('/')
      }
   }
 },[])

 const handelUserSubmit = async ()=>{
  let data = {token: user.value,address: address,pin: pin,phone: phone,name: name}
  let res = await fetch("http://localhost:3000/api/getUser", {
   method: "POST", // or 'PUT'
   headers: {
     "Content-Type": "application/json",
   },
   body: JSON.stringify(data),
 })

 let response = await res.json()
  if(response.success){
    toast.success('Your Account has been Updated.', {
      position: "bottom-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }
 }

 const handelPassSubmit = async ()=>{
  let data = {token: user.value, password: pass,cpassword: cpass}
  let res = await fetch("http://localhost:3000/api/updatePass", {
   method: "POST", // or 'PUT'
   headers: {
     "Content-Type": "application/json",
   },
   body: JSON.stringify(data),
 })

 let response = await res.json()
 setPass('')
  setCpass('')
  if(response.success){
    toast.success('Your Password has been Updated.', {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }
  if(response.error){
    toast.error('Wrong Old Password.', {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }

 }

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
  if(e.target.name=='password'){
      setPass(e.target.value);
  }
  if(e.target.name=='cpassword'){
        setCpass(e.target.value);
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
}
  return (<>
    <ToastContainer
position="top-center"
autoClose={1000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
    <div className='container mx-auto my-9'>
      <div className="text-3xl text-center font-bold">Update Your Account</div>
      <h2 className='text-xl font-semibold mx-2 my-8'>1. Delivery Details</h2>
      <div className="mx-auto flex my-4">
        <div className="px-2 w-1/2">
        <div className="mb-4">
        <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
        <input onChange={handelchange} value={name} type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      </div>
      <div className="px-2 w-1/2">
      <div className="mb-4">
        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email (can't be updated)</label>
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
        <button onClick={handelUserSubmit} className="disabled:bg-pink-300 flex ml-2 text-white bg-pink-500 border-0 py-2 px-4 focus:outline-none hover:bg-pink-800 rounded text-sm">Submit</button>

        <h2 className='text-xl font-semibold mx-2 my-8'>2. Update Your Password</h2>
      <div className="mx-auto flex my-4">
        <div className="px-2 w-1/2">
        <div className="mb-4">
        <label htmlFor="password" className="leading-7 text-sm text-gray-600">Old Password</label>
        <input onChange={handelchange} value={pass} type="password" id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      </div>
      <div className="px-2 w-1/2">
      <div className="mb-4">
        <label htmlFor="password" className="leading-7 text-sm text-gray-600">New Password</label>
        <input onChange={handelchange} value={cpass} type="password" id="cpassword" name="cpassword" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
        </div>
        </div>
        <button onClick={handelPassSubmit} className="disabled:bg-pink-300 flex ml-2 text-white bg-pink-500 border-0 py-2 px-4 focus:outline-none hover:bg-pink-800 rounded text-sm">Submit</button>
    </div>
    </>
  )
  }

export default myaccount
