// React
import Image from 'next/image'
import Link from 'next/link'

// Icons
import { AiFillStar } from 'react-icons/ai';

// Components
import WishlistBtn from './ProductDetails/WishlistBtn';

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
}


export default function ProductCard({product}: {product:Product}) {
  
  return (
    <div className='flex flex-col hover:shadow-[0_3px_16px_0px_rgba(0,0,0,0.11)] border-[1px] border-[#eaeaec] p-3 relative'>
        <WishlistBtn
          productId={product._id}
          btnType='icon'
        /> 
        <Link href={`/instruments/${product.slug}`} className='relative h-[120px] md:h-[200px] w-[120px] md:w-[200px] block m-auto mt-4'>
          <Image
              src={product.images[0]}
              fill={true}
              alt="Product Image"
              className='pb-1 m-auto'
          />
        </Link>

        <div className='flex flex-col items-center md:items-start'>
          <Link href={`/instruments/${product.slug}`} className='text-[#212121] text-[14px] pb-1 hover:text-[#2874f0] max-w-[200px] overflow-ellipsis line-clamp-2'>
            {product.name}
          </Link> 
          <div className='rounded-[3px] text-white py-0.5 pr-1 pl-1.5 bg-[#388E3C] flex items-center gap-1 w-fit'>
              {product.ratings} <AiFillStar size={13} color="fff"/>
          </div>
          <Link href={`/instruments/${product.slug}`} className='#212121 text-base font-semibold'>
            &#8377;{(product.price).toLocaleString()}
          </Link>
        </div>
    </div>
  )
}
