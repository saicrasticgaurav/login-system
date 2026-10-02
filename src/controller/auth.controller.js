import User from "../models/user.model.js";
import jwt, { decode } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import config from "../config/config.js";

// export const registerUser= async (req,res)=>{
//     try{
//         const{name,email,password}=req.body;
//         if(!name ||!email ||!password){
//          return res.status(400).json({
//             message:"please fill all fields",
//          });
//         }
//         if(password.length < 6){
//             return res.status(400).json({
//                 message:"Password must be at least 6 Characters"
//             });
//         }
//          const normalizedEmail = email.trim().toLowerCase();
//         const existingUser=await User.findOne({
//             email: normalizedEmail,
//         })
//         if(existingUser){
//             return res.status(409).json({
//                 message:"Email already registered",
//             })
//         }
//         const hashedPassword = await bcrypt.hash(password,10)
//         const user = await User.create({
//           name: name.trim(),
//           email: normalizedEmail,
//           password: hashedPassword
//         });
//         return res.status(201).json({
//             message:"user register successfully",
//             user:{
//                 id:user._id,
//                 name:user.name,
//                 email:user.email
//             },

//         });
//     }catch(error){
//         console.error("Registraction error:",error);
//          if (error.code === 11000) {
//       return res.status(409).json({
//         message: "Email already registered",
//       });
//     }
//         return res.status(500).json({
//             message:"Internal server error",
//         });
//     }
    
// }
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please provide name, email, and password",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const isUserAlreadyExist = await User.findOne({ email: normalizedEmail });

    if (isUserAlreadyExist) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashpassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashpassword,
    });

    console.log("✅ User created successfully!");
    console.log("User ID:", user._id.toString());
    console.log("Name:", user.name);
    console.log("Email:", user.email);

    const token = jwt.sign({ id: user._id }, config.JWT_SECRET, { expiresIn: "1d" });
    res.cookie("token", token);

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error("Registration error:", error);
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Email already registered",
      });
    }
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getme=async (req,res)=>{
    try{
         const token=res.headers.authorization?.split("")[1];
    if(!token){
        return res.status(401).json({
            Message:"Token required"
        });
    }
    const decoded=jwt.verify(token,config.JWT_SECRET);
    const user=await user.findById(decoded.id)
    if(!user){
         return res.status(404).json({
            Message:"User not found"
        });
    }
    res.status(200).json({
        message:"User fetched succssefully",
        user:{
            name:user.name,
            email:user.email
        }
    })
    }
    catch(error){
        res.status(401).json({
            Message:"Invalid or expire token"
        })
    }

    
}