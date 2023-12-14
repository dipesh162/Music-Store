// Next
import { NextRequest, NextResponse } from 'next/server';

// Models
import Product from '@/models/productModel';
import User from '@/models/userModel';

// DB
import { connect } from '@/dbConfig/dbConfig';


connect()

export async function GET(request: NextRequest) {
    try{        
        const searchParams = request.nextUrl.searchParams

        // Iterate over keys and reconstruct the array of objects
        const cart = Array.from(searchParams.entries()).reduce((acc:any, [key, value]) => {
            const match = key.match(/^cart\[(\d+)\]\[(\w+)\]$/);
            if (match) {
                const index = parseInt(match[1], 10);
                const property = match[2];
        
                if (!acc[index]) {
                    acc[index] = {};
                }
        
                acc[index][property] = value;
            }
          return acc;
        }, []);


        // Function to fetch products based on cart product IDs
        const productIds = cart.map((cart:any)=> cart.productId)
        const cartProducts = await Product.find({ _id: { $in: productIds } });

        const finalCart = cartProducts.map((product:any,i:number)=>{
            let cartProduct:any = cart.find((cartProd:any)=> cartProd.productId == product._id)

            return {...{
                ...product._doc,
                productCartQuantity: +cartProduct.quantity
            }}
        })

        return NextResponse.json({
            success:true,
            products: finalCart
        })

    } catch (err: any){
        return NextResponse.json({
            success:false,
            message: err.message
        }, {status: 500})
    } 
}

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { products } = reqBody

        const token = request.headers.get('token')
        const user = await User.findOne({ token })
        const userId = user._id

        let updatedUsers
        if (products.length > 0) {
            const updateOperations:[] = products.map(async (prod: any) => {
                // Check if the product is already in the cart
                const user = await User.findOne({ _id: userId, 'cart.productId': prod.productId });

                if (!user) {
                    // Product is not in the cart, add it for the first time
                    return User.findByIdAndUpdate(
                        userId,
                        {
                            $push: {
                                cart: {
                                    productId: prod.productId,
                                    quantity: prod.quantity,
                                },
                            },
                        },
                        { new: true }
                    );
                } else {
                    // Product is already in the cart, update the quantity
                    return User.findOneAndUpdate(
                        { _id: userId, 'cart.productId': prod.productId },
                        {
                            $inc: {
                                'cart.$.quantity': 1,
                            },
                        },
                        { new: true }
                    );
                }
            });

            // Wait for all of the above update operations to complete
            const updatedResults: { cart?: any }[] = await Promise.all(updateOperations)
            updatedUsers = updatedResults[0].cart
        } else {
            const user = await User.findOne({ _id: userId });
            updatedUsers = user.cart
        }

        return NextResponse.json({
            success: true,
            message: 'Products added to cart',
            cart: updatedUsers
        },{status:201})

    } catch (error) {
        return NextResponse.json({
            success:false,
            message: "error saving user's cart from local cart"
        }, {status: 500})
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { productId, quantity } = reqBody

        const token = request.headers.get('token')
        const user = await User.findOne({ token })
        const userId = user._id

        User.findOneAndUpdate(
            { _id: userId, 'cart.productId': productId },
            {
                $inc: {
                    'cart.$.quantity': quantity,
                },
            },
            { new: true }
        );

        return NextResponse.json({
            success: true,
            message: 'Cart successfully updated',
        })

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "error updating user's cart"
        })
    }
}