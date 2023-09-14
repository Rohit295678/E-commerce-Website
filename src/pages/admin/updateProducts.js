import React, { useEffect, useState } from 'react'
import { ThemeProvider } from "@mui/material/styles";
import theme from '@/src1/theme/theme'
import FullLayout from '@/src1/layouts/FullLayout'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import mongoose from 'mongoose';
import Product from '../../../models/Product';
import Router, { useRouter } from 'next/router';
import {
    Grid,
    Stack,
    TextField,
    Button,
  } from "@mui/material";
  import BaseCard from '@/src1/components/baseCard/BaseCard';

const UpdateProducts = ({product}) => {
 const [form, setForm] = useState({product,slug:product.slug})
 const router = useRouter()
 
  const handelChange = (e)=>{
     setForm({
        ...form,
        [e.target.name]: e.target.value
     })
  }

  const submitForm = async(e)=>{
    let res = await fetch("http://localhost:3000/api/updateproducts", {
     method: "POST", // or 'PUT'
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(form),
   })

   let response = await res.json()

   if(response.success){
   setForm({form})
   router.push('/admin/updateProducts?id='+product.slug)
   toast.success('Product updated', {
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
        <ThemeProvider theme={theme}>
            <style jsx global>{
            `footer{
               display: none;
            }`
        }</style>
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
          <FullLayout>
          <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <BaseCard title="Update Product">
          <Stack spacing={3}>
            <TextField onChange={handelChange} value={form.title?form.title:" "+product.title} name="title" label="title" variant="outlined"/>
            <TextField onChange={handelChange} value={form.category?form.category:" "+product.category} name="category" label="category" variant="outlined"/>
            <TextField onChange={handelChange} value={form.slug?form.slug:" "+product.slug} name="slug" label="slug" variant="outlined"/>
            <TextField onChange={handelChange} value={form.color?form.color:" "+product.color} name="color" label="color" variant="outlined"/>
            <TextField onChange={handelChange} value={form.size?form.size:" "+product.size} name="size" label="size" variant="outlined"/>
            <TextField onChange={handelChange} value={form.price?form.price:" "+product.price} name="price" label="price" variant="outlined"/>
            <TextField onChange={handelChange} value={form.img? form.img:" "+product.img} name="img" label="image Url" variant="outlined"/>
            <TextField onChange={handelChange} value={form.availableQty? form.availableQty:" "+product.availableQty} name="availableQty" label="Available Quantity" variant="outlined"/>
            <TextField
            value={form.desc? form.desc:" "+product.desc+""}
            onChange={handelChange}
              name="desc"
              label="description"
              multiline
              rows={4}
            />
          </Stack>
          <br />
          <Button onClick={submitForm} className='bg-blue-500 text-white hover:bg-blue-700' mt={2}>
            Update
          </Button>
        </BaseCard>
      </Grid>

    </Grid>
        </FullLayout>
      </ThemeProvider>
      );
}

export async function getServerSideProps(context) {
    if(!mongoose.connections[0].readyState){
      await mongoose.connect(process.env.MONGO_URI)
    }
    let product = await Product.findOne({ slug: context.query.id})
      
    return { props: {product: JSON.parse(JSON.stringify(product))}};
}

export default UpdateProducts