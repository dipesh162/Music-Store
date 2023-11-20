import { FC } from "react";
import ProductCard from "../Product/ProductCard";

interface FormDataType {
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
    products: [FormDataType]
}

const ProductsByCategory: FC<pageProps> = ({products}) =>{

    return(
        <>
            {products.map((product:any,i:number)=>(
                <ProductCard
                    key={i}
                    product={product}
                />
            ))}
        </>
    )
}

export default ProductsByCategory
