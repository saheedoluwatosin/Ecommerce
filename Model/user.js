



const mongoose =  require("mongoose")

//admin
const admin = mongoose.Schema({
    name:{type:String , required:true},
    business_name : {type:String , required : true},
    email:{type:String , required : true},
    phone_number :{type:Number , required : true},
    password:{type:String , required : true}
})

const Admin = mongoose.model("admin", admin)

//user
const user = mongoose.Schema({
    name:{type: String, required : true},
    email:{type: String , required: true},
    password:{type:String, required : true}

})

const User = mongoose.model("user",user)

module.exports = {
    Admin,
    User
}