import React from 'react'
import { ThemeProvider } from "@mui/material/styles";
import theme from '@/src1/theme/theme'
import FullLayout from '@/src1/layouts/FullLayout'
import UserPerformance from '@/src1/components/dashboard/UserPerformance';
import User from '../../../models/User';
import mongoose from 'mongoose';
import { Grid } from '@mui/material';

const Ouruser = ({user}) => {
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
        <UserPerformance users={user} />
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
  let user = await User.find()
  return { props: {user: JSON.parse(JSON.stringify(user))}};
}

export default Ouruser
