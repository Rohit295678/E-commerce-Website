import React from 'react'
import Order from '../../models/Orders'
import mongoose from 'mongoose'

const MyOrder = ({order}) => {
  const product = order.products
  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
  <div className="container px-5 py-24 mx-auto">
    <div className="lg:w-4/5 mx-auto flex flex-wrap">
      <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
        <h2 className="text-sm title-font text-gray-500 tracking-widest">CodesWear</h2>
        <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">Order Id #{order.orderId}</h1>
        <p className="leading-relaxed mb-4">Your Order has been placed Successfully!</p>
        <div className="flex mb-4">
          <a className="flex-grow text-pink-500 border-b-2 py-2 text-lg px-1">Item Description</a>
          <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">Quantity</a>
          <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">Item Total</a>
        </div>
        {Object.keys(product).map((key)=>{
           return<div key={key} className="flex border-t border-gray-200 py-2">
            <div className="flex flex-col w-1/3 items-center"><img src={product[key].imag} alt='image' height={100} width={80}/>
           <span className="text-gray-500 mx-2">{product[key].Name}</span>
           <span className="text-gray-500 mx-2">({product[key].size})/({product[key].variant})</span></div>
           <span className="ml-28 my-auto text-gray-900">{product[key].qty}</span>
           <span className="ml-auto my-auto text-gray-900">₹{product[key].price}</span>
         </div>
        })}
        
        <div className="flex my-4">
          <span className="title-font font-medium text-2xl text-gray-900">Subtotal: ₹{order.amount}</span>
        </div>
        <button className="flex my-6 text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">Track Order</button>
      </div>
      <img alt="ecommerce" className="lg:w-1/2 w-full lg:my-auto lg:h-2/3 h-64 object-cover object-center rounded" src="/My_Order.png"/>
    </div>
  </div>
</section>
    </div>
  )
}

export async function getServerSideProps(context) {
  if(!mongoose.connections[0].readyState){
    await mongoose.connect(process.env.MONGO_URI)
  }
  let order = await Order.findOne({orderId: context.query.id})
  
  
  return { props: {order: JSON.parse(JSON.stringify(order))}};
}

export default MyOrder
