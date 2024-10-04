const mongoose  = require("mongoose")

const cart = mongoose.Schema({
    products :[{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    Quantity:{type:Number , required: true}
},
{
    timestamps:true
})

const Cart = mongoose.model("Cart",cart)


module.exports = Cart

