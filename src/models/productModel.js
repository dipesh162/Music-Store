import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
        name: String,
        brand: String,
        category: String, 
        subCategory: String, 
        slug: String,
        isAvailable: Boolean,
        description: String,
        price: Number, 
        images: Array,
        ratings: Number, 
})

const Product = mongoose.models.products || mongoose.model("products", productSchema);

export default Product;
