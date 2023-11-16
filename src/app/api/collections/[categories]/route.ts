import {connect} from '@/dbConfig/dbConfig';
import Product from "@/models/productModel";
import { NextRequest, NextResponse} from 'next/server';

connect()


export async function GET(request: NextRequest,{params}:any){
    try{
        const {categories} = params

        const productsByCategories =  await Product.find({category:categories})

        if(!productsByCategories){
            return NextResponse.json({error: "Product does not exist"}, {status: 400})
        }

        return NextResponse.json({
            products : productsByCategories,
            success:true,
        })

    } catch (err: any){
        return NextResponse.json({error: err.message}, {status: 500})
    }   
}