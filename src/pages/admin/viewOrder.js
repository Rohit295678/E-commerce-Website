import React from 'react'
import { ThemeProvider } from "@mui/material/styles";
import theme from '@/src1/theme/theme'
import FullLayout from '@/src1/layouts/FullLayout'
import { Grid } from '@mui/material';
import OrderPerformance from '@/src1/components/dashboard/OrderPerformance';
import Order from '../../../models/Orders';
import mongoose from 'mongoose';

const ViewOrder = ({order}) => {
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
        <OrderPerformance orders={order} />
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
    let order = await Order.find()

    
   

    return { props: {order: JSON.parse(JSON.stringify(order))}};
}

export default ViewOrder
