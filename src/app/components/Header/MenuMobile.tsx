import React, { useState } from 'react'
import Image from "next/image";
import Link from "next/link";
import { BiShoppingBag } from 'react-icons/bi';
import { FaRegUser } from 'react-icons/fa';
import { FaRegHeart } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import MenuMobileDrawer from './MenuMobileDrawer'
import { useAppSelector } from '@/redux/hooks';

export default function MenuMobile(){
    const cart = useAppSelector((state)=> state.cart.cart)
    const cartLength = cart.reduce((acc,item)=>{ return acc + item.quantity },0)

    const [isDrawerOpen, setDrawerOpen] = useState(false)
    const handleDrawer = ()=>{
        setDrawerOpen(!isDrawerOpen)
    }

    return(
        <>
            <div className='md:hidden flex justify-between items-center px-4'>
                <GiHamburgerMenu size={22} color="black" onClick={handleDrawer}/>
                <Link href='/'>
                    <Image
                        src='/images/music-store.jpg'
                        width={'105'}
                        height={'35'}
                    />
                </Link>
                <div className="flex items-center gap-2">
                    <div className="hidden md:block"><FaRegUser size={22} color="black"/></div>
                    <Link href='/wishlist'><FaRegHeart size={22} color="black"/></Link>
                    <Link href='/viewcart' className='relative'>
                        <BiShoppingBag size={24} color="black"/>
                        {cartLength && <div className='flex justify-center items-center absolute top-[-8px] left-3 rounded-[50%] font-bold text-white text-[8px] bg-[#616364] h-4 w-4'>{cartLength}</div>}
                    </Link>
                </div>
            </div>
            {isDrawerOpen &&
                <MenuMobileDrawer handleDrawer={handleDrawer}/>
            }
        </>
    )
}