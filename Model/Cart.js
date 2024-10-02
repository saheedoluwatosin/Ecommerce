const mongoose  = require("mongoose")

const cart = mongoose.Schema({
    products :[{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
},
{
    timestamps:true
})

const Cart = mongoose.model("Cart",cart)


module.exports = Cart

