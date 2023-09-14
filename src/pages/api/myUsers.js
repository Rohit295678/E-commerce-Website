import Order from "../../../models/Orders";
import connectDb from "../../../middlewear/mongoose";

const handler = async (req, res)=>{
    let order = await Order.find({email: req.body.email})
    res.status(200).json({order})
  }


export default connectDb(handler);