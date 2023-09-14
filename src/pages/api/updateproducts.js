import Product from "../../../models/Product";
import connectDb from "../../../middlewear/mongoose";

const handler = async (req, res)=>{
    if(req.method == "POST"){
        let p = await Product.findOneAndUpdate({slug: req.body.slug},{
        title: req.body.title,
        desc: req.body.desc,
        img: req.body.img,
        category: req.body.category,
        size: req.body.size,
        color: req.body.color,
        price: req.body.price,
        availableQty: req.body.availableQty,
        })
    res.status(200).json({success: "Success",product: p})
    }
    else{
        res.status(400).json({error: "This Method is not allowed"})
    }
}
export default connectDb(handler);