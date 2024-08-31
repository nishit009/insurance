import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { Schema } from "mongoose";
const userSchema=new Schema({
    email:
    {
        type:String,
        required:true,
        unique:true,
        trim:true,
        index:true,
        lowecase:true
    },
    password:{
        type:String,
        required:[true,'password is required']
    }
},{
    timestamps:true
});
userSchema.pre("save",async function (next) {
    if(!this.isModified("password")) return next();

    this.password=bcrypt.hash(this.password,10);
    next();
})
userSchema.methods.isPasswordCorrect=async function(password) {
    return await bcrypt.compare(password,this.password);
}



export const User=mongoose.model("User",userSchema);