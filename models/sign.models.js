import { Schema } from "mongoose";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
const signSchema= new Schema({
    firstname:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        index:true
    },
    lastname:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        index:true
    },
    mobileno: {
        type: String,
        required: [true, 'Phone number is required'],
        unique: true,
        match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number'], 
        trim: true
      },
    email:{
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

signSchema.pre("save",async function (next) {
    if(!this.isModified("password")) return next();

    this.password=bcrypt.hash(this.password,10);
    next();
})
signSchema.methods.isPasswordCorrect=async function(password) {
    return await bcrypt.compare(password,this.password);
}

export const Sign = mongoose.model("Sign",signSchema);