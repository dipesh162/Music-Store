import ProductsByCategory from "@/app/components/Collections/ProductsByCategory";
import axios from "axios";

const fetchData = async (categories:string) =>{
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN}/api/collections/${categories}`);
        return res.data.products
    } catch (error) {
        
    }
}

export default async function CategoryCollections({params}:any){

    const {categories} = params
    console.log(categories)
    const products = await fetchData(categories)

    return(
        <>
            <ProductsByCategory
                products={products}
            />
        </>
    )
}
