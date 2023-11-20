import {connect} from '@/dbConfig/dbConfig';
import Product from "@/models/productModel";
import { NextRequest, NextResponse} from 'next/server';

connect()


export async function GET(request: NextRequest){
    try{

        const searchParams = request.nextUrl.searchParams
        const slug = searchParams.get('slug')

        const product =  await Product.findOne({slug:slug})
        if(!product){
            return NextResponse.json({error: "Product does not exist"}, {status: 400})
        }

        return NextResponse.json({
            product : product,
            success:true,
        })

    } catch (err: any){
        return NextResponse.json({error: err.message}, {status: 500})
    }   
}