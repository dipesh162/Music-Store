'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { AiFillStar, AiOutlineHeart } from 'react-icons/ai';

export default function ProductCard({product}) {
  const [wishListed, setWishListed] = useState(false)
  const handleWishList= ()=>{
    setWishListed(!wishListed)
  }
  
  return (
    <div className='flex flex-col hover:shadow-[0_3px_16px_0px_rgba(0,0,0,0.11)] w-[300px] relative'>
        <AiOutlineHeart className='absolute right-2 top-2 hover:cursor-pointer' onClick={handleWishList} size={22} color={wishListed ? 'red': ''}/>
        <Link href={`/instruments/${product.slug}`}>
          <Image
              src={product.images[0]}
              width={155}
              height={155}
              alt="Product Image"
              className='pb-1 m-auto'
          />
        </Link>
        <Link href={`/instruments/${product.slug}`} className='text-[#212121] text-[14px] pb-1 hover:text-[#2874f0]'>
          {product.name}
        </Link>
        <div className='rounded-[3px] text-white py-0.5 pr-1 pl-1.5 bg-[#388E3C] flex items-center gap-1 w-fit'>
            {product.ratings} <AiFillStar size={13} color="fff"/>
        </div>
        <Link href={`/instruments/${product.slug}`} className='#212121 text-base'>
          &#8377;{(product.price).toLocaleString()}
        </Link>
    </div>
  )
}
