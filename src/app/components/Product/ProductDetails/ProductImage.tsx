'use client'
import React, { FC, useState } from 'react'
import Image from "next/image";
import { AiFillStar, AiOutlineHeart } from 'react-icons/ai';

interface pageProps{
    width?: number;
    height?: number;
    src: string;
    index?: Number;
    handleClick?: Function;
    wishListIcon: boolean;
    cursor: string | null;
}

const ProductImage: FC<pageProps> = ({width, height,src,index, wishListIcon, cursor, handleClick}) =>{

    const [wishListed, setWishListed] = useState(false)
    const handleWishList= ()=>{
      setWishListed(!wishListed)
    }

    return(
        <div className={`cursor-${cursor} relative border-[1px] border-[#8c8c8c] flex justify-center items-center hover:cursor-pointer`} onClick={()=>handleClick && handleClick(index)}>
            <Image
                src={src}
                width={width ?? 100 }
                height={height ?? 100}
                alt='product image'
            />
            { wishListIcon && <AiOutlineHeart className='md:hidden absolute right-2 top-2 hover:cursor-pointer' onClick={handleWishList} size={28} color={wishListed ? 'red': ''}/> }
        </div>
    )
}

export default ProductImage