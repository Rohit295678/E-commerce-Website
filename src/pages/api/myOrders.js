import Order from "../../../models/Orders";
import connectDb from "../../../middlewear/mongoose";
import jwt from "jsonwebtoken";

const handler = async (req, res)=>{
    const token = req.body.token
    const data = jwt.verify(token,'sosecret')
    let order = await Order.find({email: data.email})
    res.status(200).json({order})
  }


export default connectDb(handler);