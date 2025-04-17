import mongoose from "mongoose";
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
  
   
    email:{
        type:String,
        required:true,
        unique:true
    },
  
    otp:{
type:String
    },
    otpexpires:{
        type:Date,
        default:Date.now
            },
     password:{
        type:String,
    
    },
    isAdmin: { type: Boolean, default: false },


})
userSchema.virtual('id').get(function (){
    return this._id.toHexString();
});
userSchema.set("toJSON",{
    virtuals:true
})
const User=mongoose.model("User",userSchema)
export default User;