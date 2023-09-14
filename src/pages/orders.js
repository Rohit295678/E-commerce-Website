import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link';

const orders = () => {
  const [order,setOrder] = useState([])
   const router = useRouter();
    useEffect(()=>{
        const fetchorder = async ()=>{
            let res = await fetch("http://localhost:3000/api/myOrders", {
                method: "POST", // or 'PUT'
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({token: JSON.parse(localStorage.getItem('myuser')).token}),
              })
              let a = await res.json()
              setOrder(a.order)
              
        }
                fetchorder()
            
    },[])
  return (
    <div className='min-h-screen'>
      <div className="container">
<div className="relative overflow-x-auto">
<h1 className='font-semibold text-xl p-8 text-center'>My Orders</h1>
{order.length==0 && <h1 className='text-2xl text-center font-bold'>Please make Some order!</h1>}
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        {order.length!=0 && <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    #OrderId
                </th>
                <th scope="col" className="px-6 py-3">
                    Date
                </th>
                <th scope="col" className="px-6 py-3">
                    Amount
                </th>
                <th scope="col" className="px-6 py-3">
                    Details
                </th>
            </tr>
        </thead>}
        <tbody>
            {order.map((item)=>{
                return<tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.orderId}
                </th>
                <td className="px-6 py-4">
                  {item.createdAt.toString().slice(0,10)}
                </td>
                <td className="px-6 py-4">
                    ₹{item.amount}
                </td>
                <td className="px-6 py-4">
                    <Link href={'/order?id='+item.orderId}>Details</Link>
                </td>
            </tr>
            })}
            
        </tbody>
    </table>
</div>

      </div>
      
    </div>
  )
}


export default orders
