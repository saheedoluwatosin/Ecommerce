const { Admin } = require("../Model/user")

const validtokenadmin = async (request,response,next)=>
{

    try {
        const token = request.header("Authorization")
        if(!token){
           return response.status(404).json({
               message:"Access Denied"
           })
        }
        const tkk = token.split(" ")
        const token1 = tkk[1]
   
        const decoded = jwt.verify(token1,process.env.ACCESS_TOKEN)
        const admin = await Admin.findOne({_id:decoded.alreadyadmin._id})
   
        if(!decoded){
           return response.status(401).json({
               message:"Invalid Login"
           })
        }
        request.admin = admin 
        next()
    } catch (error) {
        
    }
    
}



module.exports = validtokenadmin