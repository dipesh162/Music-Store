import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse} from 'next/server';

connect()

export async function GET(request: NextRequest,{params}: any) {

    let searchParams = request.nextUrl.searchParams
    
    let productId = searchParams.get('productId')
    let userEmail = searchParams.get('userEmail')

    const user = await User.findOne({email: userEmail})
    if(!user){
        return NextResponse.json({
            success: false,
            status: 404,
            message: 'User not found'
        })
    }

    const isWishListed = user.wishlist.length>0 ? (user.wishlist.some((wishlist:any)=> wishlist.product == productId ? true: false)) : false

    return NextResponse.json({
        isWishListed,
    })

}
