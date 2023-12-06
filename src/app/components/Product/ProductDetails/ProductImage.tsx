'use client'

// React
import React, { FC } from 'react'
import Image from "next/image";

// Components
import WishlistBtn from './WishlistBtn';

interface pageProps{
    width?: number;
    height?: number;
    src: string;
    index?: Number;
    handleClick?: Function;
    wishListIcon: boolean;
    productId: string;
    cursor: string | null;
}

const ProductImage: FC<pageProps> = ({width, height,src,index, wishListIcon, cursor, productId, handleClick}) =>{

    return(
        <div className={`cursor-${cursor} relative border-[1px] border-[#8c8c8c] flex justify-center items-center hover:cursor-pointer`} onClick={()=>handleClick && handleClick(index)}>
            <Image
                src={src}
                width={width ?? 100 }
                height={height ?? 100}
                alt='product image'
            />
            { wishListIcon && 
                <div className='md:hidden'>
                    <WishlistBtn productId={productId} btnType='icon' /> 
                </div>
            }
        </div>
    )
}

export default ProductImage