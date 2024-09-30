const Product = require("../Model/product")
const { User, Admin } = require("../Model/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")



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


module.exports = {
    addproduct,
    register_admin,
    login_admin
}