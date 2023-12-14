// React
import axios from "axios";

// Components
import ProductsByCategory from "@/app/components/Collections/ProductsByCategory";

const fetchData = async (categories:string, subCategory: string) =>{
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN}/api/collections/${categories}/${subCategory}`)

        return res.data.products
    } catch (error) {
        
    } 
}

export default async function CategorySubCollections({params}: any){

    const {categories, ['sub-category']: subCategory} = params

    const products = await fetchData(categories,subCategory)

    return(
        <div className="px-2 md:px-4 py-5">
            <ProductsByCategory
                products={products}
            />
        </div>
    )
}