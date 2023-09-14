import User from "../../../models/User";
import connectDb from "../../../middlewear/mongoose";
import jwt from "jsonwebtoken";
var CryptoJS = require("crypto-js");

const handler = async (req, res)=>{
    if(req.method=='POST'){
        let token = req.body.token
        let user = jwt.verify(token, 'sosecret')
        let nuser = await User.find({email: user.email})
        const bytes  = CryptoJS.AES.decrypt(nuser[0].password, 'secret key 123');
        let newPass = bytes.toString(CryptoJS.enc.Utf8);
        if(newPass===req.body.password){
        let dbuser = await User.findOneAndUpdate({email: user.email},{password: CryptoJS.AES.encrypt(req.body.cpassword, 'secret key 123').toString()})
      res.status(200).json({success: true})
        }
        else{
            res.status(200).json({error: true})
        }
    }
    else{
    res.status(400).json({error: error})
    }
}
export default connectDb(handler);