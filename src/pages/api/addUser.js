import User from "../../../models/User";
import connectDb from "../../../middlewear/mongoose";
var CryptoJS = require("crypto-js");

const handler = async (req, res)=>{
 if(req.method == 'POST'){
    const {name,email,phone} = req.body
    let u = new User({name, email,phone, password: CryptoJS.AES.encrypt(req.body.password, 'secret key 123').toString()})
     await u.save()
     res.status(200).json({success: "Success"})
 }
 else{
    res.status(400).json({error: "Error"})
 }
    
}
export default connectDb(handler);
