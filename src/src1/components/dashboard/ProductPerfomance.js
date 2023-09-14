import React, { useState } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
} from "@mui/material";
import BaseCard from "../baseCard/BaseCard";
import Link from "next/link";
import TextField from '@mui/material/TextField';


const ProductPerfomance = ({products}) => {
  const [produc,setProduc] = useState("")
  return (
    <BaseCard title="Products">
      <h1 className="text-xl m-2 text-gray-500 ">Search Product By Title</h1>
      <TextField
          id="outlined-password-input"
          label="Title"
          placeholder="Enter Name of user"
          onChange={(e)=> setProduc(e.target.value)}
        />
      <TableContainer className="w-full">
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
                Category
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Title
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Color/Size
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Available Qty
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Price
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography color="textSecondary" variant="h6">
                Update Products
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.filter((product)=>{
            return produc.toLowerCase()===""?product:product.title.toLowerCase().includes(produc.toLowerCase())
          }).map((product) => (
            <TableRow key={product.slug}>
              <TableCell>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  {product.category}
                </Typography>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "600",
                      }}
                    >
                      {product.title}
                    </Typography>
                  </Box>
                  <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: "13px",
                      }}
                    >
                      <img className={'mx-4'} src={product.img} alt={''} height={50} width={50}/>
                    </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  ({product.color}/{product.size})
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  {product.availableQty}
                </Typography>
              </TableCell>
              
              <TableCell>
                <Typography variant="h6">₹{product.price}</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6"><Link href={'/admin/updateProducts?id='+product.slug}>Update</Link></Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
    </BaseCard>
  );
};

export default ProductPerfomance;
