import React, { useState } from 'react'
import { ThemeProvider } from "@mui/material/styles";
import theme from '@/src1/theme/theme'
import FullLayout from '@/src1/layouts/FullLayout'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import {
    Grid,
    Stack,
    TextField,
    Checkbox,
    FormGroup,
    FormControlLabel,
    RadioGroup,
    Radio,
    FormLabel,
    FormControl,
    Button,
  } from "@mui/material";
  import BaseCard from '@/src1/components/baseCard/BaseCard';

const AddProducts = () => {
 const [form, setForm] = useState({})
  const handelChange = (e)=>{
     setForm({
        ...form,
        [e.target.name]: e.target.value
     })
  }

  const submitForm = async(e)=>{
    e.preventDefault()
    let res = await fetch("http://localhost:3000/api/addproducts", {
     method: "POST", // or 'PUT'
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(form),
   })

   let response = await res.json()
   if(response.success){
   setForm({})
   toast.success('Product added', {
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
        <BaseCard title="Add Product">
          <Stack spacing={3}>
            <TextField onChange={handelChange} value={form.title?form.title:""} name="title" label="title" variant="outlined"/>
            <TextField onChange={handelChange} value={form.category?form.category:""} name="category" label="category" variant="outlined"/>
            <TextField onChange={handelChange} value={form.slug?form.slug:""} name="slug" label="slug" variant="outlined"/>
            <TextField onChange={handelChange} value={form.color?form.color:""} name="color" label="color" variant="outlined"/>
            <TextField onChange={handelChange} value={form.size?form.size:""} name="size" label="size" variant="outlined"/>
            <TextField onChange={handelChange} value={form.price?form.price:""} name="price" label="price" variant="outlined"/>
            <TextField onChange={handelChange} value={form.img? form.img:""} name="img" label="image Url" variant="outlined"/>
            <TextField onChange={handelChange} value={form.availableQty? form.availableQty:""} name="availableQty" label="Available Quantity" variant="outlined"/>
            <TextField
            value={form.desc? form.desc:""}
            onChange={handelChange}
              name="desc"
              label="description"
              multiline
              rows={4}
            />
          </Stack>
          <br />
          <Button onClick={submitForm} className='bg-blue-500 text-white hover:bg-blue-700' mt={2}>
            Submit
          </Button>
        </BaseCard>
      </Grid>

    </Grid>
        </FullLayout>
      </ThemeProvider>
      );
}

export default AddProducts
