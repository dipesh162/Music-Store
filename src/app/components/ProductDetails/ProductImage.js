import React from 'react'
import Image from "next/image";

export default function ProductImage({width, height,src,index, handleClick}){
    return(
        <div className="border-[1px] border-[#8c8c8c] flex justify-center items-center hover:cursor-pointer" onClick={()=>handleClick(index)}>
            <Image
                src={`/images/${src}`}
                width={width ?? 100 }
                height={height ?? 100}
                alt='product image'
            />
        </div>
    )
}