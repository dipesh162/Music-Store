'use client'

// React
import Image from 'next/image'
import Link from 'next/link'

// Icons
import { RxCross2 } from "react-icons/rx";

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
  quantity?: number;
  handleRemoveItem?: () => void
  handleCart?: () => void
}


export default function WishlistCard({product,handleRemoveItem,handleCart}: {product:Product,handleRemoveItem?: (id: string) => void, handleCart?: (id:string) => void}) {

  return (
    <div className='flex flex-col hover:shadow-[0_3px_16px_0px_rgba(0,0,0,0.11)] w-[300px] relative'>
        <RxCross2 className='absolute right-2 top-2 hover:cursor-pointer' onClick={()=>handleRemoveItem && handleRemoveItem(product._id)} size={22} /> 
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
        {/* {product.cta == 'cart' ?
          <h4 className='font-bold'>{product.quantity}</h4>: null
        } */}
        <Link href={`/instruments/${product.slug}`} className='#212121 text-base'>
          &#8377;{(product.price).toLocaleString()}
        </Link>

        <h3 onClick={()=> handleCart && handleCart(product._id)}>Move To Cart</h3>
    </div>
  )
}
