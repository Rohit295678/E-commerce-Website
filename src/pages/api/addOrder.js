import Order from "../../../models/Orders";
import Product from "../../../models/Product";
import connectDb from "../../../middlewear/mongoose";


const handler = async (req, res)=>{
 if(req.method == 'POST'){
     let order = new Order({
     email: req.body.email,
     orderId: req.body.orderId,
     address: req.body.address,
     city: req.body.city,
     state: req.body.state,
     name: req.body.name,
     pincode: req.body.pin,
     amount: req.body.total,
     phone: req.body.phone,
     products: req.body.cart,
 })
  let products = order.products
  for(let slug in products){
  await Product.findOneAndUpdate({slug: slug},{$inc:{"availableQty":-products[slug].qty}})
  }
  await order.save();
  res.status(200).json({success: "Success"})
 }
 else{
    res.status(400).json({error: 'error'})
 }
 
    
}
export default connectDb(handler);
