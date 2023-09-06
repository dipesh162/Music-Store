import Image from "next/image";
import ProductImages from '../components/ProductDetails/ProductImages'
import ProductInfo from '../components/ProductDetails/ProductInfo'

export default function Detail(){
    return(
        <div className="container flex flex-col md:flex-row justify-center items-center md:items-start gap-2 max-w-[1110px] mx-auto">
            <ProductImages/>
            <ProductInfo/>
        </div>
    )
}