const { response } = require("express")
const Product = require("../Model/product")
const { User, Admin } = require("../Model/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const pagination = require("../utilies/Utilies")
const Cart = require("../Model/Cart")



const register_admin =  async (request,response) => {
    const{name,business_name,email,phone_number,password} = request.body
    try {
        const alreadyuser = await Admin.findOne({email})
    if(alreadyuser){
        return response.status(404).json({
            message:"please kindly login"
        })
    }
    if(password.length < 8){
        return response.status(404).json({
            message: "Password must have atleast 8 characters"
        })
    }
    const hashedpasswrd = await bcrypt.hash(password,12)
    const new_admin = new Admin ({name,business_name,email,phone_number, password:hashedpasswrd})
    await new_admin.save()
    return response.status(200).json({
        message:"New admin added",
        new_admin
    })
    } catch (error) {
        return response.status(500).json({message:error.message})
    }
    

}

const login_admin = async (request,response)=>{
    const {email,password} = request.body
    try {
        const alreadyadmin = await Admin.findOne({email})
        if(!alreadyadmin){
            return response.status(404).json({message:"Please you arent an Admin"})
        }
       const comparedPswrd = await bcrypt.compare(password,alreadyadmin.password)
       if(!comparedPswrd) {
        return response.status(404).json({
            message:"wrong email or password"
        })
       }

       const accessToken = jwt.sign({alreadyadmin},`${process.env.ACCESS_TOKEN}`,{expiresIn:"7d"})
       return response.status(200).json({
            message:"Welcome",
            accessToken,
            admin : alreadyadmin._id 
       })
    } catch (error) {
        return response.status(500).json({error:error.message})
    }
}


const addproduct = async (request,response)=>{
    const {product,name,quantity,categories} = request.body
    try {
        const new_product = new Product({product,name,quantity,categories})
        await new_product.save()
        return response.status(200).json({
            message:"Product added successfully",
            new_product
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message
        })
    }

}


const register_user = async (request,response)=>{

    try {
        const {name,email,password}= request.body
        const already = await User.findOne({email})
        if(already){
            return response.status(401).json({message:"Kindly please login"})
        }
        if(password.length < 8){
            return response.status(404).json({message:"Password should be atleast 8 character"})
        }
    
        const hashed = await bcrypt.hash(password,12)
    
        const new_user = new User({name,email,password:hashed})
        await new_user.save()
        return response.status(200).json({message:"Welcome User",
            new_user
        })
    
    } catch (error) {
        return response.status(500).json({message:error.message})
    }




}



const login_user = async (request,response)=>{
    const {email,password} = request.body
    const find  = await User.findOne({email})
    if(!find){
        return response.status(404).json({
            message:"User not Found"

        })
    }
    const compard = await bcrypt.compare(password,find.password)
    if(!compard){
        return response.status(404).json({message:"Incorrect password or email"})
    }

    const accessToken = jwt.sign({find},`${process.env.ACCESS_TOKEN}`,{expiresIn:"7d"})
    return response.status(200).json({
        message:"Welcome",
        user:find._id,
        accessToken
    })
}


const allproduct = async (request,response)=>{
    try {
        const allProduct = await Product.find()
        return response.status(200).json({message:"Products",
            allProduct
        })
    } catch (error) {
        return response.status(500).json({message:error.message})
    }
  
}

const search_product = async (request,response)=>{
    const {page,limit,skip} = pagination(request)
    const allproduct = await Product.find().limit(limit).skip(skip).sort("-createdAt")
    return response.status(200).json({
        message:"Success",
        product : allproduct
    })
}


const add_to_cart = async (request,response)=>{
    
    try {
        const {productId,quantity} = request.body
        const userId = request.already._id
        const product = await Product.findById(productId)
        if(!product){
            return response.status(400).json({message:"Product not found"})
        }

        if(quantity <= 0 || quantity > product.quantity){
            return response.status(400).json({
                message:`invalid quantity. Only ${product.quantity} items available`
            })
        }


        let cart = await Cart.findOne({user:already._id})
        if(!cart){
            cart = new Cart({user:userId, product:[]})
        }

        const existingProductIndex = cart.products.findIndex(
            item => item.product.toString() === productId
          );
          if (existingProductIndex > -1) {
            // If the product is already in the cart, update the quantity
            cart.products[existingProductIndex].quantity += quantity;
      
            // Ensure the total quantity does not exceed available stock
            if (cart.products[existingProductIndex].quantity > product.stock) {
              return response.status(400).json({
                error: `Total quantity exceeds available stock. Only ${product.stock} items available.`,
              });
            }
          } else {
            // Add new product with the specified quantity
            cart.products.push({ product: productId, quantity });
          }
      
          // Save the cart
          await cart.save();
          return response.status(200).json({message:"product added to cart",
            cart
          })
    } catch (error) {
        return response.status(500).json({error:error.message})
    }
}




module.exports = {
    addproduct,
    register_admin,
    login_admin,
    register_user,
    login_user,
    allproduct,
    search_product,
    add_to_cart
}