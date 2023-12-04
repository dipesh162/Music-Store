import {connect} from '@/dbConfig/dbConfig';
import Product from "@/models/productModel";
import User from '@/models/userModel';
import { NextRequest, NextResponse} from 'next/server';

connect()


export async function GET(request: NextRequest) {
    try{
        const token = request.headers.get('token')
        const user = await User.findOne({token}).populate('wishlist.product')
        if(!user){
            return NextResponse.json({error: "User not found"}, {status: 404})
        }

        // Function to fetch products based on wishlisted product IDs
        let products = await Promise.all(
            user.wishlist.map(async (wishlist:any,i:number)=>{
            const product = await Product.findOne({_id:wishlist.product})
            return {
                product,
                quantity: wishlist.quantity
            }
        }))

        return NextResponse.json({
            success:true,
            products
        })

    } catch (err: any){
        return NextResponse.json({error: err.message}, {status: 500})
    } 
}

export async function POST(request: NextRequest){
    try{
        const token = request.headers.get('token')
        const user = await User.findOne({token})
        if(!user){
            return NextResponse.json({error: "User not found"}, {status: 404})
        }

        const userId = user._id

        const reqBody = await request.json()
        const {productId} = reqBody

        // Check if the product is already in the wishlist
            User.findOne({ _id: userId, 'wishlist.product': productId })
            .then(user => {
            if (!user) {
                // Product is not in the wishlist, add it for the first time
                return User.findByIdAndUpdate(
                userId,
                {
                    $push: {
                        wishlist: {
                            product: productId,
                            quantity: 1,
                        },
                    },
                },
                { new: true }
                );
            } else {
                // Product is already in the wishlist, update the quantity
                return User.findOneAndUpdate(
                { _id: userId, 'wishlist.product': productId },
                {
                    $inc: {
                      'wishlist.$.quantity': 1,
                    },
                },
                { new: true }
                );
            }
            })

        return NextResponse.json({
            success:true,
            message: 'Product added to wishlist'
        })

    } catch (err: any){
        return NextResponse.json({error: err.message}, {status: 500})
    }   
}
