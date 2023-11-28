import React, { useState } from 'react'
import Image from "next/image";
import Link from "next/link";
import { BiShoppingBag } from 'react-icons/bi';
import { FaRegUser } from 'react-icons/fa';
import { FaRegHeart } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import MenuMobileDrawer from './MenuMobileDrawer'

export default function MenuMobile(){

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
                    <Link href='/viewcart'><BiShoppingBag size={24} color="black"/></Link>
                </div>
            </div>
            {isDrawerOpen &&
                <MenuMobileDrawer handleDrawer={handleDrawer}/>
            }
        </>
    )
}