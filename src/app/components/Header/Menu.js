import Image from "next/image";
import Link from "next/link";
import { BiShoppingBag } from 'react-icons/bi';
import { FaRegUser } from 'react-icons/fa';
import { FaRegHeart } from 'react-icons/fa';


export default function Menu(){

    return(
        <>
            <div className="hidden md:flex bg-white border-b-[1px] border-[#e8e8e8] justify-between pr-6">
                <Link href='/'>
                    <Image
                        src='/images/music-store.jpg'
                        width={'150'}
                        height={'50'}
                    />
                </Link>
                <div className="flex gap-7 items-center">
                    <h3 className="text-[#161616] font-medium">Home</h3>
                    <h3 className="text-[#161616] font-medium">Musical Instruments</h3>
                    <h3 className="text-[#161616] font-medium">About</h3>
                </div>
                <div className="flex items-center gap-3.5">
                    <FaRegUser size={22} color="black"/>
                    <FaRegHeart size={22} color="black"/>
                    <BiShoppingBag size={24} color="black"/>
                </div>
            </div>
        </>
    )
}