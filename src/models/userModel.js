import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: [true, "Please provide your first name"]
    },
    lastName:{
        type: String,
        required: [true, "Please provide your last name"]
    },
    email:{
        type: String,
        required: [true, "Please provide a email"],
        unique: true
    },
    password:{
        type: String,
        required: [true, "Please provide a password"]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;


// Fix login/singup page - design + validation
// ADd first name , last name field ion user model
// handle navbar for logged=in/logout user
