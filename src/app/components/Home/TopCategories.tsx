'use client'
import React, { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { LiaAngleLeftSolid } from "react-icons/lia";
import TopCategories from '../../static/TopCategories'


export default function Categories() {

  const carouselRef = useRef<HTMLInputElement>(null)
  const cardRef = useRef<HTMLInputElement>(null)
  const handleClick = (position:string)=>{
    let cardWidth:number  | undefined = cardRef.current?.clientWidth
    let gapBetweenCards = 28
    if(position == 'left'){
      carouselRef.current.scrollLeft-= cardWidth+gapBetweenCards
    } else {
      carouselRef.current.scrollLeft+= cardWidth+gapBetweenCards
    }
  }
  
  return (
    <>
      <h3 className='text-[22px] md:text-[28px] text-center font-semibold my-3'>Top Categories</h3>

      <div className='relative px-3 lg:px-1'>
        <div ref={carouselRef} className='no-scrollbar overflow-hidden scroll-smooth'>
          <div className='flex gap-4 md:gap-0 no-scrollbar'>
            {TopCategories.map((category, i)=>(
              <Link href={category.link} key={i}>
                <div className='flex flex-col  mx-0 md:mx-3.5'>
                  <div ref={cardRef} className='relative'>
                    <div className='block shrink-0 h-[160px] md:h-[200px] lg:h-[290px] w-[160px] md:w-[200px] lg:w-[290px]'>
                      <Image
                        src={category.img}
                        fill={true} 
                        alt="Category Image"
                        className='rounded-2xl relative'
                      /> 
                    </div>
                  </div>
                  <h3 className="text-[16px] md:text-[22px] text-center font-bold mt-1 md:mt-2">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

        
        <div onClick={()=> handleClick('left')} className={`flex justify-center items-center h-[30px] md:h-[40px] w-[30px] md:w-[40px] cursor-pointer shadow-[0_4px_16px_1px_rgba(0,0,0,.2)] border-[1px] p-1 border-['black'] absolute top-[68px] md:top-[90px] lg:top-[130px] shrink-0 left-[3px] lg:left-[0px] rounded-[50%] bg-[white] text-[red]`}>
            <LiaAngleLeftSolid size={24} color="#161616" />
        </div>
        
        <div onClick={()=> handleClick('right')} className={`flex justify-center items-center h-[30px] md:h-[40px] w-[30px] md:w-[40px] cursor-pointer shadow-[0_4px_16px_1px_rgba(0,0,0,.2)] border-[1px] p-1 border-['black'] absolute top-[68px] md:top-[90px] lg:top-[130px] shrink-0 right-[3px] lg:right-[-1px] rounded-[50%] bg-[white] text-[red]`}>
            <LiaAngleLeftSolid className='rotate-180' size={24} color="#161616" />
        </div>
      </div>
    </>
  )
}
