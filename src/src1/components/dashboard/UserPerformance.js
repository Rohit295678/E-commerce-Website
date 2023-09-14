import React, { useState } from "react";
import Link from "next/link";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer
} from "@mui/material";
import TextField from '@mui/material/TextField';
import BaseCard from "../baseCard/BaseCard";

const UserPerformance = ({users}) => {
  const [use,setUse] = useState('')
  return (
    <BaseCard title="Users">
      <h1 className="text-xl m-2 text-gray-500 ">Search User By Name</h1>
      <TextField
          id="outlined-password-input"
          label="Name"
          placeholder="Enter Name of user"
          onChange={(e)=> setUse(e.target.value)}
        />
    <TableContainer className=" w-full">
      <Table 
        aria-label="simple table"
        sx={{
          
          mt: 3,
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Name
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Email
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                City/State
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Phone no
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography color="textSecondary" variant="h6">
                Orders
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.filter((user)=>{
            return use.toLowerCase()===""?user:user.name.toLowerCase().includes(use.toLowerCase())
          }).map((user) => (
            <TableRow key={user.email}>
              <TableCell>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  {user.name}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  {user.email}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  (Patna/Bihar)
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  {user.phone}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6"><Link href={'/admin/getuser?id='+user.email}>Orders</Link></Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
      </BaseCard>
  )
}


export default UserPerformance
