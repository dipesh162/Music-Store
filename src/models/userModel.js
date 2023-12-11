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
    billingAddress:{
        country:{
            type: String,
            required: [false, "Please provide country"]
        },
        'street 1':{
            type: String,
            required: [false, "Please provide street 1"]
        },
        'street 2':{
            type: String,
            required: [false, "Please provide street 2"]
        },
        city:{
            type: String,
            required: [false, "Please provide city"]
        },
        state:{
            type: String,
            required: [false, "Please provide state"]
        },
        zipCode:{
            type: Number,
            required: [false, "Please provide zipCode"]
        },
    },
    shippingAddresses:[{
        country:{
            type: String,
            required: [false, "Please provide country"]
        },
        'street 1':{
            type: String,
            required: [false, "Please provide street 1"]
        },
        'street 2':{
            type: String,
            required: [false, "Please provide street 2"]
        },
        city:{
            type: String,
            required: [false, "Please provide city"]
        },
        state:{
            type: String,
            required: [false, "Please provide state"]
        },
        zipCode:{
            type: Number,
            required: [false, "Please provide zipCode"]
        },
    }],
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
    wishlist: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product', // Reference to the Product model
          },
          quantity: {
            type: Number,
            default: 1,
          },
        },
    ],
    cart: [
        {
            productId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Product', // Reference to the Product model
            },
            quantity: {
              type: Number,
              default: 1,
            },
          },        
    ],
    token: {
        type: String,
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
