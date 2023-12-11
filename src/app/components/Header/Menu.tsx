// React
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BiShoppingBag } from 'react-icons/bi';
import { BsChevronDown } from 'react-icons/bs';
import { FaRegUser } from 'react-icons/fa';
import { FaRegHeart } from 'react-icons/fa';
import { CSSTransition } from 'react-transition-group';

// Static data
import HeaderData from '../../static/HeaderData'

// Components
import UserMenu from "./UserMenu";

// Redux
import { useAppSelector } from "@/redux/hooks";


export default function Menu(){
    const cart = useAppSelector((state)=> state.cart.cart)
    const cartLength = cart.reduce((acc,item)=>{ return acc + item.quantity },0)

    const [instrumentsMenu, setInstrumentsMenu] = useState(false)
    const [showUsersMenu, setUsersMenu] = useState(false)

    return(
        <>
            <div className="hidden md:flex bg-white max-w-[1280px] mx-auto justify-between pr-6 relative">
                <Link href='/'>
                    <Image
                        src='/images/music-store.jpg'
                        width={'150'}
                        height={'50'}
                    />
                </Link>
                <ul className="flex gap-7 items-center">
                    <Link href='/'><li className="h-full hover:cursor-pointer text-[#161616] font-semibold flex gap-2 items-center">Home</li></Link>
                    <li className="h-full hover:cursor-pointer text-[#161616] flex gap-2 items-center" onMouseEnter={() => setInstrumentsMenu(true)} onMouseLeave={() => setInstrumentsMenu(false)}>
                        <div className="flex items-center gap-2 font-semibold">Musical Instruments <BsChevronDown size={14} color="black"/></div>
                        <CSSTransition
                            in={instrumentsMenu}
                            // timeout={2000}
                            classNames="transitions"
                            unmountOnExit
                        >
                            <div className="shadow-[0_0.5px_2.5px_rgba(0,0,0,0.19)] absolute left-[50%] -translate-x-1/2 bg-white top-[88px] flex flex-row gap-8 w-max px-9 py-6 z-10">
                                {HeaderData.map((data,i)=>(
                                    <div key={i}>
                                        <Link href={data.item.link}>
                                            <p className="
                                            hover:after:content-[''] hover:after:absolute hover:after:w-full hover:after:h-[2px] hover:after:left-0 hover:after:bottom-0 hover:after:bg-[#0087ca] hover:after:scale-x-0 hover:after:origin-bottom-right 
                                            relative font-semibold pb-1.5">{data.item.name}</p>
                                        </Link>

                                        {data.items.map((item, i)=> (
                                            <Link href={item.link} key={i}>
                                                <p className="
                                                hover:after:content-[''] hover:after:absolute hover:after:w-full hover:after:h-[2px] hover:after:left-0 hover:after:bottom-0 hover:after:bg-[#0087ca] hover:after:scale-x-0 hover:after:origin-bottom-right hover:after:ease-out hover:after:duration-75 
                                                relative pb-1 text-[14px]">{item.name}</p>
                                            </Link>
                                        ))}
                                    </div>
                                ))
                                }
                            </div>
                        </CSSTransition>
                    </li>
                    <Link href='/'><li className="h-full hover:cursor-pointer text-[#161616] font-semibold flex gap-2 items-center">About</li></Link>
                </ul>
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center h-[100%] relative hover:cursor-pointer" onMouseEnter={()=> setUsersMenu(true)} onMouseLeave={()=> setUsersMenu(false)}>
                        <FaRegUser size={22} color="black"/>
                        {showUsersMenu && <div className="after:absolute after:right-[-7px] after:bottom-[0px] after:bg-[#161616] after:h-[4px] after:w-[35px]"></div>}
                    </div>
                    <Link href='/wishlist'><FaRegHeart size={22} color="black" className="hover:cursor-pointer"/></Link>
                    <Link href='/viewcart' className='relative'>
                        <BiShoppingBag size={24} color="black" className="hover:cursor-pointer"/>
                        {cartLength && <div className='flex justify-center items-center absolute top-[-8px] left-3.5 rounded-[50%] font-bold text-white text-[9px] bg-[#616364] h-[18px] w-[18px]'>{cartLength}</div>}
                    </Link>
                </div>

                <CSSTransition
                    in={showUsersMenu}
                    timeout={2000}
                    classNames="transitions"
                    unmountOnExit
                >
                        <div className="absolute top-[88px] z-10 right-3" onMouseEnter={()=>setUsersMenu(true)}>
                            <UserMenu
                                handleMouseLeave={()=>setUsersMenu(false)}
                            />
                        </div>
                </CSSTransition>
            </div>
        </>
    )
}