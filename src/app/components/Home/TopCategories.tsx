import React from 'react'
import TopCategories from '../../static/TopCategories'
import Image from 'next/image'
import Link from 'next/link'

export default function Categories() {
  
  return (
    <>
      <h3 className='text-[22px] text-center font-semibold'>Top Categories</h3>
      <div className='flex'>
        {TopCategories.map((category)=>(
            <Link href={category.link}>
            {/* <div onClick={()=> router.push(category.link)}> */}
              <Image
                src={category.img}
                width={155}
                height={155}
                alt="Category Image"
                className='rounded-lg'
              />
              <h3 className="text-[18px] font-medium mt-1">{category.name}</h3>
            {/* </div> */}
            </Link>
        ))}
      </div>
    </>
  )
}
