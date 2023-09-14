import { Grid } from "@mui/material";
import BlogCard from "@/src1/components/dashboard/BlogCard";
import SalesOverview from "@/src1/components/dashboard/SalesOverview";
import DailyActivity from "@/src1/components/dashboard/DailyActivity";
import ProductPerformance from "@/src1/components/dashboard/ProductPerformance";
import { ThemeProvider } from "@mui/material/styles";
import theme from '@/src1/theme/theme'
import FullLayout from '@/src1/layouts/FullLayout'
import Product from "../../../models/Product";
import Order from "../../../models/Orders";
import mongoose from "mongoose";

export default function Index({product,order}) {
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
        <SalesOverview product={product} order={order} />
      </Grid>
      {/* ------------------------- row 1 ------------------------- */}
      <Grid item xs={12} lg={4}>
        <DailyActivity />
      </Grid>
      <Grid item xs={12} lg={8}>
         <ProductPerformance />
      </Grid>
      <Grid item xs={12} lg={12}>
        <BlogCard />
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
  let order = await Order.find()
  let orders = {}
  let products = {}

  for(let item of product){
    if(Object.keys(products).includes(item.createdAt.toString().slice(4,7))){
      products[item.createdAt.toString().slice(4,7)][0]+=item.availableQty
    }
    else{
      products[item.createdAt.toString().slice(4,7)]=[]
      products[item.createdAt.toString().slice(4,7)].push(item.availableQty)
    }
  }

    for(let item of order){
      if(Object.keys(orders).includes(item.createdAt.toString().slice(4,7))){
        for(let x of Object.values(item.products)){
          orders[item.createdAt.toString().slice(4,7)][0]+=x.qty
         } 
      }
      else{
       orders[item.createdAt.toString().slice(4,7)]=[0]
       for(let x of Object.values(item.products)){
        orders[item.createdAt.toString().slice(4,7)][0]+=x.qty
       } 
      }
    }

  return { props: {product: JSON.parse(JSON.stringify(products)), order: JSON.parse(JSON.stringify(orders))}};
}

