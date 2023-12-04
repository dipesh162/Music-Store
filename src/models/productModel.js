import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
        name: {
                type: String,
                required: [true, 'Please provide product name']
        },
        brand: {
                type: String,
                required: [true, 'Please provide product brand']
        },
        category: {
                type: String, 
                required: [true, 'Please provide product category']
        },
        subCategory: {
                type: String, 
                required: [true, 'Please provide product subCategory']
        },
        quantity: {
                type: Number,
                required: [true, 'Please provide product quantity']
        },
        slug: {
                type: String,
                required: [true, 'Please provide product slug']
        },
        description: {
                type: String,
                required: [true, 'Please provide product description']
        },
        price: {
                type: Number, 
                required: [true, 'Please provide product price']
        },
        images: {
                type: Array,
                required: [true, 'Please provide product images']
        },
        ratings: {
                type: Number, 
                required: [true, 'Please provide product ratings']
        },
})

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
