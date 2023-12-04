'use client'
import { FC, useState } from 'react';
import { BiShoppingBag } from 'react-icons/bi';
import { FaRegHeart } from 'react-icons/fa';
import { AiFillStar, AiOutlineHeart } from 'react-icons/ai';
import { FaHeart } from "react-icons/fa";
import axios from 'axios';
import { useAppSelector } from '@/redux/hooks';

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

const ProductInfo: FC<pageProps> = ({product}) =>{

    const props = {width: 400, height: 250, zoomWidth: 500, img: "1.jpg"};
    const [wishListed, setWishlisted] = useState(false)

    const user:any = useAppSelector((state)=> state.auth.user)

    const handleWishlisting = ()=>{
        const res = axios.post(`/api/product/wishlist`,{
            productId: product._id
        },{
            headers: {
                'Accept': 'application/json',
                'Authorization': user.token ? `Bearer ${user.token}` : '',
                'token': user.token ? user.token : '',
              },
        })
        setWishlisted(!wishListed)
    }

    return(
        <div className='basis-full text-center md:text-left'>
            <h2 className="text-[#191d1f] text-[16px] md:text-[24px] font-[400] leading-[25px]">{product.name}</h2>

            <div className='rounded-[3px] mx-auto mt-2 md:mx-0 text-white py-0.5 pr-1 pl-1.5 bg-[#388E3C] flex items-center gap-1 w-fit'>
                {product.ratings} <AiFillStar size={13} color="fff"/>
            </div>

            <h2 className="text-[#191d1f] text-[20px] md:text-[28px] font-semibold mb-1.5 md:mb-0 mt-1 md:mt-0">&#8377;{product.price.toLocaleString()}</h2>
            <p className='-mt-[8px] text-[14px]'>Inclusive of all taxes</p>

            <div className="hidden md:flex gap-3 my-3 mx-0 justify-center items-center md:justify-normal">
                <button className='bg-[#616364] font-semibold border-[2px] border-[#616364]  text-white text-[14px] md:text-base px-3 py-2 rounded-md flex items-center gap-1.5'>
                    <BiShoppingBag size={20}/> <span className='text-[14px]'>ADD TO CART</span>
                </button>
                <button disabled={wishListed} onClick={handleWishlisting} className={`${wishListed? 'bg-[#616364]' : 'bg-[#fff]'} ${wishListed ? 'text-[#fff]': 'text-[#616364]'} font-semibold border-[#616364] border-[2px] text-[14px] md:text-base px-3 py-2 rounded-md flex items-center gap-1.5`}>
                    {wishListed ?
                        <FaHeart size={20}/> :
                    <FaRegHeart size={20}/>}
                    <span className='text-[14px]'>{wishListed? 'WISHLISTED': 'WISHLIST'}</span>
                </button>
            </div>

            <p className='text-[#191d1f] text-left text-[14px]'>{product.description}</p>
            {/* <ReactImageZoom {...props} /> */}
        </div>
    )
}

export default ProductInfo