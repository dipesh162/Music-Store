import {connect} from '@/dbConfig/dbConfig';
import Product from "@/models/productModel";
import { NextRequest, NextResponse} from 'next/server';

connect()


export async function GET(request: NextRequest,params:any){
    try{

        const {['sub-category']: subCategory, categories} = params.params

        const productsByCategories =  await Product.find({subCategory: subCategory})
        if(!productsByCategories){
            return NextResponse.json({error: "Product does not exist"}, {status: 400})
        }

        const productsBySubCategories = productsByCategories
        if(!productsBySubCategories){
            return NextResponse.json({error: "Product does not exist"}, {status: 400})
        }

        return NextResponse.json({
            products : productsBySubCategories,
            success:true,
        })

    } catch (err: any){
        return NextResponse.json({error: err.message}, {status: 500})
    }   
}