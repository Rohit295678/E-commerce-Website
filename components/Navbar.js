import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AiOutlineShoppingCart, AiFillCloseCircle, AiFillPlusSquare, AiFillMinusSquare } from 'react-icons/ai';
import {BsFillBagCheckFill} from 'react-icons/bs'
import {RiAccountPinCircleFill} from 'react-icons/ri'




const Navbar = ({logOut,user,cart, addtoCart, removeFromCart, clearCart}) => {
  const [sidebar, setSidebar] = useState(false)
  const [drop, setDrop] = useState(false)
  const [dropa, setDropa] = useState(false)
    const cartToggle = ()=>{
      setSidebar(!sidebar)
      //  if(ref.current.classList.contains('translate-x-full')){
      //    ref.current.classList.remove('translate-x-full');
      //    ref.current.classList.add('translate-x-0')
      //  }
      //  else if(ref.current.classList.contains('translate-x-0')){
      //   ref.current.classList.remove('translate-x-0');
      //   ref.current.classList.add('translate-x-full')
      //  }
    }

    useEffect(()=>{
      Object.keys(cart).length!==0 && setSidebar(false)
    },[])

    const ref = useRef();
  return (
    <>
    <span>
    {drop &&<div onMouseOver={()=>{setDrop(true)}} onMouseLeave={()=>{setDrop(false)}} className=" z-30 bg-white shadow-lg border right-11 top-11 rounded-md w-36 px-5 fixed">
        <ul>
          <Link href={'/myaccount'}><li className='py-1 text-sm hover:text-pink-700'>My Account</li></Link>
          <Link href={'/orders'}><li className='py-1 text-sm hover:text-pink-700'>Orders</li></Link>
          <li onClick={logOut} className='py-1 text-sm hover:text-pink-700 cursor-pointer'>Logout</li>
        </ul>
      </div>}
    </span>
    <span>
    {dropa &&<div onMouseOver={()=>{setDropa(true)}} onMouseLeave={()=>{setDropa(false)}} className=" z-30 bg-white shadow-lg border right-11 top-11 rounded-md w-36 px-5 fixed">
        <ul>
          <Link href={'/login'}><li className='py-2 text-sm hover:text-pink-700'>Coustmer Login</li></Link>
          <Link href={'/admin/login'}><li className='py-2 text-sm hover:text-pink-700'>Admin Login</li></Link>
        </ul>
      </div>}
    </span>
    <div className={`flex flex-col md:flex-row md:justify-start justify-center items-center py-2 shadow-md sticky top-0 z-10 bg-white ${!sidebar && 'overflow-hidden'}`}>
      <div className='logo mr-auto md:mx-5'>
        <Link href={'/'}>
        <Image width={200} height={40} src='/logo.png' alt='/logo'/></Link>
      </div>
      <div className='nav'>
        <ul className='flex flex-col md:flex-row items-center md:space-x-4 font-bold md:text-md'>
            <Link href={"/tshirts"}><li>Tshirts</li></Link>
            <Link href={"/hoodies"}><li>Hoodies</li></Link>
            <Link href={"/stickers"}><li>Stickers</li></Link>
            <Link href={"/mug"}><li>Mugs</li></Link>
        </ul>
      </div>
      <div className='cart absolute right-0 top-4 mx-5 cursor-pointer flex'>
        <a>
      {/* {drop && <div className="absolute bg-white shadow-lg border right-9 top-7 rounded-md w-36 px-5">
        <ul>onMouseLeave={()=>{setDrop(false)}}
          <Link href={'/myaccount'}><li className='py-1 text-sm hover:text-pink-700'>My Account</li></Link>
          <Link href={'/orders'}><li className='py-1 text-sm hover:text-pink-700'>Orders</li></Link>
          <li onClick={logOut} className='py-1 text-sm hover:text-pink-700'>Logout</li>
        </ul>
      </div>} */}
      {user.value && <RiAccountPinCircleFill onMouseOver={()=>{setDrop(true)}} onMouseLeave={()=>{setDrop(false)}} className='text-3xl mx-1 md:mx-3'/>}
      </a>
      <a>
        {!user.value && <button onMouseOver={()=>{setDropa(true)}} onMouseLeave={()=>{setDropa(false)}} className='bg-pink-600 rounded-md text-white text-sm px-2 py-1 mx-2'>Login</button>}
        </a>
         <AiOutlineShoppingCart className='text-3xl' onClick={cartToggle}/> 
      </div>
      
      <div ref={ref} className={`w-72 h-[100vh] overflow-y-scroll sideCart absolute top-0 ${sidebar ? 'right-0':'-right-96'} bg-pink-100 px-8 py-10 transition-all`}>
       <h2 className='font-bold text-xl text-center'>Shopping Cart</h2>
       <span onClick={cartToggle} className='absolute top-5 right-2 text-2xl text-pink-600 cursor-pointer'><AiFillCloseCircle/></span>
       <ol className='list-decimal font-semibold'>
        {Object.keys(cart).length==0 && <div className='my-4 font-semibold'>No items in the Cart</div>}
        {!user.value && <><div className='my-8 text-center text-2xl'>Your Cart is Empty</div>
        <Link href={'/login'}><button className="flex mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-800 rounded text-sm">Sign in to your account</button></Link>
        <Link href={'/signUp'}><button className="flex mr-2 my-4 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-800 rounded text-sm">Sign up Now</button></Link></>
          }
        {user.value && Object.keys(cart).map((k)=>{return <li key={k}>
            <div className='item flex my-5'>
            <div className=' flex flex-col w-2/3'>
            <div><img src={cart[k].imag} height={80} width={70} alt='image' /> </div>
              <div>{cart[k].Name}</div> 
              <div>{cart[k].size} {cart[k].variant}</div> 
              </div>
            <div className='flex items-center justify-center w-1/3'><AiFillMinusSquare onClick={()=>{removeFromCart(k,1,cart[k].price,cart[k].Name,cart[k].size,cart[k].imag,cart[k].variant)}} className='mx-2 cursor-pointer text-pink-500'/>{cart[k].qty}<AiFillPlusSquare onClick={()=>{addtoCart(k,1,cart[k].price,cart[k].Name,cart[k].size,cart[k].imag,cart[k].variant)}} className='mx-2 cursor-pointer text-pink-500'/></div>
            </div>
        </li>})}
       </ol>
       {user.value && <div className="flex">
       <Link href={'/checkout'}><button disabled={Object.keys(cart).length===0} className="disabled:bg-pink-300 flex mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-800 rounded text-sm"><BsFillBagCheckFill className='m-1'/>Checkout</button></Link>
       <button disabled={Object.keys(cart).length===0} onClick={clearCart} className="flex mr-2 disabled:bg-pink-300 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-800 rounded text-sm">Clear Cart</button>
       </div>}
      </div>
    </div>
    </>
  )
}

export default Navbar
