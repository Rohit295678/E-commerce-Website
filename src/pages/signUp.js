import React, { useState, useEffect } from "react";
import { AiFillGoogleCircle,AiFillTwitterCircle,AiFillFacebook} from 'react-icons/ai'
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { useRouter } from "next/router";

const SignUp = () => {
  const router = useRouter();
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [phone, setPhone] = useState()
  const [password, setPassword] = useState()

  useEffect(()=>{
    if(localStorage.getItem('myuser')){
      if(Object.keys(JSON.parse(localStorage.getItem('myuser'))).length!=0){
          router.push('/')
      }
   }
 },[])

  const handleChange = (e)=>{
    if(e.target.name === 'name'){
      setName(e.target.value)
    }
    else if(e.target.name === 'email'){
      setEmail(e.target.value)
    }
    else if(e.target.name === 'password'){
      setPassword(e.target.value)
    }
    else if(e.target.name === 'phone'){
      setPhone(e.target.value)
    }
  }

  const handleSubmit = async(e)=>{
     e.preventDefault()
     if(phone.length!=10){
      toast.error('Invalid Phone no', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        setPhone('')
     }
     else{
     const data = {name, email, password,phone}
     let res = await fetch("http://localhost:3000/api/addUser", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    let response = await res.json()
     setName('')
     setEmail('')
     setPassword('')
     setPhone('')
     toast.success('Your Account has been created', {
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
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
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
      <div
      className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
      <div
        className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          className="w-full"
          alt="Sample image" />
      </div>
  <div className="flex flex-col items-center justify-center mb-12 md:my-6 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12 px-6 py-8 mx-auto md:h-screen lg:py-0">
      
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign Up to your account
              </h1>
              <div className="flex space-x-2 flex-row items-center justify-center lg:justify-start">
              <p className="mb-0 mr-4 text-lg">Sign Up with</p>
                <AiFillFacebook  className="text-3xl text-pink-600"/>
                <AiFillGoogleCircle className="text-3xl text-pink-600"/>
                <AiFillTwitterCircle className="text-3xl text-pink-600"/>
              </div>
              <div
            className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
            <p
              className="mx-4 mb-0 text-center font-semibold dark:text-white">
              Or
            </p>
          </div>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" method="POST">
              <div>
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                      <input value={name} onChange={handleChange} type="name" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="xyz" required=""/>
                  </div>
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input value={email} onChange={handleChange} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                  </div>
                  <div>
                      <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone No</label>
                      <input value={phone} onChange={handleChange} type="number" name="phone" id="phone" placeholder="1234567890" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input value={password} onChange={handleChange} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                  
                  <button type="submit" className="w-full text-white bg-pink-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign Up</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account! <Link href={'/login'} className="font-medium text-pink-600 hover:underline dark:text-primary-500 mx-1">Log in</Link>
                  </p>
              </form>
          </div>
      </div>
  </div>
  </div>
</section>
  );
};

export default SignUp;