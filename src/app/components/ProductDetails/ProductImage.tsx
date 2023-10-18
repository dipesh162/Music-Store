import React, { FC } from 'react'
import Image from "next/image";

interface pageProps{
    width?: number;
    height?: number;
    src: string;
    index?: Number;
    handleClick?: Function;
}

const ProductImage: FC<pageProps> = ({width, height,src,index, handleClick}) =>{
    return(
        <div className="border-[1px] border-[#8c8c8c] flex justify-center items-center hover:cursor-pointer" onClick={()=>handleClick(index)}>
            <Image
                src={src}
                width={width ?? 100 }
                height={height ?? 100}
                alt='product image'
            />
        </div>
    )
}

export default ProductImage