import User from "../../../models/User";
import connectDb from "../../../middlewear/mongoose";
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

const handler = async (req, res)=>{
 if(req.method == 'POST'){
    let user = await User.findOne({"email": req.body.email})
    const bytes  = CryptoJS.AES.decrypt(user.password, 'secret key 123');
    let newPass = bytes.toString(CryptoJS.enc.Utf8);
     if(user){
        if(req.body.email == user.email && req.body.password == newPass){
            var token = jwt.sign({email: user.email, name: user.name}, 'sosecret',
            {expiresIn: "2d"});
            res.status(200).json({success: true, token,email:user.email})
        }
        else{
        res.status(200).json({success: false, error: 'Invalid crediantial'})
        }
     }
     else{
        res.status(200).json({success: false, error: 'User not found'})
     }
 }
 else{
    res.status(400).json({error: "Error"})
 }
    
}
export default connectDb(handler);