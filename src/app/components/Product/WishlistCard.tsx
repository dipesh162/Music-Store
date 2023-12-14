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
    <div className='w-fit border-[1px] border-[#eaeaec] flex flex-col hover:shadow-[0_3px_8px_0px_rgba(0,0,0,0.11)] relative'>
        <div onClick={()=>handleRemoveItem && handleRemoveItem(product._id)}  className='p-[2px] bg-[#616364] rounded-[50%] flex items-center justify-center absolute right-2 top-2 h-[20px] w-[20px] hover:cursor-pointer'>
          <RxCross2 color='white' size={12} /> 
        </div>
        <div className='p-2 text-center'>
          <Link className='h-[120px] md:h-[200px] w-[120px] md:w-[200px] relative block m-auto mt-5' href={`/instruments/${product.slug}`}>
            <Image
                src={product.images[0]}
                fill={true}
                alt="Product Image"
                className='pb-1'
            />
          </Link>
          <Link href={`/instruments/${product.slug}`} className='text-[#212121] text-[14px] pb-1 max-w-[200px] overflow-ellipsis line-clamp-2'>
            {product.name}
          </Link> 
          {/* {product.cta == 'cart' ?
            <h4 className='font-bold'>{product.quantity}</h4>: null
          } */}
        </div>
        <b className='#212121 text-base text-center mb-3'>&#8377;{(product.price).toLocaleString()}</b>

        <h3 className='text-[14px] font-bold cursor-pointer text-center border-t-[1px] py-3 border-[#eaeaec] text-[#616364]' onClick={()=> handleCart && handleCart(product._id)}>MOVE TO CART</h3>
    </div>
  )
}
