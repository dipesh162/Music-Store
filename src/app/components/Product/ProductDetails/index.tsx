import ProductImages from './ProductImages'
import ProductInfo from './ProductInfo'
import { FC } from 'react';

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

interface pageProps{
    product:FormDataType
}

const ProductDetails: FC<pageProps> = async ({product }) => {

    return(
        <div className="container px-5 py-4 flex flex-col md:flex-row justify-center items-center md:items-start gap-2 max-w-[1110px] mx-auto">
            <ProductImages
                product={product}
            />
            <ProductInfo
                product={product}
            />
        </div>
    )
}

export default ProductDetails