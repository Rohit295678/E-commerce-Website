import Product from "../../../models/Product";
import connectDb from "../../../middlewear/mongoose";

const handler = async (req, res)=>{
    if(req.method == "POST"){
        let p
      p = new Product({
        title: req.body.title,
        slug: req.body.slug,
        desc: req.body.desc,
        img: req.body.img,
        category: req.body.category,
        size: req.body.size,
        color: req.body.color,
        price: req.body.price,
        availableQty: req.body.availableQty,
     })
     await p.save()
    res.status(200).json({success: "Success"})
    }
    else{
        res.status(400).json({error: "This Method is not allowed"})
    }
    // let p = new Product({
    //     title: "More & More",
    //     slug: "wear-the-hoodies3.14",
    //     desc: "Preminium Hoodies on coding",
    //     img: "https://m.media-amazon.com/images/I/61rOj+VWFkL._SX679._SX._UX._SY._UY_.jpg",
    //     category: "Hoodies",
    //     size:  "M",
    //     color:  "Yellow",
    //     price:  719,
    //     availableQty: 19
    //  })
    //  await p.save()
    //  res.status(200).json(p)
    
}
export default connectDb(handler);