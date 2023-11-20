import ProductCard from "../Product/ProductCard";

export default function ProductsByCategory({products}){

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