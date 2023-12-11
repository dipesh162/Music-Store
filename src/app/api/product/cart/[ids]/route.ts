// Next
import { NextRequest, NextResponse} from 'next/server';

// Models
import User from '@/models/userModel';

// DB
import {connect} from '@/dbConfig/dbConfig';

connect()

export async function DELETE(request: NextRequest,{params}: any) {
    try{

        const token = request.headers.get('token')
        const user = await User.findOne({token})
        if(!user){
            return NextResponse.json({error: "User not found"}, {status: 404})
        }
        const userId = user._id

        const {ids} = params
        const productIds = ids.split(',')

        await User.updateOne(
            { _id: userId },
            { $pull: { cart: { productId: { $in: productIds } } } },

        );

        return NextResponse.json({
            success:true,
            message: 'Products successfully removed from cart'
        })

    } catch (err: any){
        return NextResponse.json({
            success: false,
            error: err.message}, {status: 500})
    } 
}