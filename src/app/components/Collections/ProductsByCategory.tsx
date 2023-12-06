// React
import { FC } from "react";

// Components
import ProductCard from "../Product/ProductCard";

interface Product {
    _id: string;
    name: string;
    brand: string;
    slug: string;
    category: string;
    subCategory: string;
    description: string;
    price: number;
    ratings: number;
    images: string[];
}

interface pageProps{
    products: [Product]
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
