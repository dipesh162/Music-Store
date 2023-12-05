'use client'

// React
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { AiFillStar } from 'react-icons/ai';
import { RxCross2 } from "react-icons/rx";

// Components
import WishlistBtn from './ProductDetails/WishlistBtn';

enum Ctas {
  wishlist = 'wishlist',
  remove = 'cart'
}

interface Product {
  _id: string;
  name: string;
  brand: string;
  slug: string;
  category: string;
  subCategory: string;
  description: string;
  price: number;
  ratings: number;
  images: string[];
  cta?: Ctas;
  quantity?: number;
  handleRemoveItem?: () => void
}


export default function ProductCard({product,handleRemoveItem}: {product:Product,handleRemoveItem?: (id: string) => void}) {
  const [wishListed, setWishListed] = useState(false)
  const handleWishList= ()=>{
    setWishListed(!wishListed)
  }
  
  return (
    <div className='flex flex-col hover:shadow-[0_3px_16px_0px_rgba(0,0,0,0.11)] w-[300px] relative'>
        {product.cta == 'wishlist' ? 
          <WishlistBtn
            productId={product._id}
            btnType='icon'
          /> :
          <RxCross2 className='absolute right-2 top-2 hover:cursor-pointer' onClick={()=>handleRemoveItem && handleRemoveItem(product._id)} size={22} /> 
        }
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
        {/* {product.cta == 'cart' ?
          <h4 className='font-bold'>{product.quantity}</h4>: null
        } */}
        <Link href={`/instruments/${product.slug}`} className='#212121 text-base'>
          &#8377;{(product.price).toLocaleString()}
        </Link>

        {product.cta == 'cart' ?
          <h3>Move To Cart</h3>: null
        }
    </div>
  )
}
