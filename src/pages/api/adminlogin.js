import connectDb from "../../../middlewear/mongoose";

const handler = async (req, res)=>{
    if(req.method == 'POST'){
        if(req.body.password==='secret1009'){
           res.status(200).json({success: 'success'})
        }
        else{
            res.status(200).json({success: false, error: 'Invalid Password'})
        }
    }
    else{
        res.status(400).json({error: "Error"})
    }
}
export default connectDb(handler);