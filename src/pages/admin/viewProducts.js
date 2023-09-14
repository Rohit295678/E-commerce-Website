import React from 'react'
import { ThemeProvider } from "@mui/material/styles";
import theme from '@/src1/theme/theme'
import FullLayout from '@/src1/layouts/FullLayout'
import { Grid } from '@mui/material';
import ProductPerfomance from '@/src1/components/dashboard/ProductPerfomance';
import mongoose from 'mongoose';
import Product from '../../../models/Product';


const ViewProducts = ({product}) => {
    return (
        <ThemeProvider theme={theme}>
            <style jsx global>{
            `footer{
               display: none;
            }`
        }</style>
          <FullLayout>
          <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <ProductPerfomance products={product} />
      </Grid>
    </Grid>
        </FullLayout>
      </ThemeProvider>
      );
}

export async function getServerSideProps() {
    if(!mongoose.connections[0].readyState){
      await mongoose.connect(process.env.MONGO_URI)
    }
    let product = await Product.find()

    return { props: {product: JSON.parse(JSON.stringify(product))}};
}

export default ViewProducts
