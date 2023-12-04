import { FC } from "react";
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
    handleRemoveItem?: () => void
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
                    product={{...product, cta:'wishlist'}}
                />
            ))}
        </>
    )
}

export default ProductsByCategory
