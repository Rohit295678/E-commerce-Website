import '@/styles/globals.css'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Head from 'next/head'
import { useState,useEffect } from 'react'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingBar from 'react-top-loading-bar'
 

export default function App({ Component, pageProps }) {
  const [cart, setcart] = useState({});
  const [total, setTotal] = useState(0);
  const [user, setUser] = useState({value: null})
  const [progress, setProgress] = useState(0)
  const [key, setKey] = useState(0)
  const router = useRouter()
  useEffect(()=>{
    router.events.on('routeChangeStart',()=>{
      setProgress(40)
    })
    router.events.on('routeChangeComplete', ()=>{
      setProgress(100)
    })
    try {
      if(localStorage.getItem("cart")){
        setcart(JSON.parse(localStorage.getItem("cart")))
        saveCart(JSON.parse(localStorage.getItem("cart")))
      }
    } catch (error) {
      console.error(error)
      localStorage.clear();
    }
    const myuser = JSON.parse(localStorage.getItem('myuser'))
    if(myuser){
       setUser({value: myuser.token, email: myuser.email})
    }
    setKey(Math.random())
  },[router.query])

  const logOut=()=>{
    localStorage.removeItem('myuser')
    setUser({value: null})
    setKey(Math.random())
    router.push('/')
  }

  const saveCart=(myCart)=>{
    localStorage.setItem("cart",JSON.stringify(myCart))
    let subt=0;
    let keys = Object.keys(myCart)
    for(let i=0;i<keys.length;i++){
       subt+= myCart[keys[i]].price* myCart[keys[i]].qty;
    }
    setTotal(subt)

  }

  const buYNow=(itemId, qty, price, Name, size, imag, variant)=>{
     saveCart({})
    let newCart={}
     newCart[itemId] = {qty: 1, price, Name, size,imag, variant};
    setcart(newCart)
    saveCart(newCart)
    router.push('/checkout')
  }
  const addtoCart = (itemId, qty, price, Name, size,imag,variant)=>{
    let newCart = cart;
    if(itemId in cart){
      newCart[itemId].qty = cart[itemId].qty + qty;
    }
    else{
      newCart[itemId] = {qty: 1, price, Name, size, imag,variant}
    }
    setcart(newCart)
    saveCart(newCart)
    toast.success('Item Added in your Cart!', {
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
  
  const removeFromCart = (itemId, qty, price, Name, size,imag, variant)=>{
    let newCart = JSON.parse(JSON.stringify(cart));
    if(itemId in cart){
      newCart[itemId].qty = cart[itemId].qty - qty;
    }
    if(newCart[itemId].qty<=0){
      delete newCart[itemId] 
    }
    setcart(newCart)
    saveCart(newCart)
  }
  const clearCart =()=>{
    setcart({})
    saveCart({})
  }
  return <>
  <Head>
  <meta name="viewport" content="width=device-width , initial-scale=1.0 , minimum-scale=1.0"/>
  </Head>
  <LoadingBar
        color='#ff2d55'
        progress={progress}
        waitingTime={500}
        onLoaderFinished={() => setProgress(0)}
      />
  
  {key && <Navbar logOut={logOut} user={user} key={key} cart={cart} addtoCart={addtoCart} removeFromCart={removeFromCart} clearCart={clearCart} total={total}/>}
  <Component buYNow={buYNow} user={user} cart={cart} addtoCart={addtoCart} removeFromCart={removeFromCart} clearCart={clearCart} total={total} {...pageProps} />
  <Footer/>
  </>
}
