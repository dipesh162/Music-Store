import ProductsByCategory from "@/app/components/Collections/ProductsByCategory";
import axios from "axios";

const fetchData = async (categories:string, subCategory: string) =>{
    try {
        const res = await axios.get(`${process.env.DOMAIN}/api/collections/${categories}/${subCategory}`)

        return res.data.products
    } catch (error) {
        
    } 
}

export default async function CategorySubCollections({params}: any){

    const {categories, ['sub-category']: subCategory} = params

    const products = await fetchData(categories,subCategory)

    return(
        <>
            <ProductsByCategory
                products={products}
            />
        </>
    )
}