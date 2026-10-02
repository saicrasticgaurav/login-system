import mongoose from "mongoose";
const userschema=new mongoose.Schema(
    {
      name:{
        type:String,
        require:true,
        trim:true
      },

        email:{
        type:String,
        require:true,
        trim:true,
        unique:true,
        lowercase:true
        },

       password:{
        type:String,
        require:true,
        minlength:6
       },

    },
    {
        timestamps:true,
    }

);
const User=mongoose.model("user",userschema);
export default User;