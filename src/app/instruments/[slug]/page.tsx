import {FC} from 'react'
import ProductDetails from '../../components/ProductDetails'
import axios from 'axios';

interface pageProps{
    params: {slug: string},
}

const fetchData = async (slug: string) =>{
    try {
        const res = await axios.get("http://localhost:3000/api/product/fetch",{
            params: {
                slug: slug
            }
        });
        return res.data.product
    } catch (error) {
        
    }
}

export interface FormDataType {
    _id: string;
    name: string;
    brand: string;
    category: string;
    subCategory: string;
    description: string;
    price: number;
    ratings: number;
    images: string[]  
}

const SingleInstrumentPage:  FC<pageProps> = async ({params}) =>{

    const {slug} = params
    const product:FormDataType = await fetchData(slug)

    return(
            <ProductDetails
                product={product}
            />
    )
}

export default SingleInstrumentPage