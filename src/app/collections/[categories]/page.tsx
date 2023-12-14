// React
import axios from "axios";

// Components
import ProductsByCategory from "@/app/components/Collections/ProductsByCategory";

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
        <div className="px-2 md:px-4 py-5">
            <ProductsByCategory
                products={products}
            />
        </div>
    )
}
