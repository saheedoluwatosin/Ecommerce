const mongoose =require("mongoose")

const product = mongoose.Schema({
    product:{type:String, required:true},
    name:{type:String , required : true},
    quantity:{type:Number, required:true},
    categories:{type:String , enum : ["Male","Female"], required:true}
},
{
    timestamps: true
})

const Product = mongoose.model("product",product)

module.exports = Product