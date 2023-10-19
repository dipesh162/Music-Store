import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { AiFillStar, AiOutlineHeart } from 'react-icons/ai';

export default function ProductCard() {
  return (
    <div className='flex flex-col hover:shadow-[0_3px_16px_0px_rgba(0,0,0,0.11)] w-[300px] relative'>
        <AiOutlineHeart className='absolute right-2 top-2 hover:cursor-pointer' size={22}/>
        <Link href={'/'}>
          <Image
              src={'https://res.cloudinary.com/dykew1rdb/image/upload/v1697658397/hlvfghmcnwwvye1kruet.jpg'}
              width={155}
              height={155}
              alt="Product Image"
              className='pb-1 m-auto'
          />
        </Link>
        <Link href={'/'} className='text-[#212121] text-[14px] pb-1 hover:text-[#2874f0]'>
          Yamaha FX280 Natural Electro Acoustic Guitar
        </Link>
        <div className='rounded-[3px] text-white py-0.5 pr-1 pl-1.5 bg-[#388E3C] flex items-center gap-1 w-fit'>
            3.5 <AiFillStar size={13} color="fff"/>
        </div>
        <Link href={'/'} className='#212121 text-base'>
          &#8377;11,000
        </Link>
    </div>
  )
}
