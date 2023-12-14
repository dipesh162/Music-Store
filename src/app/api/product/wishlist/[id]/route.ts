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
            return NextResponse.json({
                message: "User not found"
            }, {status: 404})
        }

        const {id : productId} = params

        await User.findByIdAndUpdate(user._id, {
            $pull: {
              wishlist: { product: productId }
            }
          }, { new: true })

        return NextResponse.json({
            success:true,
            message: 'Product successfully removed from wishlist'
        })

    } catch (err: any){
        return NextResponse.json({
            success: false,
            message: err.message
        }, {status: 500})
    } 
}