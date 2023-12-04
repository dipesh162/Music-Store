import {connect} from '@/dbConfig/dbConfig';
import Product from "@/models/productModel";
import { NextRequest, NextResponse} from 'next/server';

connect()


export async function POST(request: NextRequest){
    try{
        const reqBody = await request.json()
        const {name, brand, category, subCategory, description, price, quantity, ratings, images} = reqBody
 
        let slug = name.replace(/[()]/g,'').trim().split(' ').join('-')
        const newProduct = new Product({
            name, brand, category, subCategory, description, price, quantity, ratings, images,slug
        })
        
        const savedProduct = await newProduct.save()

        return NextResponse.json({
            message: "Product Added successfully",
            success: true,
            product : savedProduct
        })

    } catch (err: any){
        return NextResponse.json({error: err.message}, {status: 500})
    }
}