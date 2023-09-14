const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
        email : {type: String, required:true},
        orderId: {type: String, reqired: true, unique: true},
        products: {type: Object, required:true},
        address: {type: String, required: true},
        name: {type: String, reqired: true},
        city: {type: String, required: true},
        state: {type: String, required: true},
        pincode: {type: String, required: true},
        amount: {type: Number, required: true},
        phone:  {type: Number, required: true},
        status: {type: String, default: 'Pending', required: true},
  }, {timestamps: true});
  mongoose.models = {}
  export default mongoose.model("Order", OrderSchema);