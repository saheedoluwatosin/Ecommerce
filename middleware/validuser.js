

const jwt = require("jsonwebtoken")
const { User } = require("../Model/user")




const validateuser =async (request,response,next)=>{

try {
    const token  = request.header("Authorization")
    console.log(token)
    if(!token){
        return response.status(404).json("Access Denied")
    }
    const token1 = token.split(" ")
    const token2 = token1[1]
    const decoded = jwt.verify(token2,process.env.ACCESS_TOKEN)
    console.log(decoded)
    
    const already =await User.findOne({_id:decoded.find._id})
    console.log(already)
    if(!decoded){
        return response.status(404).json({
            message:"Invalid login"
        })
    }

    request.user = already 

    next()
} catch (error) {
    return response.status(500).json({error:error.message})
}


 
}


module.exports = validateuser

